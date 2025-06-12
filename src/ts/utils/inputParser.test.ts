import { describe, it, expect } from 'vitest';
import { __parserTests__ } from './inputParser.ts';
import type { NodeLabels, InputNode } from './types_utils';

const { patternsFor, makeInputNodes, parseLabel, parseInputMD } =
    __parserTests__;
if (!makeInputNodes || !parseLabel || !parseInputMD)
    throw new Error('One or more testing functions not available');

const labels = Object.keys(patternsFor) as Exclude<NodeLabels, 'text'>[];

describe('makeInputNodes', () => {
    it('parses a single emphasis match correctly', () => {
        const char: { [k in Exclude<NodeLabels, 'text'>]: string } = {
            em: '_',
            strong: '**',
            mark: '==',
        };
        const rndLabel: Exclude<NodeLabels, 'text'> =
            labels[Math.floor(Math.random()) * labels.length]!;

        const input = `This is ${char[rndLabel]}${rndLabel}${char[rndLabel]} text.`;
        const result = makeInputNodes(rndLabel, input);

        expect(result).toEqual([
            { label: 'text', content: 'This is ' },
            { label: rndLabel, content: `${rndLabel}` },
            { label: 'text', content: ' text.' },
        ]);
    });

    it('returns only text when there is no match', () => {
        const input = 'No formatting here.';
        const result = makeInputNodes('em', input);

        expect(result).toEqual([
            { label: 'text', content: 'No formatting here.' },
        ]);
    });

    it('should detect multiple occurencies', () => {
        const input = '**one** && **two**';
        const result = makeInputNodes('strong', input);

        expect(result).toEqual([
            { label: 'strong', content: 'one' },
            { label: 'text', content: ' && ' },
            { label: 'strong', content: 'two' },
        ]);
    });

    it('parses multiple matches correctly', () => {
        const input = 'First _one_, then _two_.';
        const result = makeInputNodes('em', input);

        expect(result).toEqual([
            { label: 'text', content: 'First ' },
            { label: 'em', content: 'one' },
            { label: 'text', content: ', then ' },
            { label: 'em', content: 'two' },
            { label: 'text', content: '.' },
        ]);
    });

    it('ignores incomplete match with only opening marker', () => {
        const input = 'This is _not closed.';
        const result = makeInputNodes('em', input);

        expect(result).toEqual([
            { label: 'text', content: 'This is _not closed.' },
        ]);
    });

    it('ignores isolated closing marker', () => {
        const input = 'Unmatched closing_ here.';
        const result = makeInputNodes('em', input);

        expect(result).toEqual([
            { label: 'text', content: 'Unmatched closing_ here.' },
        ]);
    });

    it('only matches valid delimited region, not partials', () => {
        const input = '_a _b c_ d';
        const result = makeInputNodes('em', input);

        expect(result).toEqual([
            { label: 'text', content: '_a ' },
            { label: 'em', content: 'b c' },
            { label: 'text', content: ' d' },
        ]);
    });

    it('returns empty array if input is empty', () => {
        const result = makeInputNodes('em', '');
        expect(result).toEqual([]);
    });
});

describe('parseLabel', () => {
    it('should remain flat when no transformations happen', () => {
        const node: InputNode = { label: 'text', content: 'plain text' };
        parseLabel(node, 'strong');
        expect(node).toEqual({ label: 'text', content: 'plain text' });
    });

    it('should only make an array when the parsing returns more than one node', () => {
        const node: InputNode = { label: 'text', content: '**bold**' };
        parseLabel(node, 'strong');
        expect(Array.isArray(node.content)).toBe(false);
    });

    it('should update the label of the main node if only one node is returned', () => {
        const node: InputNode = { label: 'text', content: '==bold==' };
        parseLabel(node, 'mark');
        expect(node.label).toBe('mark');
    });

    it('should preserve structure when no new patterns match', () => {
        const originalStructure: InputNode = {
            label: 'text',
            content: [
                { label: 'text', content: 'prefix ' },
                { label: 'em', content: 'existing' },
            ],
        };
        const node = JSON.parse(JSON.stringify(originalStructure));
        parseLabel(node, 'strong');
        expect(node).toEqual(originalStructure);
    });

    it('should add new nodes alongside existing nested nodes', () => {
        const node: InputNode = {
            label: 'text',
            content: [
                { label: 'em', content: 'existing' },
                { label: 'text', content: ' **new**' },
            ],
        };
        parseLabel(node, 'strong');
        expect(node.content).toEqual([
            { label: 'em', content: 'existing' },
            { label: 'text', content: ' ' },
            { label: 'strong', content: 'new' },
        ]);
    });

    it('should recursively process nested text nodes', () => {
        const node: InputNode = {
            label: 'text',
            content: [
                { label: 'text', content: 'outer **bold**' },
                { label: 'text', content: '_inner_' },
            ],
        };
        parseLabel(node, 'strong');
        expect(node.content).toEqual([
            { label: 'text', content: 'outer ' },
            { label: 'strong', content: 'bold' },
            { label: 'text', content: '_inner_' },
        ]);
    });

    it('should not process non-text nested nodes', () => {
        const node: InputNode = {
            label: 'text',
            content: [
                { label: 'em', content: '==not parsed==' },
                { label: 'text', content: '==parsed==' },
            ],
        };
        parseLabel(node, 'mark');
        expect(node.content).toEqual([
            {
                label: 'em',
                content: [{ label: 'mark', content: 'not parsed' }],
            },
            { label: 'mark', content: 'parsed' },
        ]);
    });

    it('should maintain original order of nodes', () => {
        const node: InputNode = {
            label: 'text',
            content: '1 **2** 3 **4** 5',
        };
        parseLabel(node, 'strong');
        expect(node.content).toEqual([
            { label: 'text', content: '1 ' },
            { label: 'strong', content: '2' },
            { label: 'text', content: ' 3 ' },
            { label: 'strong', content: '4' },
            { label: 'text', content: ' 5' },
        ]);
    });

    it('should preserve order when processing nested structures', () => {
        const node: InputNode = {
            label: 'text',
            content: [
                { label: 'text', content: 'a **b** c' },
                { label: 'em', content: 'd' },
                { label: 'text', content: 'e **f** g' },
            ],
        };
        parseLabel(node, 'strong');
        expect(node.content).toEqual([
            { label: 'text', content: 'a ' },
            { label: 'strong', content: 'b' },
            { label: 'text', content: ' c' },
            { label: 'em', content: 'd' },
            { label: 'text', content: 'e ' },
            { label: 'strong', content: 'f' },
            { label: 'text', content: ' g' },
        ]);
    });

    it('should handle empty nested arrays', () => {
        const node: InputNode = { label: 'text', content: [] };
        parseLabel(node, 'strong');
        expect(node.content).toEqual([]);
    });
});

describe('parseInputMD', () => {
    it('should return a text node for empty input', () => {
        const result = parseInputMD('');
        expect(result).toEqual({ label: 'text', content: '' });
    });

    it('should return a flat text node when no patterns exist', () => {
        const result = parseInputMD('plain text');
        expect(result).toEqual({ label: 'text', content: 'plain text' });
    });

    it('should create nested nodes for each pattern', () => {
        const result = parseInputMD('**b** _i_ ==m==');
        expect(result).toEqual({
            label: 'text',
            content: [
                { label: 'strong', content: 'b' },
                { label: 'text', content: ' ' },
                { label: 'em', content: 'i' },
                { label: 'text', content: ' ' },
                { label: 'mark', content: 'm' },
            ],
        });
    });

    it('should handle nesting patters using the PARSING_SEQUENCE', () => {
        const result = parseInputMD(
            '**bold _ita ==Mark inside== lic_ letter**',
        );
        expect(result).toEqual({
            label: 'strong',
            content: [
                { label: 'text', content: 'bold ' },
                {
                    label: 'em',
                    content: [
                        { label: 'text', content: 'ita ' },
                        { label: 'mark', content: 'Mark inside' },
                        { label: 'text', content: ' lic' },
                    ],
                },
                { label: 'text', content: ' letter' },
            ],
        });
    });

    it('should respect parsing sequence priority', () => {
        const result = parseInputMD('**_==bold italic mark==_**');
        expect(result).toEqual({
            label: 'strong',
            content: [
                {
                    label: 'em',
                    content: [{ label: 'mark', content: 'bold italic mark' }],
                },
            ],
        });
    });

    it('should maintain correct node order with mixed patterns', () => {
        const result = parseInputMD('Text **bold** more _italic_ end');
        expect(result).toEqual({
            label: 'text',
            content: [
                { label: 'text', content: 'Text ' },
                { label: 'strong', content: 'bold' },
                { label: 'text', content: ' more ' },
                { label: 'em', content: 'italic' },
                { label: 'text', content: ' end' },
            ],
        });
    });

    it('should handle newlines and whitespace properly', () => {
        const result = parseInputMD('Line 1\n**Line 2**\nLine 3');
        expect(result).toEqual({
            label: 'text',
            content: [
                { label: 'text', content: 'Line 1\n' },
                { label: 'strong', content: 'Line 2' },
                { label: 'text', content: '\nLine 3' },
            ],
        });
    });

    it('should handle unclosed patterns as text', () => {
        const result = parseInputMD('**unclosed _markdown');
        expect(result).toEqual({
            label: 'text',
            content: '**unclosed _markdown',
        });
    });

    it('should handle malformed patterns (extra symbols)', () => {
        const result = parseInputMD('**a _extra** symbols__');
        expect(result.content).toEqual([
            {
                label: 'strong',
                content: 'a _extra',
            },
            { label: 'text', content: ' symbols__' },
        ]);
    });

    it('should handle overlapping patterns by sequence priority', () => {
        const result = parseInputMD('**_overlap_**');
        expect(result).toEqual({
            label: 'strong',
            content: [{ label: 'em', content: 'overlap' }],
        });
    });

    it('should produce a complete AST for complex markdown', () => {
        const result = parseInputMD('Header\n==sub==\n**bold _italic_** text');
        expect(result).toEqual({
            label: 'text',
            content: [
                { label: 'text', content: 'Header\n' },
                { label: 'mark', content: 'sub' },
                { label: 'text', content: '\n' },
                {
                    label: 'strong',
                    content: [
                        { label: 'text', content: 'bold ' },
                        { label: 'em', content: 'italic' },
                    ],
                },
                { label: 'text', content: ' text' },
            ],
        });
    });
});

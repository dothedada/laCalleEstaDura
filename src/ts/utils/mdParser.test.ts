import { describe, it, expect } from 'vitest';
import { __parserTests__ } from './mdParser';
import type { NodeLabels } from './types';

const { patternsFor, makeInputNodes, parseContent, parseInputMD } =
    __parserTests__;
if (!makeInputNodes || !parseContent || !parseInputMD)
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
// const parsedMD = parseInputMD('carajo _esto_ y esto: **no** functiona');
// console.log(JSON.stringify(parsedMD, null, 2));

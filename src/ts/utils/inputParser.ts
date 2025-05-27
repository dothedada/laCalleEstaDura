import type {
    NodeLabels,
    InOutPattern,
    Pattern,
    InputNode,
} from './types.d.ts';

const BOUNDARY_CHARS = new Set([' ', '\t', '\n', '\0', ',', '.']);
const PARSING_SEQUENCE = ['strong', 'em', 'mark'];

const patternsFor = {
    strong: {
        open: ['end', '*', '*', 'char'],
        close: ['char', '*', '*', 'end'],
    },
    em: {
        open: ['end', '_', 'char'],
        close: ['char', '_', 'end'],
    },
    mark: {
        open: ['end', '=', '=', 'char'],
        close: ['char', '=', '=', 'end'],
    },
} satisfies { [k in Exclude<NodeLabels, 'text'>]: InOutPattern };

function charComparison(
    char: string | undefined,
    patternChar: string | undefined,
): boolean {
    if (!char || !patternChar) {
        return false;
    }
    switch (patternChar) {
        case 'end':
            return BOUNDARY_CHARS.has(char);
        case 'char':
            return !BOUNDARY_CHARS.has(char);
        case 'digit':
            return !isNaN(parseInt(char));
        default:
            return char === patternChar;
    }
}

function createPatternMatcher(
    pattern: Pattern,
): (c: string | undefined) => boolean {
    let patternIndex = 0;

    return function (character) {
        if (!character || !charComparison(character, pattern[patternIndex])) {
            patternIndex = 0;
        }

        if (charComparison(character, pattern[patternIndex])) {
            patternIndex++;
        }

        if (patternIndex === pattern.length) {
            patternIndex = 0;
            return true;
        }

        return false;
    };
}

function findPatternMatches(
    input: string,
    searchPattern: InOutPattern,
): [number, number][] {
    const boundedInput = `\0${input}\0`;
    const foundOpenPattern = createPatternMatcher(searchPattern.open);
    const foundClosePattern = createPatternMatcher(searchPattern.close);
    const openedStack: number[] = [];
    const matches: [number, number][] = [];
    const patternOpenOffset = searchPattern.open.length - 1;
    const patternCloseOffset = 1;

    for (let i = 0; i < boundedInput.length; i++) {
        if (foundOpenPattern(boundedInput[i])) {
            openedStack.push(i - patternOpenOffset);
        }
        if (openedStack.length && foundClosePattern(boundedInput[i])) {
            matches.push([openedStack.pop()!, i - patternCloseOffset]);
        }
    }

    return matches.filter(([start, end]) => start !== end);
}

function makePlainSegments(
    markedSegments: [number, number][],
    inputLength: number,
): [number, number][] {
    if (markedSegments.length === 0) {
        return [[0, inputLength]];
    }

    let pos = 0;
    const segments: [number, number][] = [];

    for (const [start, end] of markedSegments) {
        if (start < pos) {
            pos = end;
        }
        segments.push([pos, start]);
        pos = end;
    }

    if (pos < inputLength) {
        segments.push([pos, inputLength]);
    }

    return segments.filter(([start, end]) => start !== end);
}

function patternPad(label: Exclude<NodeLabels, 'text'>): {
    open: number;
    close: number;
} {
    return {
        open: patternsFor[label].open.length - 2,
        close: patternsFor[label].open.length - 2,
    };
}

function makeInputNodes(
    label: Exclude<NodeLabels, 'text'>,
    input: string,
): InputNode[] {
    if (input === '') {
        return [];
    }
    const labelMatches = findPatternMatches(input, patternsFor[label]);
    const plainSegments = makePlainSegments(labelMatches, input.length);

    const plainNodes = plainSegments.map(([start, end]) => {
        return {
            label: 'text',
            position: start,
            content: input.slice(start, end),
        } as Required<InputNode>;
    });

    const labelNodes = labelMatches.map(([start, end]) => {
        return {
            label,
            position: start,
            content: input.slice(
                start + patternPad(label).open,
                end - patternPad(label).close,
            ),
        } as Required<InputNode>;
    });

    const nodes = [...plainNodes, ...labelNodes]
        .sort((a, b) => a.position - b.position)
        .map(({ label, content }) => ({ label, content }));

    return nodes;
}

function parseLabel(node: InputNode, label: Exclude<NodeLabels, 'text'>) {
    const nodeContent = node.content;
    if (Array.isArray(nodeContent)) {
        nodeContent.forEach((node) => parseLabel(node, label));
        return;
    }

    if (typeof node.content !== 'string') {
        return;
    }
    const parsedNodes = makeInputNodes(label, node.content);

    if (
        parsedNodes.length > 1 ||
        (parsedNodes.length === 1 && parsedNodes[0]?.label !== 'text')
    ) {
        node.content = parsedNodes;
    }
}

export function parseInputMD(input: string): InputNode {
    const mainNode: InputNode = {
        label: 'text',
        content: input,
    };

    for (const label of PARSING_SEQUENCE) {
        parseLabel(mainNode, label as Exclude<NodeLabels, 'text'>);
    }

    return mainNode;
}

export const __parserTests__ =
    process.env.NODE_ENV === 'test'
        ? {
              patternsFor,
              makeInputNodes,
              parseLabel,
              parseInputMD,
          }
        : {};

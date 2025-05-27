type NodeLabels = 'strong' | 'em' | 'mark' | 'text';
export type Node = {
    label: NodeLabels;
    position?: number;
    content: Node[] | string;
};

type Pattern = ('end' | 'char' | 'digit' | string)[];
type InOutPattern = { open: Pattern; close: Pattern };
export type Segments = {
    labelled: [number, number][];
    plain: [number, number][];
    pad: { start: number; end: number };
};

const BOUNDARY_CHARS = new Set([' ', '\t', '\n', '\0']);
const PARSING_SEQUENCE = ['strong', 'em', 'mark'];

export const patternsFor: { [k in Exclude<NodeLabels, 'text'>]: InOutPattern } =
    {
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
    };

export function charComparison(
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

export function makeLabelNodes(
    label: Exclude<NodeLabels, 'text'>,
    input: string,
): Node[] {
    const labelMatches = findPatternMatches(input, patternsFor[label]);
    const plainSegments = makePlainSegments(labelMatches, input.length);

    const plainNodes = plainSegments.map(([start, end]) => {
        return {
            label: 'text',
            position: start,
            content: input.slice(start, end),
        } as Required<Node>;
    });
    const labelNodes = labelMatches.map(([start, end]) => {
        return {
            label,
            position: start,
            content: input.slice(start, end),
        } as Required<Node>;
    });

    const nodes: Node[] = [...plainNodes, ...labelNodes].sort(
        (a, b) => a.position - b.position,
    );

    return nodes;
}

export function parseInputMD(input: string): Node {
    const mainNode: Node = {
        label: 'text',
        content: input,
    };

    function parseContent(node: Node, label: Exclude<NodeLabels, 'text'>) {
        const nodeContent = node.content;
        if (Array.isArray(nodeContent)) {
            nodeContent.forEach((node) => parseContent(node, label));
        }

        if (typeof nodeContent === 'string') {
            const parsedNodes = makeLabelNodes(
                label as Exclude<NodeLabels, 'text'>,
                nodeContent,
            );

            node.content = parsedNodes;
        }
    }

    for (const label of PARSING_SEQUENCE) {
        parseContent(mainNode, label as Exclude<NodeLabels, 'text'>);
    }

    console.log(JSON.stringify(mainNode, null, 2));

    return mainNode;
}

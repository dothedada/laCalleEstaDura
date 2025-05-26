export interface Node<
    T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
> {
    label: T;
    content: (Node | string)[] | string;
    attributes?: Partial<HTMLElementTagNameMap[T]>;
}

function charComparison(
    char: string | undefined,
    patternChar: string | undefined,
): boolean {
    if (!char || !patternChar) {
        return false;
    }
    if (patternChar === 'char') {
        return char.trim() !== '';
    }
    return char === patternChar;
}

function findPattern(pattern: string[]) {
    let patternIndex = 0;

    return function (character: string | undefined): boolean {
        if (!character) {
            return false;
        }

        if (charComparison(character, pattern[patternIndex])) {
            patternIndex++;

            if (patternIndex === pattern.length) {
                patternIndex = 0;
                return true;
            }
        }

        return false;
    };
}

export function findSection(
    input: string,
    searchPattern: string[],
): [number, number][] {
    if (input === '') {
        return [];
    }
    const openPattern = findPattern(searchPattern);
    const closePattern = findPattern([...searchPattern].reverse());
    const closeOffset = searchPattern.length - 1;
    const openSliceIndex: number[] = [];
    const workString = ` ${input} `;
    const slices: [number, number][] = [];

    for (let i = 0; i < workString.length; i++) {
        if (openPattern(workString[i])) {
            openSliceIndex.push(i - 1);
        }
        if (openSliceIndex.length && closePattern(workString[i])) {
            slices.push([openSliceIndex.pop()!, i - closeOffset]);
        }
    }
    return slices;
}

export function parseMD(input: string): Node {
    const node: Node<'p'> = {
        label: 'p',
        content: input,
    };
    return node;
}

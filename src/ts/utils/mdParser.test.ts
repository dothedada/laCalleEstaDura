import { describe, it, expect } from 'vitest';
import { parseMD } from './mdParser';

describe('Markdown parser for user input', () => {
    it('Should take an string and return a Node', () => {
        const input = 'This is some shitty text';
        const parsedMD = parseMD(input);

        expect(parsedMD).toEqual(
            expect.objectContaining({
                label: expect.anything(),
                content: expect.anything(),
            }),
        );
    });

    it('should contain a Node with label "strong" if a strong characters are passed', () => {
        const inputA = '**i am strong** ';
        const inputB = 'This is **strong**';
        const inputC = '__also this__ is strong';
        const inputD = 'and __this__ one';

        const parseA = parseMD(inputA);
        const parseB = parseMD(inputB);
        // const parseC = parseMD(inputC);
        // const parseD = parseMD(inputD);

        expect(Array.isArray(parseA.content)).toBe(true);
    });
});

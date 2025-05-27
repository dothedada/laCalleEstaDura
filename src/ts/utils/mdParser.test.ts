import { describe, it, expect } from 'vitest';
import { charComparison, parseInputMD } from './mdParser';

describe('charComparison', () => {
    it('should return false if any of the params is Undefined', () => {
        expect(charComparison(undefined, undefined)).toBe(false);
        expect(charComparison('a', undefined)).toBe(false);
        expect(charComparison(undefined, 'a')).toBe(false);
    });

    it('should return true if patternChar is "char" and any char is passed', () => {
        expect(charComparison('a', 'char'));
    });
});

describe('Markdown parser for user input', () => {
    it('Should take an string and return a Node', () => {
        const input = '**hola _holi_ chao**';
        const parsedMD = parseInputMD(input);

        expect(parsedMD).toEqual(
            expect.objectContaining({
                label: expect.anything(),
                content: expect.anything(),
            }),
        );
    });

    // it('should contain a Node with label "strong" if a strong characters are passed', () => {
    //     const inputA = '**i am strong** ';
    //     const inputB = 'This is **strong**';
    //     const inputC = '__also this__ is strong';
    //     const inputD = 'and __this__ one';
    //
    //     const parseA = parseMD(inputA);
    //     const parseB = parseMD(inputB);
    //     // const parseC = parseMD(inputC);
    //     // const parseD = parseMD(inputD);
    //
    //     expect(Array.isArray(parseA.content)).toBe(true);
    // });
});

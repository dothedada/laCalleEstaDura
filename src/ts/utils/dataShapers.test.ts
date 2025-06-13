import { describe, it, expect } from 'vitest';
import { makeCardDataFromElement } from './dataShapers.ts';

describe('makeCardDataFromElement', () => {
    it('throws error for invalid inputs', () => {
        expect(() => makeCardDataFromElement(null)).toThrow(
            'rawData is not a valid element',
        );
        expect(() => makeCardDataFromElement(undefined)).toThrow(
            'rawData is not a valid element',
        );
        expect(() => makeCardDataFromElement('string')).toThrow(
            'rawData is not a valid element',
        );
        expect(() => makeCardDataFromElement(123)).toThrow(
            'rawData is not a valid element',
        );
        expect(() => makeCardDataFromElement({})).toThrow(
            'rawData is not a valid element',
        );
        expect(() => makeCardDataFromElement({ lang: 'en' })).toThrow(
            'rawData is not a valid element',
        );
        expect(() => makeCardDataFromElement({ lang: 'en', id: '1' })).toThrow(
            'rawData is not a valid element',
        );
    });

    it('handles Text elements', () => {
        const textElement = {
            lang: 'en',
            id: 'text1',
            name: 'my-text',
            title: 'My Title',
            content: 'Text content here',
        };

        expect(makeCardDataFromElement(textElement)).toEqual({
            title: 'My Title',
            text: 'Text content here',
        });
    });

    it('uses name as fallback title for Text', () => {
        const textElement = {
            lang: 'en',
            id: 'text2',
            name: 'text-name',
            content: 'Content',
        };

        expect(makeCardDataFromElement(textElement)).toEqual({
            title: 'text-name',
            text: 'Content',
        });
    });

    it('handles OpenCard elements', () => {
        const openCardElement = {
            lang: 'en',
            id: 'card1',
            name: 'my-card',
            title: 'Card Title',
            items: [
                { key: 'field1', value: 'value1' },
                { key: 'field2', value: 'value2' },
            ],
        };

        expect(makeCardDataFromElement(openCardElement)).toEqual({
            title: 'Card Title',
            text: 'field1: value1; field2: value2; ',
        });
    });

    it('handles empty OpenCard', () => {
        const openCardElement = {
            lang: 'en',
            id: 'card2',
            name: 'empty-card',
            title: 'Empty Card',
            items: [],
        };

        expect(makeCardDataFromElement(openCardElement)).toEqual({
            title: 'Empty Card',
            text: '',
        });
    });

    it('handles FixedCard common type', () => {
        const fixedCardElement = {
            lang: 'en',
            id: 'fixed1',
            name: 'common-card',
            kind: 'commonCard',
            title: 'Event',
            description: 'Important event',
            when: '2023',
        };

        expect(makeCardDataFromElement(fixedCardElement)).toEqual({
            title: 'Event',
            text: 'Event, 2023.',
        });
    });

    it('handles FixedCard education type', () => {
        const fixedCardElement = {
            lang: 'en',
            id: 'edu1',
            name: 'education-card',
            kind: 'educationCard',
            title: 'Computer Science Degree',
            institution: 'MIT',
            where: 'Cambridge, MA',
            from: '2020',
            to: '2024',
        };

        expect(makeCardDataFromElement(fixedCardElement)).toEqual({
            title: 'Computer Science Degree',
            text: 'Computer Science Degree, 2020-2024.',
        });
    });

    it('handles FixedCard experience type with end date', () => {
        const fixedCardElement = {
            lang: 'en',
            id: 'exp1',
            name: 'experience-card',
            kind: 'experienceCard',
            title: 'Software Engineer',
            location: 'New York',
            from: '2020',
            to: '2023',
        };

        expect(makeCardDataFromElement(fixedCardElement)).toEqual({
            title: 'Software Engineer',
            text: 'Software Engineer, 2020-2023.',
        });
    });

    it('handles FixedCard experience type without end date', () => {
        const fixedCardElement = {
            lang: 'en',
            id: 'exp2',
            name: 'current-job',
            kind: 'experienceCard',
            title: 'Senior Developer',
            location: 'Remote',
            from: '2020',
        };

        expect(makeCardDataFromElement(fixedCardElement)).toEqual({
            title: 'Senior Developer',
            text: 'Senior Developer, 2020-actualidad.',
        });
    });

    it('handles Section elements', () => {
        const sectionElement = {
            lang: 'en',
            id: 'section1',
            name: 'my-section',
            title: 'My Section',
            multiple: true,
            active: ['item1', 'item2'],
            hidden: ['item3'],
        };

        expect(makeCardDataFromElement(sectionElement)).toEqual({
            title: 'My Section',
            text: '',
        });
    });

    it('uses name as fallback title for Section', () => {
        const sectionElement = {
            lang: 'en',
            id: 'section2',
            name: 'section-name',
            multiple: false,
            active: [],
            hidden: [],
        };

        expect(makeCardDataFromElement(sectionElement)).toEqual({
            title: 'section-name',
            text: '',
        });
    });

    it('handles basic Element', () => {
        const basicElement = {
            lang: 'en',
            id: 'basic1',
            name: 'basic-element',
            title: 'Basic Element',
        };

        expect(makeCardDataFromElement(basicElement)).toEqual({
            title: 'Basic Element',
            text: '',
        });
    });

    it('handles basic Element with only name', () => {
        const basicElement = {
            lang: 'en',
            id: 'basic2',
            name: 'name-only',
        };

        expect(makeCardDataFromElement(basicElement)).toEqual({
            title: 'name-only',
            text: '',
        });
    });
});

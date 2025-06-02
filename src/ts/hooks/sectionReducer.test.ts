import { describe, it, expect, beforeEach } from 'vitest';
import type { Section } from '../types';
import { sectionReducer } from './sectionReducer.ts';

let sectionMock: Section;

beforeEach(() => {
    sectionMock = {
        id: 'a_b_c-d',
        lang: 'es',
        name: 'test',
        multiple: false,
        active: ['a_a_a-a', 'b_b_b-b', 'c_c_c-c', 'd_d_d-d'],
        hidden: ['1_1_1-1', '2_2_2-2', '3_3_3-3'],
    };
});

describe('sectionReducer', () => {
    it('should load(return) the section info with data_setted', () => {
        const actionResponse = sectionReducer(null, {
            type: 'data_setted',
            sectionData: sectionMock,
        });

        expect(actionResponse).toStrictEqual(sectionMock);
    });

    it('should move up one item', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_movedUp',
            cardId: 'b_b_b-b',
        });

        expect(actionResponse?.active).toStrictEqual([
            'b_b_b-b',
            'a_a_a-a',
            'c_c_c-c',
            'd_d_d-d',
        ]);
    });

    it('should not modify when move up the first item', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_movedUp',
            cardId: 'a_a_a-a',
        });

        expect(actionResponse?.active).toStrictEqual([
            'a_a_a-a',
            'b_b_b-b',
            'c_c_c-c',
            'd_d_d-d',
        ]);
    });

    it('should move down one item', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_movedDown',
            cardId: 'b_b_b-b',
        });

        expect(actionResponse?.active).toStrictEqual([
            'a_a_a-a',
            'c_c_c-c',
            'b_b_b-b',
            'd_d_d-d',
        ]);
    });

    it('should not modify when move down the last item', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_movedDown',
            cardId: 'd_d_d-d',
        });

        expect(actionResponse?.active).toStrictEqual([
            'a_a_a-a',
            'b_b_b-b',
            'c_c_c-c',
            'd_d_d-d',
        ]);
    });

    it('should move one card from hiden to active', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_activated',
            cardId: '1_1_1-1',
        });

        expect(actionResponse?.active).toStrictEqual([
            '1_1_1-1',
            'a_a_a-a',
            'b_b_b-b',
            'c_c_c-c',
            'd_d_d-d',
        ]);
        expect(actionResponse?.hidden).toStrictEqual(['2_2_2-2', '3_3_3-3']);
    });

    it('should move all active elements to hidden and move the one selected from hiden to active', () => {
        sectionMock['multiple'] = true;
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_activated',
            cardId: '1_1_1-1',
        });

        expect(actionResponse?.active).toStrictEqual(['1_1_1-1']);
        expect(actionResponse?.hidden).toStrictEqual([
            'a_a_a-a',
            'b_b_b-b',
            'c_c_c-c',
            'd_d_d-d',
            '2_2_2-2',
            '3_3_3-3',
        ]);
    });

    it('should move all active cards to hidden when multiple=true and activating', () => {
        const multipleSection = { ...sectionMock, multiple: true };
        const result = sectionReducer(multipleSection, {
            type: 'card_activated',
            cardId: '1_1_1-1',
        });

        expect(result?.active).toStrictEqual(['1_1_1-1']);
        expect(result?.hidden).toContain('a_a_a-a');
        expect(result?.hidden).toContain('b_b_b-b');
    });

    it('should keep multiple cards active when multiple=false', () => {
        const result = sectionReducer(sectionMock, {
            type: 'card_activated',
            cardId: '1_1_1-1',
        });

        expect(result?.active.length).toBeGreaterThan(1);
        expect(result?.active[0]).toBe('1_1_1-1');
    });

    it('should move one active element to hidden', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_hidden',
            cardId: 'a_a_a-a',
        });

        expect(actionResponse?.active).toStrictEqual([
            'b_b_b-b',
            'c_c_c-c',
            'd_d_d-d',
        ]);
        expect(actionResponse?.hidden).toStrictEqual([
            'a_a_a-a',
            '1_1_1-1',
            '2_2_2-2',
            '3_3_3-3',
        ]);
    });

    it('should place the moved item at top of the target list', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_hidden',
            cardId: 'a_a_a-a',
        });

        const finalState = sectionReducer(actionResponse, {
            type: 'card_activated',
            cardId: '3_3_3-3',
        });

        expect(finalState?.active).toStrictEqual([
            '3_3_3-3',
            'b_b_b-b',
            'c_c_c-c',
            'd_d_d-d',
        ]);
        expect(finalState?.hidden).toStrictEqual([
            'a_a_a-a',
            '1_1_1-1',
            '2_2_2-2',
        ]);
    });

    it('should add a new card in the top of the active list', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_added',
            cardId: '0_0_0-0',
        });

        expect(actionResponse?.active[0]).toBe('0_0_0-0');
    });

    it('should delete a card in the hidden list', () => {
        const actionResponse = sectionReducer(sectionMock, {
            type: 'card_deleted',
            cardId: '2_2_2-2',
        });

        expect(actionResponse?.hidden.includes('2_2_2-2')).toBe(false);
    });

    it('should not affect the section if a action for hidden takes an id in active', () => {
        const action1 = sectionReducer(sectionMock, {
            type: 'card_deleted',
            cardId: 'a_a_a-a',
        });
        const action2 = sectionReducer(action1, {
            type: 'card_activated',
            cardId: 'c_c_c-c',
        });
        const action3 = sectionReducer(action2, {
            type: 'card_movedUp',
            cardId: '2_2_2-2',
        });
        const action4 = sectionReducer(action3, {
            type: 'card_movedDown',
            cardId: '2_2_2-2',
        });
        const finalAction = sectionReducer(action4, {
            type: 'card_hidden',
            cardId: '2_2_2-2',
        });

        expect(finalAction).toStrictEqual(sectionMock);
    });

    it('should return null for all actions when section is null', () => {
        const actions = [
            { type: 'card_activated', cardId: 'a_a_a-a' },
            { type: 'card_hidden', cardId: 'a_a_a-a' },
            { type: 'card_movedUp', cardId: 'a_a_a-a' },
            { type: 'card_movedDown', cardId: 'a_a_a-a' },
            { type: 'card_deleted', cardId: 'a_a_a-a' },
            { type: 'card_added', cardId: 'a_a_a-a' },
        ];

        actions.forEach((action) => {
            expect(sectionReducer(null, action)).toBe(null);
        });
    });

    it('should not modify section when moving non-existent card', () => {
        const result = sectionReducer(sectionMock, {
            type: 'card_movedUp',
            cardId: 'x_x_x-x',
        });
        expect(result).toStrictEqual(sectionMock);
    });

    it('should not modify section when hiding non-existent card', () => {
        const result = sectionReducer(sectionMock, {
            type: 'card_hidden',
            cardId: 'x_x_x-x',
        });
        expect(result).toStrictEqual(sectionMock);
    });

    it('should not modify section when activating non-existent card', () => {
        const result = sectionReducer(sectionMock, {
            type: 'card_activated',
            cardId: 'x_x_x-x',
        });
        expect(result).toStrictEqual(sectionMock);
    });

    describe('empty lists', () => {
        let emptySectionMock: Section;

        beforeEach(() => {
            emptySectionMock = {
                ...sectionMock,
                active: [],
                hidden: [],
            };
        });

        it('should add card to empty active list', () => {
            const result = sectionReducer(emptySectionMock, {
                type: 'card_added',
                cardId: 'x_x_x-x',
            });
            expect(result?.active).toStrictEqual(['x_x_x-x']);
        });

        it('should not modify empty lists with move operations', () => {
            const result = sectionReducer(emptySectionMock, {
                type: 'card_movedUp',
                cardId: 'x_x_x-x',
            });
            expect(result).toStrictEqual(emptySectionMock);
        });
    });

    it('should not duplicate IDs between active and hidden', () => {
        const result = sectionReducer(sectionMock, {
            type: 'card_activated',
            cardId: '1_1_1-1',
        });

        const activeIds = result?.active || [];
        const hiddenIds = result?.hidden || [];
        const intersection = activeIds.filter((id) => hiddenIds.includes(id));

        expect(intersection).toHaveLength(0);
    });

    describe('sectionReducer - single element lists', () => {
        let singleElementMock: Section;

        beforeEach(() => {
            singleElementMock = {
                ...sectionMock,
                active: ['a_a_a-a'],
                hidden: ['1_1_1-1'],
            };
        });

        it('should not modify single element when moving up', () => {
            const result = sectionReducer(singleElementMock, {
                type: 'card_movedUp',
                cardId: 'a_a_a-a',
            });
            expect(result?.active).toStrictEqual(['a_a_a-a']);
        });

        it('should not modify single element when moving down', () => {
            const result = sectionReducer(singleElementMock, {
                type: 'card_movedDown',
                cardId: 'a_a_a-a',
            });
            expect(result?.active).toStrictEqual(['a_a_a-a']);
        });
    });

    it('should not add duplicate card', () => {
        const result = sectionReducer(sectionMock, {
            type: 'card_added',
            cardId: 'a_a_a-a',
        });

        const cardCount =
            result?.active.filter((id) => id === 'a_a_a-a').length || 0;
        expect(cardCount).toBe(1);
    });
});

import { describe, test, expect, beforeEach, vitest } from 'vitest';
import { Deck } from '../deck';

describe('Propiedades de Deck', () => {
    let deck;

    const deckInfo = {
        name: 'test_ deck',
    };

    beforeEach(() => {
        deck = new Deck(deckInfo);
    });

    test('Es un objeto', () => {
        expect(typeof deck === 'object').toBe(true);
    });

    test('Tiene un nombre asignado por el usuario', () => {
        expect('name' in deck).toBe(true);
        expect(deck.name).toBe(deckInfo.name);
    });

    describe('Propiedades del id', () => {
        test('debe tener un id', () => {
            expect('id' in deck).toBe(true);
        });

        test('el id debe contener el nombre, sin espacios o caracteres diferentes a "_"', () => {
            const nameSanitized = deck.name.replace(/[^a-z0-9_]/gi, '');
            const regex = new RegExp(nameSanitized, 'ig');

            expect(regex.test(deck.id)).toBe(true);
        });

        test('el id de 100 deck generados en un ciclo debe ser diferente', () => {
            const idsLibrary = new Set();
            for (let i = 0; i < 100; i++) {
                const tempDeck = new Deck({ name: 'a' });
                idsLibrary.add(tempDeck.id);
            }

            expect(idsLibrary.size).toBe(100);
        });

        test('Implementa la funcionón random', () => {
            const randomSpy = vitest.spyOn(Math, 'random').mockReturnValue(0.5);
            const testDeck = new Deck({ name: 'test' });
            const expectedIdRandom = (1000000 * 0.5).toString(16);
            const regex = new RegExp(expectedIdRandom, 'ig');

            expect(randomSpy).toBeCalled();
            expect(regex.test(testDeck.id)).toBe(true);

            console.log(testDeck);
            vitest.restoreAllMocks;
        });
    });

    describe('Propiedades de la lista', () => {
        test('tiene una propiedad llamada cards', () => {
            expect('cards' in deck).toBe(true);
        });

        test('list es un set para evitar tarjetas duplicadas', () => {
            expect(deck.cards instanceof Set).toBe(true);
        });

        test('Se pueden cargar cartas al contruir el deck', () => {
            const testDeck = new Deck({
                name: 'test',
                cards: ['card1', 'card2', 'card3'],
            });

            expect(testDeck.cards.size).toBe(3)
        });
    });
});

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

            vitest.restoreAllMocks;
        });
    });

    describe('Propiedades de la lista', () => {
        test('tiene una propiedad llamada cards', () => {
            expect('getCards' in deck).toBe(true);
        });

        test('list es un set para evitar tarjetas duplicadas', () => {
            expect(deck.getCards instanceof Set).toBe(true);
        });

        test('Si a la creación del deck no se especifica ninguna carta, es un set vacío', () => {
            expect(deck.getCards.size).toBe(0);
        });

        test('Se pueden cargar cartas al contruir el deck', () => {
            const testDeck = new Deck({
                name: 'test',
                cards: ['card1', 'card2', 'card3'],
            });

            expect(testDeck.getCards.size).toBe(3);
        });

        test('Permite añadir una o varias cartas por su id luego de creado el deck', () => {
            deck.addCards('cardID');
            expect(deck.getCards.size).toBe(1);
            deck.addCards(['card1', 'card2', 'card3']);
            expect(deck.getCards.size).toBe(4);
        });

        test('sólo se puede editar la lista de cartas a través de setters', () => {
            deck.cards = 'someCardId';
            expect(deck.getCards.size).toBe(0);
            expect(() => {
                deck.getCards = 'someCardId';
            }).toThrowError();
        });

        test('Permite eliminar una o varias cartas por su id', () => {
            deck.addCards(['card1', 'card2', 'card3']);
            deck.removeCards('card1');
            expect(deck.getCards.size).toBe(2);
            deck.removeCards(['card2', 'card3']);
            expect(deck.getCards.size).toBe(0);
        });

        test('Permite actualizar un deck frente a una lista de ids', () => {
            deck.addCards(['card1', 'card2', 'card3']);
            deck.updateCards(['card2', 'cardA', 'cardB']);

            expect(deck.getCards.has('card1')).toBe(false)
            expect(deck.getCards.has('cardA')).toBe(true)
            expect(deck.getCards.has('card2')).toBe(true)

            deck.updateCards('cardX')
            expect(deck.getCards.has('cardA')).toBe(false)
            expect(deck.getCards.has('cardX')).toBe(true)
        });
    });
});

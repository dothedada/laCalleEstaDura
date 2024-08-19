import { describe, test, expect } from 'vitest';
import Card from '../card';

describe('Propiedades de la tarjeta', () => {
    const tarjeta = new Card();

    test('La clase Card crea un objeto', () => {
        expect(typeof tarjeta).toBe('object');
    });
    test('El objeto tiene un id, aleatorio', () => {
        expect(tarjeta.id).not.toBeUndefined();

        const ids = new Set();
        for (let i = 0; i < 1000; i++) {
            const card = new Card();
            ids.add(card.id);
        }

        expect(ids.size).toBe(1000);
    });
});

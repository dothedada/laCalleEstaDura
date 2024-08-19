import { describe, test, expect } from 'vitest';
import { createId, Contact, Profile } from '../card';

describe('Propiedades de la tarjeta', () => {
    test('createId genera 100 identidficadores aleatorios en un ciclo', () => {
        const ids = new Set();

        for (let i = 0; i < 100; i++) {
            const randomID = createId();
            ids.add(randomID);
        }

        expect(ids.size).toBe(100);
    });

    const testContact = {
        reference: 'Persona Contacto',
        name: 'Jane Doe',
        titleEsp: 'Persona',
        email: 'info@mmejia.com',
    };

    test('La clase Contact crea un objeto', () => {
        const contacto = new Contact(testContact);
        expect(typeof contacto).toBe('object');
    });

    test('El objeto tiene id, referencia, cargo en español, cargo en inglés, correo y teléfono', () => {
        const tarjeta = new Contact(testContact);
        expect(tarjeta.id).not.toBeUndefined();
        expect(tarjeta.reference).not.toBeUndefined();
        expect(tarjeta.titleEsp).not.toBeUndefined();
        expect(tarjeta.email).not.toBeUndefined();
    });

    test('Translated retorna falso si falta alguna versiond e title', () => {
        const contacto = new Contact(testContact);
        expect(contacto.translated).toBe(false);
    });

    test('Translated retorna true si falta alguna versiond e title', () => {
        const contacto = new Contact({ ...testContact, titleEng: 'person' });
        expect(contacto.translated).toBe(true);
    });
});

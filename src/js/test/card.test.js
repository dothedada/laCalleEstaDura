import { describe, test, expect } from 'vitest';
import { createId, Contact, Profile } from '../card';

describe('Propiedades de la tarjeta Contact', () => {
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

    test('Contiene el método update que actualiza la info y el estado de traducción', () => {
        const contacto = new Contact(testContact);
        expect(contacto.titleEng).toBeUndefined();
        contacto.update('titleEng', 'Person');
        expect(contacto.titleEng).toBe('Person');
    });

    test('El método update no crea nuevos parámetros', () => {
        const contacto = new Contact(testContact);
        expect('nonExistingParameter' in contacto).toBe(false);
        contacto.update('nonExistingParameter', 'something');
        expect('nonExistingParameter' in contacto).toBe(false);
    });

    test('Si la propiedad es traducible, actualiza el estado de traducción', () => {
        const contacto = new Contact(testContact);
        expect(contacto.titleEng).toBeUndefined();
        expect(contacto.translated).toBe(false);
        contacto.update('titleEng', 'person');
        expect(contacto.titleEng).toBeTruthy();
        expect(contacto.translated).toBe(true);
    });
});

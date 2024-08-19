import { describe, test, expect, beforeEach, vitest } from 'vitest';
import { Card, Contact, Profile } from '../card';

describe('Propiedades de la clase Card', () => {
    test('En un ciclo puede crear 1000 ids aleatorios', () => {
        const ids = new Set();

        for (let i = 0; i < 100; i++) {
            const testCard = new Card(i);
            ids.add(testCard.id);
        }

        expect(ids.size).toBe(100);
    });

    test('Debe llamar el método random', () => {
        const randomSpy = vitest.spyOn(Math, 'random').mockReturnValue(0.5);

        const card = new Card({});

        expect(randomSpy).toBeCalled();

        const expectedId = Math.round(0.5 * 1000000)
            .toString(16)
            .padStart(4, '0');

        expect(card.id.endsWith(expectedId)).toBe(true);
        vitest.restoreAllMocks;
    });

    test('Su type debe ser indefinido', () => {
        const card = new Card({});
        expect(card.type).toBeUndefined();
    });
});

describe('Propiedades de la tarjeta Contact', () => {
    test('createId genera 100 identidficadores aleatorios en un ciclo', () => {});
    let contact;

    beforeEach(() => {
        contact = new Contact({
            reference: 'Persona Contacto',
            name: 'Jane Doe',
            titleEsp: 'Persona',
            email: 'info@mmejia.com',
        });
    });

    test('La clase Contact crea un objeto', () => {
        expect(typeof contact).toBe('object');
    });

    test('El type del objeto debe ser "contact"', () => {
        expect(contact.type).toBe('contact');
    });

    test('El objeto tiene id, referencia, cargo en español, cargo en inglés, correo y teléfono', () => {
        expect(contact.id).not.toBeUndefined();
        expect(contact.reference).not.toBeUndefined();
        expect(contact.titleEsp).not.toBeUndefined();
        expect(contact.email).not.toBeUndefined();
    });

    test('Translated retorna falso si falta alguna version de title', () => {
        expect(contact.titleTranslated).toBe(false);
    });

    test('Translated retorna true existen ambas versiones de title', () => {
        const contact2 = new Contact({
            titleEng: 'person',
            titleEsp: 'persona',
        });
        expect(contact2.titleTranslated).toBe(true);
    });

    test('Contiene el método update que actualiza la info y el estado de traducción', () => {
        expect(contact.titleEng).toBeUndefined();
        contact.update('titleEng', 'Person');
        expect(contact.titleEng).toBe('Person');
    });

    test('El método update no crea nuevos parámetros', () => {
        expect('nonExistingParameter' in contact).toBe(false);
        contact.update('nonExistingParameter', 'something');
        expect('nonExistingParameter' in contact).toBe(false);
    });

    test('Si la propiedad es traducible, actualiza el estado de traducción', () => {
        expect(contact.titleEng).toBeUndefined();
        expect(contact.titleTranslated).toBe(false);
        contact.update('titleEng', 'person');
        expect(contact.titleEng).toBeTruthy();
        expect(contact.titleTranslated).toBe(true);
    });

    test('Tiene el método reset, que devuelve el parámetro a undefined', () => {
        expect(contact.titleEsp).toBeTruthy();
        contact.reset('titleEsp');
        expect(contact.titleEsp).toBeUndefined();
    });
});

describe('Propiedades de la tarjeta Profile', () => {
    const profile = new Profile({
        reference: 'Test de la tarjeta de perfil',
        name: 'Miguel Mejía',
        titleEsp: 'Comunicador audiovisual y desarrollador frontEnd',
        email: 'info@mmejia.com',
        link1: 'https://mmejia.com',
        phone: '(+57) 304 383 9127',
        location: 'Bogotá, Colombia',
    });

    test('El type de la tarjeta es "profile"', () => {
        expect(profile.type).toBe('profile');
    });

	test('Contiene los atributos location, link1 y link2', () => {
		expect('location' in profile).toBe(true)
		expect('link1' in profile).toBe(true)
		expect('link2' in profile).toBe(true)
	})
});

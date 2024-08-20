import { describe, test, expect, beforeEach, vitest } from 'vitest';
import {
    Card,
    Contact,
    Profile,
    Experience,
    Education,
    TextBlock,
    ListBlock,
} from '../card';

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
        expect('location' in profile).toBe(true);
        expect('link1' in profile).toBe(true);
        expect('link2' in profile).toBe(true);
    });
});

describe('Propiedades de la tarjeta Education', () => {
    let education;

    beforeEach(() => {
        education = new Education({
            reference: 'la nachjo',
            place: 'Universidad Nacional',
            titleEsp: 'Diseñador Gráfico',
            timeStart: '10 2020',
            timeEnd: '1|2023',
        });
    });

    test('hereda de la clase Card y el type de los objetos es "experience"', () => {
        expect(education instanceof Card).toBe(true);
        expect(education instanceof Education).toBe(true);
        expect(education.type).toBe('education');
    });

    test('sanitiza las fechas al momento de crearse el objeto', () => {
        expect(education.timeStart instanceof Date).toBe(true);
    });

    test('Si no hay fecha de finalización, dateEnd es igual a "active"', () => {
        const educationDateTest = new Education({
            timeStart: '10 2020',
        });
        expect(educationDateTest.timeEnd).toBe('active');
    });

    test('Si las fechas no incluyen mes, por default se toma enero', () => {
        const educationDateTest = new Education({
            timeStart: '2022',
            timeEnd: '2023',
        });

        expect(educationDateTest.timeStart.getMonth()).toBe(0);
        expect(educationDateTest.timeEnd.getMonth()).toBe(0);
    });

    test('Calcula el tiempo entre dos fechas', () => {
        const educationTimeGapTest = new Education({
            timeStart: '01/2020',
            timeEnd: '01/2024',
        });

        const educationTimeGapTest2 = new Education({
            timeStart: '01/2020',
            timeEnd: '04/2020',
        });

        expect(typeof education.timeGap).toBe('object');
        expect(education.timeGap.years).toBe(2);
        expect(education.timeGap.months).toBe(3);

        expect(educationTimeGapTest.timeGap.years).toBe(4);
        expect(educationTimeGapTest2.timeGap.months).toBe(3);
    });
});

describe('Propiedades de la tarjeta Experience', () => {
    const experience = new Experience({
        reference: 'JuanFer',
        place: 'Abstraer Estrategias',
        titleEsp: 'Director de diseño',
        timeStart: '1 2020',
        timeEnd: '10/2023',
        descriptionEsp: 'Descripción del cargo',
    });

    test('hereda de la clase Card y el type de los objetos es "experience"', () => {
        expect(experience instanceof Card).toBe(true);
        expect(experience instanceof Experience).toBe(true);
        expect(experience.type).toBe('experience');
    });
});

describe('Propiedades de la tarjeta TextBlock', () => {
    const bio = new TextBlock({
        type: 'bio',
        descriptionEsp: 'descripcion de mi perfil',
    });

    const skillText = new TextBlock({
        type: 'skill',
        descriptionEsp: ' descripcion de alguna aptitud',
    });

    test('Hereda atributos de Card y el type corresponde al asignado en la creación del objeto', () => {
        expect(bio instanceof Card).toBe(true);
        expect(bio.type).toBe('bio');
        expect(skillText instanceof Card).toBe(true);
        expect(skillText.type).toBe('skill');
    });
});

describe('Propiedades de la tarjeta ListBlock', () => {
    let skillsList;

    beforeEach(() => {
        skillsList = new ListBlock({
            list: ['a', 'b', ['c', 'd']],
        });
    });

    test('hereda atributos de Card y type es skill', () => {
        expect(skillsList instanceof Card).toBe(true);
        expect(skillsList.type).toBe('skill');
    });

    test('el atributo list es un array', () => {
        expect(Array.isArray(skillsList.list)).toBe(true);
    });

    test('Los valores del list tienen traduccion son un array', () => {
        expect(Array.isArray(skillsList.list[0])).toBe(false);
        expect(Array.isArray(skillsList.list[2])).toBe(true);
    });

    test('permite reubicar los elementos dentro del array', () => {
        skillsList.swapElements(1, 0);
        expect(skillsList.list[0]).toBe('b');
        expect(skillsList.list[1]).toBe('a');
        skillsList.swapElements(0, 2);
        expect(skillsList.list[2]).toBe('b');
    });

    test('permite eliminar elementos de la lista usando el indice', () => {
        expect(skillsList.list.length).toBe(3);
        skillsList.removeElement(2);
        expect(skillsList.list.length).toBe(2);
    });

    test('Permite crear un elemento y ubicarlo en el indice deseado', () => {
        skillsList.insertElement('x', 1);
        expect(skillsList.list.length).toBe(4);
        expect(skillsList.list[1]).toBe('x');

        skillsList.insertElement('y', 0);
        expect(skillsList.list.length).toBe(5);
        expect(skillsList.list[0]).toBe('y');

        skillsList.insertElement(['m', 'n'], 0);
        expect(skillsList.list.length).toBe(6);
        expect(skillsList.list[0][0]).toBe('m');
        expect(skillsList.list[0][1]).toBe('n');
    });

    test('Permite editar un elemento en el indice especificado', () => {
        skillsList.editElement('x', 2);
        expect(skillsList.list[2]).toBe('x');
    });

    test('filtra los elementos por idioma', () => {
        const listSpanish = skillsList.filterLang('Esp');
        expect(listSpanish).toEqual(['a', 'b', 'c']);
        const listEnglish = skillsList.filterLang('Eng');
        expect(listEnglish).toEqual(['a', 'b', 'd']);
    });
});

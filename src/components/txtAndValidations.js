export const inputValidation = {
    notEmpty: {
        pattern: /^(?!\s*$).+/,
        message: 'Este campo no puede estar vacío',
    },
    isDate: {
        pattern:
            /(^\b(1[0-2]|0?[1-9]|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b.*\b(\d{4})\b$|^$)|\b(current|actual(idad)?)\b/gi,
        message: 'Debe ser una fecha válida, ej: enero del 2012, ó, 4 2020',
    },
    isEmail: {
        pattern: /(^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$|^$)/g,
        message: 'Debe ser una dirección de correo electrónico válida',
    },
    isURL: {
        pattern:
            /\b(?<!@)((http(s)?:\/\/)?([a-z0-9-]+\.)?([a-z0-9-]{1,63}\.[a-z0-9]+)(\/[/\w\d\-+.*$%?#]+)?)(?!@)\b|^$/gi,
        message: 'Debe ser una url válida',
    },
    maxLength: (char) => ({
        pattern: `^.{0,${char}}$`,
        message: `Este campo no debe superar los ${char} caracteres`,
    }),
};

export const formValidation = {
    dateCoherence: ({ timeStart, timeEnd }) => {
        const dateEnd =
            /^$|current|actual(idad)?/gi.test(timeEnd) || timeEnd === undefined
                ? new Date()
                : timeEnd;
        const dateStartParsed = parseDate(timeStart);
        const dateEndParsed = parseDate(dateEnd);
        const isValid = dateStartParsed.getTime() < dateEndParsed.getTime();

        return {
            fieldset: 'Dates',
            validate: isValid,
            message: isValid
                ? ''
                : 'La fecha de inicio es posterior o igual a la de terminación',
        };
    },
};

// misc functions
export const cardTypesInOrder = [
    'profile',
    'bio',
    'experience',
    'skills',
    'education',
    'references',
];

export const findInString = {
    month: /\b(1[0-2]|0?[1-9]|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/i,
    year: /\b(\d{4})\b/,
};

export const months = [
    { Esp: 'enero', Eng: 'January' },
    { Esp: 'febrero', Eng: 'February' },
    { Esp: 'marzo', Eng: 'March' },
    { Esp: 'abril', Eng: 'April' },
    { Esp: 'mayo', Eng: 'May' },
    { Esp: 'junio', Eng: 'June' },
    { Esp: 'julio', Eng: 'July' },
    { Esp: 'agosto', Eng: 'August' },
    { Esp: 'septiembre', Eng: 'September' },
    { Esp: 'octubre', Eng: 'October' },
    { Esp: 'noviembre', Eng: 'November' },
    { Esp: 'diciembre', Eng: 'December' },
];

const parseMonth = (month) => {
    return /\d/.test(month)
        ? +month - 1
        : months.findIndex((m) => m.Esp === month.toLowerCase());
};

export const parseDate = (date) => {
    if (/^$|current|actual(idad)?/gi.test(date)) return date;
    if (date === undefined) return '';
    if (date instanceof Date) return date;

    const year = date.match(findInString.year)[0];
    const month = parseMonth(date.match(findInString.month)[0]);

    const newDate = new Date();
    newDate.setDate(1);
    newDate.setMonth(month);
    newDate.setFullYear(year);

    return newDate;
};

// UI text
export const iconsPaths = {
    renderInPdf: {
        true: 'M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32',
        false: 'M234.42 162a12 12 0 1 1-20.84 12l-16.86-29.5a127.2 127.2 0 0 1-30.17 13.86l5.29 31.64a12 12 0 0 1-9.87 13.8a11 11 0 0 1-2 .17a12 12 0 0 1-11.82-10l-5.15-30.8a136.5 136.5 0 0 1-30.06 0l-5.1 30.83A12 12 0 0 1 96 204a11 11 0 0 1-2-.17A12 12 0 0 1 84.16 190l5.29-31.72a127.2 127.2 0 0 1-30.17-13.86L42.42 174a12 12 0 1 1-20.84-12L40 129.85a160 160 0 0 1-17.31-18.31a12 12 0 0 1 18.65-15.08C57.38 116.32 85.44 140 128 140s70.62-23.68 86.66-43.54a12 12 0 0 1 18.67 15.08A160 160 0 0 1 216 129.85Z',
    },
    edit: 'm229.66 58.34l-32-32a8 8 0 0 0-11.32 0l-96 96A8 8 0 0 0 88 128v32a8 8 0 0 0 8 8h32a8 8 0 0 0 5.66-2.34l96-96a8 8 0 0 0 0-11.32M124.69 152H104v-20.69l64-64L188.69 88ZM200 76.69L179.31 56L192 43.31L212.69 64ZM224 128v80a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h80a8 8 0 0 1 0 16H48v160h160v-80a8 8 0 0 1 16 0',
    duplicate:
        'M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8m-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z',
    remove: 'M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0',
    dragNDrop:
        'M104 60a12 12 0 1 1-12-12a12 12 0 0 1 12 12m60 12a12 12 0 1 0-12-12a12 12 0 0 0 12 12m-72 44a12 12 0 1 0 12 12a12 12 0 0 0-12-12m72 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12m-72 68a12 12 0 1 0 12 12a12 12 0 0 0-12-12m72 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12',
    dowloadPdf:
        'M224 152a8 8 0 0 1-8 8h-24v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0v-56a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8M92 172a28 28 0 0 1-28 28h-8v8a8 8 0 0 1-16 0v-56a8 8 0 0 1 8-8h16a28 28 0 0 1 28 28m-16 0a12 12 0 0 0-12-12h-8v24h8a12 12 0 0 0 12-12m88 8a36 36 0 0 1-36 36h-16a8 8 0 0 1-8-8v-56a8 8 0 0 1 8-8h16a36 36 0 0 1 36 36m-16 0a20 20 0 0 0-20-20h-8v40h8a20 20 0 0 0 20-20M40 112V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0m120-32h28.69L160 51.31Z',
    downloadPlainText:
        'M240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h40a8 8 0 0 1 0 16H32v64h192v-64h-40a8 8 0 0 1 0-16h40a16 16 0 0 1 16 16m-117.66-2.34a8 8 0 0 0 11.32 0l48-48a8 8 0 0 0-11.32-11.32L136 108.69V24a8 8 0 0 0-16 0v84.69L85.66 74.34a8 8 0 0 0-11.32 11.32ZM200 168a12 12 0 1 0-12 12a12 12 0 0 0 12-12',
    uploadPlaintext:
        'M240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h48a8 8 0 0 1 0 16H32v64h192v-64h-48a8 8 0 0 1 0-16h48a16 16 0 0 1 16 16M85.66 77.66L120 43.31V128a8 8 0 0 0 16 0V43.31l34.34 34.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32M200 168a12 12 0 1 0-12 12a12 12 0 0 0 12-12',
    updateCard:
        'M224 48v48a8 8 0 0 1-8 8h-48a8 8 0 0 1 0-16h28.69l-14.63-14.63a79.56 79.56 0 0 0-56.13-23.43h-.45a79.52 79.52 0 0 0-55.89 22.77a8 8 0 0 1-11.18-11.44a96 96 0 0 1 135 .79L208 76.69V48a8 8 0 0 1 16 0m-37.59 135.29a80 80 0 0 1-112.47-.66L59.31 168H88a8 8 0 0 0 0-16H40a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-28.69l14.63 14.63A95.43 95.43 0 0 0 130 222.06h.53a95.36 95.36 0 0 0 67.07-27.33a8 8 0 0 0-11.18-11.44Z',
};

export const uiText = {
    global: {
        nonTranslated: 'Esta información aún no se ha traducido',
        buttons: {
            delete: 'Eliminar tarjeta',
            reset: (previousData) => (previousData ? 'Deshacer' : 'Reiniciar'),
            save: (previousData) => (previousData ? 'Actualizar' : 'Guardar'),
        },
        bar: {
            reader: {
                duplicateCard:
                    'Haz clic para duplicar la tarjeta y abrir el cuadro de edición',
                editCard: 'Haz clic para abrir el cuadro de edición',
                renderInPdf: {
                    open: 'Este elemento se encuentra en la configuración de la hoja de vida actual, haz clic para quitarlo.',
                    closed: 'Este elemento no se encuentra en la configuración de la hoja de vida actual, haz clic para incorporarlo.',
                },
            },
        },
        inputs: {
            lengthStatus: (maxLength, currentLengt) =>
                `, quedan ${maxLength - currentLengt} caracteres.`,
        },
        separator: {
            type1: ' | ',
            type2: ' • ',
        },
        dialog: {
            removeDeckForm: {
                text: (id) =>
                    `¿Realmente quieres borrar la hoja de vida ${id}?`,
                cancelBtn: {
                    reader: 'no borrar la hoja de vida y cerrar dialogo',
                    text: 'No borrar',
                },
                saveBtn: {
                    reader: 'Borrar la hoja de vida y cerrar dialogo',
                    text: 'Si, borrar definitivamente',
                },
            },
            addDeckForm: {
                label: '¿Qué nombre le quieres dar a esta nueva hoja de vida',
                placeholder: 'Hoja de vida para diseño 2024',
                cancelBtn: {
                    reader: 'no crear la hoja de vida y cerrar dialogo',
                    text: 'Cancelar',
                },
                saveBtn: {
                    reader: 'crear la hoja de vida y cerrar dialogo',
                    text: 'Guardar',
                },
            },
            close: {
                reader: 'cerrar esta ventana',
                text: 'X',
            },
        },
        deck: {
            importData: {
                reader: 'importar tarjetas desde archivo',
                text: 'Importar',
            },
            exportData: {
                reader: 'exportar tarjetas a archivo',
                text: 'Exportar',
            },
            cvSelector: {
                reader: 'Selecciona una hoja de vida',
                text: '---',
            },
            language: {
                toEnglish: {
                    reader: 'ver la información en inglés',
                    text: 'Inglés',
                },
                toSpanish: {
                    reader: 'ver la información en español',
                    text: 'Español',
                },
            },
            viewCV: { reader: 'Ver hoja de vida', text: 'Ver' },
            downloadCV: {
                reader: 'Descargar pdf con la hoja de vida',
                text: 'PDF',
            },
            deleteModel: {
                reader: 'Borrar configuración de tarjetas',
                text: 'Borrar CV',
            },
            createModel: {
                reader: 'Crear configuración de tarjetas',
                text: 'Crear CV',
            },
            updateModel: {
                reader: 'Actualizar configuración de tarjetas',
                text: 'Actualizar CV',
            },
        },
        sections: {
            Esp: {
                profile: 'Presentación e información de contacto',
                bio: 'Perfil',
                experience: 'Experiencia',
                skills: 'Habilidades',
                references: 'Referencias laborales',
                education: 'Formación académica',
            },
            Eng: {
                profile: 'Presentation and contact information',
                bio: 'Profile',
                experience: 'Experience',
                skills: 'Skills',
                references: 'Work references',
                education: 'Educational background',
            },
        },
    },

    profile: {
        reference: 'Nuevo perfil',
        legend: {
            title: '¿Qué sabes hacer o a qué posición aspiras?',
            links: '¿Algún sitio web o red social que quieras compartir?',
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            name: '¿Cómo te llamas?',
            titleEsp: 'en español',
            titleEng: 'en inglés',
            email: '¿Cuál es tu correo electrónico?',
            phone: '¿Cuál es tu número de teléfono?',
            link1: 'enlace 1',
            link2: 'enlace 2',
            location: '¿Dónde te encuentras?',
        },
        placeholder: {
            reference: 'Lo que haces o quieres hacer',
            name: 'Casimiro Butifú',
            titleEsp: 'Inspector de siestas senior',
            titleEng: 'Senior nap inspector',
            email: 'casimiro@supernap.com',
            phone: '(+57) 666 999 1234',
            link1: 'https://tuweb.com',
            link2: 'https://linkedin.com/tuperfil',
            location: 'Bogotá, Colombia.',
        },
    },

    bio: {
        reference: 'Nuevo perfil profesional',
        legend: {
            description: '¿Cómo te relacionas con tu trabajo? ¿qué te gusta?',
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            descriptionEsp: 'en español',
            descriptionEng: 'en inglés',
        },
        placeholder: {
            reference: 'Lo que haces o quieres hacer',
            descriptionEsp:
                'Soy un ingeniero de siestas con más de 10 años de experiencia...',
            descriptionEng:
                'I am a nap engineer with over 10 years of experience...',
        },
    },

    experience: {
        reference: 'Nueva experiencia laboral',
        legend: {
            date: '¿Cuánto tiempo trabajaste allí?',
            title: '¿Cuál fue tu cargo?',
            description: '¿Cuáles fueron tus logros o qué tareas realizaste?',
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            place: '¿Cómo se llamaba el lugar donde trabajaste?',
            timeStart: 'mes y año de inicio',
            timeEnd: 'mes y año de finalización',
            titleEsp: 'en español',
            titleEng: 'en inglés',
            descriptionEsp: 'en español',
            descriptionEng: 'en inglés',
        },
        placeholder: {
            reference: 'El nombre del lugar o el trabajo que hiciste',
            place: 'Acme Inc.',
            timeStart: 'Octubre 2023',
            timeEnd: 'Octubre 2024 ó actual',
            titleEsp: 'Ingeniero de puentes y festivos',
            titleEng: 'Holidays engineer',
            descriptionEsp:
                'Dirigí el equipo de sugerencias. Implementar la semana laboral de 4 días.',
            descriptionEng:
                'Led the suggestion team. Implement the 4-day workweek.',
        },
    },

    skillsText: {
        reference: 'Nuevo párrafo de habilidades',
        legend: {
            description:
                '¿Cuáles serían las habilidades que mejor te descirben?',
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            descriptionEsp: 'en español',
            descriptionEng: 'en inglés',
        },
        placeholder: {
            descriptionEsp:
                'Soy un ingeniero de siestas con más de 10 años de experiencia...',
            descriptionEng:
                'I am a nap engineer with over 10 years of experience...',
        },
    },

    skillsList: {
        reference: 'Nuevo listado de habilidades',
        legend: {
            description:
                '¿Qué tipo de habilidades se encuentran en esta lista?',
        },
        button: {
            remove: {
                reader: 'eliminar esta habilidad de la lista',
                text: 'X',
            },
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            instructions:
                'En caso de necesitar traduccion, separa la habilidad en español de la traducción a inglés con una barra inclinada (ej. Dios de las siestas / God of nap).',
            addButton: 'Añadir una nueva habilidad',
            listTitleEsp: 'en español',
            listTitleEng: 'en inglés',
        },
        placeholder: {
            reference: 'Habilidades técnicas, personalidad...  ',
            item: 'sinTraducción, ó, español/inglés',
            listTitleEsp:
                'Conocimientos avanzados en... Habilidades blandas... ',
            listTitleEng: 'Advance knowledge... Soft skills...',
        },
    },

    education: {
        reference: 'Nuevo proceso de formación',
        legend: {
            date: '¿Cuanto tiempo duró el proceso?',
            title: '¿Cuál fue el título o información obtenida?',
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            place: '¿Nombre de la institución o del proceso de formación?',
            timeStart: 'mes y año de inicio',
            timeEnd: 'mes y año de finalización',
            titleEsp: 'en español',
            titleEng: 'en inglés',
        },
        placeholder: {
            reference: 'El nombre del lugar o el proceso que hiciste',
            place: 'Universidad Nacional ó, Diplomado virtual en Finlandia',
            timeStart: 'Octubre 2023',
            timeEnd: 'Octubre 2024 ó actual',
            titleEsp: 'Ingeniero de puentes y festivos',
            titleEng: 'Holidays engineer',
        },
    },

    references: {
        reference: 'Nueva referencia laboral',
        legend: {
            title: '¿Qué relación laboral tenían o qué cargo tiene la persona?',
        },
        label: {
            reference: '¿Qué nombre le vas a dar a esta tarjeta?',
            name: '¿Nombre de quien vas a poner como referencia laboral?',
            titleEsp: 'en español',
            titleEng: 'en inglés',
            email: '¿Cuál es su correo electrónico?',
            phone: '¿Cuál es su número de teléfono?',
        },
        placeholder: {
            reference: 'lugar en el que se conocieron',
            name: 'Casimiro Butifú',
            titleEsp: 'Inspector de siestas senior',
            titleEng: 'Senior nap inspector',
            email: 'casimiro@supernap.com',
            phone: '(+57) 666 999 1234',
        },
    },
};

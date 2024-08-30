export const inputValidation = {
    notEmpty: {
        pattern: /^(?!\s*$).+/,
        message: 'Este campo no puede estar vacío',
    },
    isDate: {
        pattern:
            /(^\b(1[0-2]|0?[1-9]|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b.*\b(\d{4})\b$|^$)/g,
        message: 'Debe ser una fecha válida, ej: enero del 2012, ó, 4 2020',
    },
    dateSecuence: {
        comparison: ({ timeStart, timeEnd }) => {
            const dateStart = parseDate(timeStart);
            const dateEnd = parseDate(timeEnd);
            return +dateStart.getTime() < +dateEnd.getTime();
        },
        message: 'La fecha de inicio es posterior o igual a la de terminación',
    },
    isEmail: {
        pattern: /(^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$|^$)/g,
        message: 'Debe ser una dirección de correo electrónico válida',
    },
    maxLength: (char) => ({
        pattern: `^.{0,${char}}$`,
        message: `Este campo no debe superar los ${char} caracteres`,
    }),
};

export const findInString = {
    month: /\b(1[0-2]|0?[1-9]|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/,
    year: /\b(\d{4})\b/,
};

export const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
];

const parseMonth = (month) => {
    return /\d/.test(month)
        ? +month - 1
        : months.findIndex((m) => m === month.toLowerCase());
};

export const parseDate = (date) => {
    if (!date) return new Date();
    if (date instanceof Date) return date;

    const year = date.match(findInString.year)[0];
    const month = parseMonth(date.match(findInString.month)[0]);

    const newDate = new Date();
    newDate.setDate(1);
    newDate.setMonth(month);
    newDate.setFullYear(year);

    return newDate;
};

export const iconsPaths = {
    edit: {
        true: 'M208 80H96V56a32 32 0 0 1 32-32c15.37 0 29.2 11 32.16 25.59a8 8 0 0 0 15.68-3.18C171.32 24.15 151.2 8 128 8a48.05 48.05 0 0 0-48 48v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M48 128h160v16H48Zm0 32h160v16H48Zm160-64v16H48V96Zm0 112H48v-16h160z',
        false: 'M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M48 128h160v16H48Zm0 32h160v16H48ZM96 56a32 32 0 0 1 64 0v24H96Zm112 40v16H48V96Zm0 112H48v-16h160z',
    },
    renderInPdf: {
        true: 'M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32',
        false: 'M234.42 162a12 12 0 1 1-20.84 12l-16.86-29.5a127.2 127.2 0 0 1-30.17 13.86l5.29 31.64a12 12 0 0 1-9.87 13.8a11 11 0 0 1-2 .17a12 12 0 0 1-11.82-10l-5.15-30.8a136.5 136.5 0 0 1-30.06 0l-5.1 30.83A12 12 0 0 1 96 204a11 11 0 0 1-2-.17A12 12 0 0 1 84.16 190l5.29-31.72a127.2 127.2 0 0 1-30.17-13.86L42.42 174a12 12 0 1 1-20.84-12L40 129.85a160 160 0 0 1-17.31-18.31a12 12 0 0 1 18.65-15.08C57.38 116.32 85.44 140 128 140s70.62-23.68 86.66-43.54a12 12 0 0 1 18.67 15.08A160 160 0 0 1 216 129.85Z',
    },
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
        buttons: {
            delete: 'Eliminar tarjeta',
            reset: (previousData) => (previousData ? 'Deshacer' : 'Reiniciar'),
            save: (previousData) => (previousData ? 'Actualizar' : 'Guardar'),
        },
        reader: {
            editCard: {
                open: 'Haz clic para abrir el cuadro de edición',
                closed: 'Haz clic para guardar los cambios y cerrar',
            },
            renderInPdf: {
                open: 'Este elemento se encuentra en la hoja de vida actual, haz clic para cambiar el estado.',
                closed: 'Este elemento no se encuentra en la hoja de vida actual, haz clic para cambiar el estado.',
            },
        },
        inputs: {
            lengthStatus: (maxLength, currentLengt) =>
                `, quedan ${maxLength - currentLengt} caracteres.`,
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
            reference: '¿Cómo se llama esta tarjeta?',
            place: '¿Cómo se llamaba el lugar donde trabajaste?',
            timeStart: 'mes de inicio',
            timeEnd: 'mes de terminación',
            titleEsp: 'en español',
            titleEng: 'en inglés',
            descriptionEsp: 'en español',
            descriptionEng: 'en inglés',
        },
        placeholder: {
            reference: 'El nombre del lugar o lo que hiciste',
            place: 'Acme Inc.',
            timeStart: 'Octubre 2023',
            timeEnd: 'Octubre 2024',
            titleEsp: 'Ingeniero de puentes y festivos',
            titleEng: 'Holidays engineer',
            descriptionEsp:
                'Dirigir el equipo de sugerencias. Implementar la semana laboral de 4 días.',
            descriptionEng:
                'Lead the suggestion team. Implement the 4-day workweek.',
        },
    },
};

export const inputValidation = {
    notEmpty: {
        pattern: /^(?!\s*$).+/,
        message: 'Este campo no puede estar vacío',
    },
    isDate: {
        pattern:
            /(\b(1[0-2]|0?[1-9]|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b.*\b(\d{4})\b|^$)/g,
        message: 'Debe ser una fecha válida, ej: enero del 2012, ó, 4 2020',
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

export const iconsPaths = {
    edit: {
        open: 'M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88',
        close: 'm227.32 73.37l-44.69-44.68a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.32l112-112a16 16 0 0 0 0-22.63M92.69 208H48v-44.69l88-88L180.69 120ZM192 108.69L147.32 64l24-24L216 84.69Z',
    },
    renderInPdf: {
        open: 'M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32',
        close: 'M234.42 162a12 12 0 1 1-20.84 12l-16.86-29.5a127.2 127.2 0 0 1-30.17 13.86l5.29 31.64a12 12 0 0 1-9.87 13.8a11 11 0 0 1-2 .17a12 12 0 0 1-11.82-10l-5.15-30.8a136.5 136.5 0 0 1-30.06 0l-5.1 30.83A12 12 0 0 1 96 204a11 11 0 0 1-2-.17A12 12 0 0 1 84.16 190l5.29-31.72a127.2 127.2 0 0 1-30.17-13.86L42.42 174a12 12 0 1 1-20.84-12L40 129.85a160 160 0 0 1-17.31-18.31a12 12 0 0 1 18.65-15.08C57.38 116.32 85.44 140 128 140s70.62-23.68 86.66-43.54a12 12 0 0 1 18.67 15.08A160 160 0 0 1 216 129.85Z',
    },
};

export const inputUiText = {
    global: {
        buttons: {
            delete: 'Eliminar tarjeta',
            reset: (previousData) => (previousData ? 'Deshacer' : 'Reiniciar'),
            save: (previousData) => (previousData ? 'Actualizar' : 'Guardar'),
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

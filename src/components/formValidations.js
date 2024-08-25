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

export const inputUiText = {
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

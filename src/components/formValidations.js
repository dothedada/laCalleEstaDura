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
        label: {
            place: '¿Cómo se llamaba el lugar donde trabajaste?',
            timeStart: 'mes de inicio',
            timeEnd: 'mes de terminación',
            titleEsp: 'en español',
            titleEng: 'en inglés',
            descriptionEsp: 'en español',
            descriptionEng: 'en inglés',
        },
        placeholder: {
            place: 'Acme Inc.',
            timeStart: 'Octubre 2023',
            timeEnd: 'Octubre 2024',
            titleEsp: 'Ingeniero de puentes y festivos',
            titleEng: 'Holidays engineer',
            descriptionEsp: 'Describe tus logros o las tareas que llevaste a cabo',
            descriptionEng: 'Describe your achievments or task performed',
        },
    },
};

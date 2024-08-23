export const inputValidation = {
    maxLength: (char) => ({
        pattern: `^.{0,${char}}$`,
        message: `Este campo no debe superar los ${char} caracteres`,
    }),
    notEmpty: {
        pattern: /^(?!\s*$).+/,
        message: 'Este campo no puede estar vacío',
    },
    isDate: {
        pattern:
            /\b(1[0-2]|0?[1-9]|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b.*\b(\d{4})\b/g,
        message: 'Debe ser una fecha válida, ej: enero del 2012, ó, 4 2020',
    },
    isEmail: {
        pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/g,
        message: 'Debe ser una dirección de correo electrónico válida',
    },
};

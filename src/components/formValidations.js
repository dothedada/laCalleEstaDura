export const inputValidation = {
    maxLength: (char) => ({
        pattern: '',
        message: `Este campo no debe superar los ${char} caracteres`,
    }),
    notEmpty: {
        pattern: /^(?!\s*$).+/,
        message: 'Este campo no puede estar vacío',
    },
    isDate: { pattern: /[a]/g, message: 'debe haber una a' },
    isEmail: { pattern: /[a]/g, message: 'debe haber una a' },
};

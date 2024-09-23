import cardClass from '../js/card';
import { months, uiText } from './txtAndValidations';

// props
const updateField = (updater, field) => (value) => {
    updater((previousData) => ({
        ...previousData,
        [field]: value,
    }));
};

const propGenerator = (type, inputRefs, data, dataSetter) => (name) => {
    const dateToRender =
        data[name] instanceof Date
            ? `${months[data[name].getMonth()]['Esp']} ${data[name].getFullYear()}`
            : data[name];

    return {
        ref: inputRefs[name],
        dataField: /^time[ES]/.test(name) ? dateToRender : data[name],
        callback: updateField(dataSetter, name),
        label: uiText[type].label[name],
        placeholder: uiText[type].placeholder[name],
    };
};

// Validations
const validateInputs = (inputsRefs) => {
    const invalidInputs = Object.values(inputsRefs).reduce((errors, ref) => {
        const inputError = ref.current.validate();
        if (inputError) errors.push(inputError);
        return errors;
    }, []);

    if (invalidInputs.length) {
        invalidInputs[0].focus();
        return false;
    }

    return true;
};

const validateForm = (validationsResults, validationStateSetter) => {
    if (!validationsResults.length) return true;

    validationStateSetter(validationsResults);
    if (validationsResults.some((test) => test.validate === false)) {
        return false;
    }

    return true;
};

const getFieldValidation = (validation, from) => {
    return from.find((test) => test.fieldset === validation) ?? {};
};

// data handling methods
const resetData = (startingData, dataSetter) => {
    dataSetter(startingData || {});
};

const deleteData = (startingData, cardHandler) => {
    if (!startingData) return;
    localStorage.removeItem(startingData.id);
    cardHandler();
};

const saveData = (
    type,
    inputRefs,
    startingData,
    dataToInject,
    formValidations,
    stateSetters,
) => {
    const { setGlobalValidations, setDataToInject, cardsManager } =
        stateSetters;
    const { storedCards, setStoredCards, dialogRef, dialogHandler } =
        cardsManager;

    // --- validacion

    if (!validateInputs(inputRefs)) return;
    if (!validateForm(formValidations, setGlobalValidations)) return;

    // --- fin validacion
    // --- creacion del objeto card, y cardDeck
    let card;
    const cardDeck = [...storedCards];

    console.log('update' in startingData);
    if (Object.keys(startingData).length > 0) {
        Object.keys(dataToInject).forEach((field) => {
            if (dataToInject[field] !== startingData[field]) {
                startingData.update(field, dataToInject[field]);
            }
        });

        card = { ...startingData };
        const cardIndexInDeck = cardDeck.findIndex(
            (cardInDeck) => cardInDeck.id === card.id,
        );
        cardDeck.splice(cardIndexInDeck, 1, card);
    } else {
        const data = { ...dataToInject, type: type };

        card = new cardClass[type](data);
        cardDeck.push(card);
    }

    // --- fin creacion del objeto card
    // --- incorporacion del objeto card al flujo

    // actualiza LS
    localStorage.setItem(card.id, JSON.stringify(card));
    // actualiza Interfase
    setStoredCards((prvCardGroups) => ({ ...prvCardGroups, [type]: cardDeck }));
    // actualiza formulario ??? es necesario???
    // setDataToInject(() => card);

    // cierra y limpia dialog
    dialogRef.current.close();
    dialogHandler();
    // cierra dialog
    // cardsSetter((prvData) => {
    //     console.log(prvData);
    //     return prvData;
    // });
};

export { propGenerator, resetData, deleteData, saveData, getFieldValidation };

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
            ? `${months[data[name].getMonth()]} ${data[name].getFullYear()}`
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
    if (!validationsResults.length) return true
    validationStateSetter(validationsResults);

    if (validationsResults.filter((test) => test.validate === false).length) {
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

const deleteData = (startingData) => {
    if (!startingData) return;
    localStorage.removeItem(startingData.id);
};

const saveData = (
    type,
    inputRefs,
    startingData,
    dataToInject,
    formValidations,
    stateSetters,
    dataType = undefined,
) => {
    const {
        setGlobalValidations,
        setDataToInject,
        setRenderInPdf,
        setOpenToEdit,
    } = stateSetters;
    if (!validateInputs(inputRefs)) return;

    if (!validateForm(formValidations, setGlobalValidations)) return;

    const isUpdate = !!startingData;
    if (isUpdate) {
        Object.keys(dataToInject).forEach((field) => {
            if (dataToInject[field] !== startingData[field]) {
                startingData.update(field, dataToInject[field]);
            }
        });
    }

    const card = new cardClass[type](isUpdate ? startingData : dataToInject);
    if (dataType) card.update('type', dataType)
    localStorage.setItem(card.id, JSON.stringify(card));

    setDataToInject(() => card);
    setRenderInPdf(true);
    setOpenToEdit(false);
};

export { propGenerator, resetData, deleteData, saveData, getFieldValidation };

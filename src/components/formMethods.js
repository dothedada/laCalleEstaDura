import cardClass from '../js/card'
import { months, uiText } from './txtAndValidations';

// export const cardClass = {
//     experience: Experience,
//     education: Education,
//     profile: Profile,
//     contact: Contact,
//     textBlock: TextBlock,
//     listBlock: ListBlock,
// };

// props
export const updateField = (updater, field) => (value) => {
    updater((previousData) => ({
        ...previousData,
        [field]: value,
    }));
};

export const propGenerator = (inputRefs, data, dataSetter) => (name) => {
    const dateToRender =
        data[name] instanceof Date
            ? `${months[data[name].getMonth()]} ${data[name].getFullYear()}`
            : data[name];

    return {
        ref: inputRefs[name],
        dataField: /^time[ES]/.test(name) ? dateToRender : data[name],
        callback: updateField(dataSetter, name),
        label: uiText.experience.label[name],
        placeholder: uiText.experience.placeholder[name],
    };
};

// Validations
export const validateInputs = (inputsRefs) => {
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

export const validateForm = (validationsResults, validationStateSetter) => {
    validationStateSetter(validationsResults);

    if (validationsResults.filter((test) => test.validate === false).length) {
        return false;
    }

    return true;
};

export const getFieldValidation = (validation, from) => {
    return from.find((test) => test.fieldset === validation) ?? {};
};

// data handling methods
export const resetData = (startingData, dataSetter) => {
    dataSetter(startingData || {});
};

export const deleteData = (startingData) => {
    if (!startingData) return;
    localStorage.removeItem(startingData.id);
};

export const saveData = (
    type,
    inputRefs,
    startingData,
    dataToInject,
    formValidations,
    stateSetters,
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
    localStorage.setItem(card.id, JSON.stringify(card));

    setDataToInject(() => card);
    setRenderInPdf(true);
    setOpenToEdit(false);
};

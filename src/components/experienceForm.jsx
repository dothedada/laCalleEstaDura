import { useRef, useState } from 'react';

import { Experience } from '../js/card';
import { TextInput, FormButtons, DataContainer, Bar } from './formComponents';
import {
    inputValidation,
    formValidation,
    months,
    uiText,
} from './txtAndValidations.js';
import { ExperiencePreview } from './previewCards.jsx';

// TODO:
// estilos preview
// 5. extraer metodoa
// 6. implementación en otros tipos de tarjetas
// 7. creación del componente contenedor de los dormularios
// 7. creacion del modelo base
// 8. creación del pdf

const resetData = (startingData, dataSetter) => {
    dataSetter(startingData || {});
};

const deleteData = (startingData) => {
    if (!startingData) return;
    localStorage.removeItem(startingData.id);
};

const saveData = (inputRefs, startingData, dataToInject, stateSetters) => {
    const {
        setGlobalValidation,
        setDataToInject,
        setRenderInPdf,
        setOpenToEdit,
    } = stateSetters;
    if (!validateInputs(inputRefs)) return;

    const formValidations = [formValidation.dateCoherence(dataToInject)];
    if (!validateForm(formValidations, setGlobalValidation)) return;

    const isUpdate = !!startingData;
    if (isUpdate) {
        Object.keys(dataToInject).forEach((field) => {
            if (dataToInject[field] !== startingData[field]) {
                startingData.update(field, dataToInject[field]);
            }
        });
    }

    const newCard = new Experience(isUpdate ? startingData : dataToInject);
    localStorage.setItem(newCard.id, JSON.stringify(newCard));

    setDataToInject(() => newCard);
    setRenderInPdf(true);
    setOpenToEdit(false);
};

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

const validateForm = (validationsArray, validationStateSetter) => {
    validationStateSetter(validationsArray);

    if (validationsArray.filter((test) => test.validate === false).length) {
        return false;
    }

    return true;
};

const getFieldValidation = (validation, from) => {
    return from.find((test) => test.fieldset === validation) ?? {};
};

const ExperienceForm = ({ data }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(false);

    const [openToEdit, setOpenToEdit] = useState(false);
    const [startingData] = useState(data || undefined);
    const [dataToInject, setDataToInject] = useState(() => {
        return startingData ? structuredClone(startingData) : {};
    });
    const [globalValidations, setGlobalValidations] = useState([]);

    const setDataToUpdate = (key) => (value) => {
        setDataToInject((previousData) => ({
            ...previousData,
            [key]: value,
        }));
    };

    const refs = {
        place: useRef(),
        timeStart: useRef(),
        timeEnd: useRef(),
        titleEsp: useRef(),
        titleEng: useRef(),
        descriptionEsp: useRef(),
        descriptionEng: useRef(),
    };

    const propGenerator = (name) => {
        const dateToRender =
            dataToInject[name] instanceof Date
                ? `${months[dataToInject[name].getMonth()]} ${dataToInject[name].getFullYear()}`
                : dataToInject[name];

        return {
            ref: refs[name],
            dataField: /^time[ES]/.test(name)
                ? dateToRender
                : dataToInject[name],
            callback: setDataToUpdate(name),
            label: uiText.experience.label[name],
            placeholder: uiText.experience.placeholder[name],
        };
    };

    const handleSave = () => {
        saveData(refs, startingData, dataToInject, {
            setGlobalValidation: setGlobalValidations,
            setDataToInject,
            setRenderInPdf,
            setOpenToEdit,
        });
    };

    const datesValidation = getFieldValidation('Dates', globalValidations);

    return (
        <div className="card__config" id={'cardID'}>
            <Bar
                data={dataToInject}
                open={openToEdit}
                editHandler={() => setOpenToEdit(!openToEdit)}
                inPdf={renderInPdf}
                inPdfHandler={() => setRenderInPdf(!renderInPdf)}
            />

            <DataContainer
                open={openToEdit}
                preview={
                    renderInPdf && <ExperiencePreview data={startingData} />
                }
            >
                <TextInput {...propGenerator('reference')} ref={null} />
                <hr />

                <TextInput
                    {...propGenerator('place')}
                    validations={[inputValidation.notEmpty]}
                />

                <fieldset
                    className={
                        datesValidation.validate === false
                            ? 'fieldset__error'
                            : ''
                    }
                >
                    <legend>
                        {uiText.experience.legend.date}{' '}
                        <span>{datesValidation.message}</span>
                    </legend>

                    <TextInput
                        {...propGenerator('timeStart')}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.isDate,
                        ]}
                    />

                    <TextInput
                        {...propGenerator('timeEnd')}
                        validations={[inputValidation.isDate]}
                    />
                </fieldset>

                <fieldset>
                    <legend>{uiText.experience.legend.title}</legend>
                    <TextInput
                        {...propGenerator('titleEsp')}
                        validations={[inputValidation.notEmpty]}
                    />

                    <TextInput
                        {...propGenerator('titleEng')}
                        sugestTranslation={
                            dataToInject.titleEsp && !dataToInject.titleEng
                        }
                    />
                </fieldset>

                <fieldset>
                    <legend>{uiText.experience.legend.description}</legend>

                    <TextInput
                        {...propGenerator('descriptionEsp')}
                        height="5"
                        oneLine={false}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.maxLength(350),
                        ]}
                    />

                    <TextInput
                        {...propGenerator('descriptionEng')}
                        oneLine={false}
                        height="5"
                        validations={[inputValidation.maxLength(350)]}
                        sugestTranslation={
                            dataToInject.descriptionEsp &&
                            !dataToInject.descriptionEng
                        }
                    />
                </fieldset>

                <FormButtons
                    previousData={startingData}
                    deleteCallback={() => deleteData(startingData)}
                    resetCallback={() =>
                        resetData(startingData, setDataToInject)
                    }
                    saveCallback={handleSave}
                />
            </DataContainer>
        </div>
    );
};

export default ExperienceForm;

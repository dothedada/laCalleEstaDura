import { useRef, useState } from 'react';

import { Experience } from '../js/card';
import {
    TextInput,
    FormButtons,
    DataContainer,
    CardBar,
} from './formComponents';
import {
    inputValidation,
    formValidation,
    months,
    uiText,
} from './txtAndValidations.js';
import { ExperiencePreview } from './previewCards.jsx';

// TODO:
// 5. botón de editar de la barra tambien sirve para guardar
// 6. implementación en otros tipos de tarjetas
// 7. creación del componente contenedor de los dormularios
// 7. creacion del modelo base
// 8. creación del pdf

const ExperienceForm = ({ data }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(false);

    const [openToEdit, setOpenToEdit] = useState(false);
    const [startingData] = useState(data || undefined);
    const [dataToInject, setDataToInject] = useState(() => {
        return startingData ? structuredClone(startingData) : {};
    });
    const [globalValidation, setGlobalValidation] = useState([]);

    const updateData = (key) => (value) => {
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
        return {
            ref: refs[name],
            dataField:
                dataToInject[name] instanceof Date
                    ? `${months[dataToInject[name].getMonth()]} ${dataToInject[name].getFullYear()}`
                    : dataToInject[name],
            callback: updateData(name),
            label: uiText.experience.label[name],
            placeholder: uiText.experience.placeholder[name],
        };
    };

    const handleDelete = () => {
        if (!startingData) return;
        localStorage.removeItem(startingData.id);
    };

    const handleReset = () => {
        setDataToInject(startingData || {});
    };

    const handleSave = () => {
        const wrongInputs = Object.values(refs).reduce((errors, ref) => {
            const inputWithError = ref.current.validate();
            if (inputWithError) errors.push(inputWithError);
            return errors;
        }, []);

        if (wrongInputs.length) {
            wrongInputs[0].focus();
            return;
        }

        const formValidations = [formValidation.dateCoherence(dataToInject)];
        setGlobalValidation(formValidations);
        if (formValidations.filter((test) => test.validate === false).length) {
            return;
        }

        if (!startingData) {
            dataToInject.reference = dataToInject.reference ?? undefined;
            const newCard = new Experience(dataToInject);
            localStorage.setItem(newCard.id, JSON.stringify(newCard));
        } else {
            Object.keys(dataToInject).forEach((field) => {
                if (dataToInject[field] !== startingData[field]) {
                    startingData.update(field, dataToInject[field]);
                }
            });
            localStorage.setItem(startingData.id, JSON.stringify(startingData));
        }

        setRenderInPdf(true);
        setOpenToEdit(false);
    };

    const getLocalValidation = (validation) => {
        return (
            globalValidation.find((test) => test.fieldset === validation) ?? {}
        );
    };

    const datesValidation = getLocalValidation('Dates');

    return (
        <div className="card__config" id={'cardID'}>
            <CardBar
                data={startingData ?? undefined}
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
                        datesValidation.validate === false && 'fieldset__error'
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
                    deleteCallback={handleDelete}
                    resetCallback={handleReset}
                    saveCallback={handleSave}
                />
            </DataContainer>
        </div>
    );
};

export default ExperienceForm;

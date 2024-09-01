import { useRef, useState } from 'react';
import { TextInput, FormButtons, DataContainer, Bar } from './formComponents';
import { ExperiencePreview } from './previewCards.jsx';
import {
    inputValidation,
    formValidation,
    uiText,
} from './txtAndValidations.js';
import {
    propGenerator,
    resetData,
    deleteData,
    saveData,
    getFieldValidation,
} from './formMethods.js';

// TODO:
// 6. implementación en otros tipos de tarjetas
// 7. creación del componente contenedor de los dormularios
// 7. creacion del modelo base
// 8. creación del pdf

const ExperienceForm = ({ data }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(false);

    const [openToEdit, setOpenToEdit] = useState(false);
    const [startingData] = useState(data || undefined);
    const [dataToInject, setDataToInject] = useState(() =>
        startingData ? structuredClone(startingData) : {},
    );
    const [globalValidations, setGlobalValidations] = useState([]);

    // form inputs
    const refs = {
        place: useRef(),
        timeStart: useRef(),
        timeEnd: useRef(),
        titleEsp: useRef(),
        titleEng: useRef(),
        descriptionEsp: useRef(),
        descriptionEng: useRef(),
    };
    const props = propGenerator(refs, dataToInject, setDataToInject);

    // card handlers
    const handleDelete = () => deleteData(startingData);
    const handleReset = () => resetData(startingData, setDataToInject);
    const handleSave = () => {
        saveData(
            refs,
            startingData,
            dataToInject,
            //form validations array
            [formValidation.dateCoherence(dataToInject)],
            // setters
            {
                setGlobalValidations,
                setDataToInject,
                setRenderInPdf,
                setOpenToEdit,
            },
        );
    };

    // global validations
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
                <TextInput {...props('reference')} ref={null} />
                <hr />

                <TextInput
                    {...props('place')}
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
                        {...props('timeStart')}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.isDate,
                        ]}
                    />

                    <TextInput
                        {...props('timeEnd')}
                        validations={[inputValidation.isDate]}
                    />
                </fieldset>

                <fieldset>
                    <legend>{uiText.experience.legend.title}</legend>
                    <TextInput
                        {...props('titleEsp')}
                        validations={[inputValidation.notEmpty]}
                    />

                    <TextInput
                        {...props('titleEng')}
                        sugestTranslation={
                            dataToInject.titleEsp && !dataToInject.titleEng
                        }
                    />
                </fieldset>

                <fieldset>
                    <legend>{uiText.experience.legend.description}</legend>

                    <TextInput
                        {...props('descriptionEsp')}
                        height="5"
                        oneLine={false}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.maxLength(350),
                        ]}
                    />

                    <TextInput
                        {...props('descriptionEng')}
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

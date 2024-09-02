import { useRef, useState } from 'react';
import {
    TextInput,
    FormButtons,
    DataContainer,
    Bar,
    Fieldset,
} from './formComponents';
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

const ExperienceForm = ({ data, inPdf, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf = true);
    const inPdfHandler = () => {
        console.log(inPdfCallback)
        setRenderInPdf(!renderInPdf);
    };

    // Card states
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
            'experience',
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

    // global validations info collectors
    const datesValidation = getFieldValidation('Dates', globalValidations);

    return (
        <div className="card__config" id={'cardID'}>
            <Bar
                data={dataToInject}
                open={openToEdit}
                editHandler={() => setOpenToEdit(!openToEdit)}
                inPdf={renderInPdf}
                inPdfHandler={inPdfHandler}
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

                <Fieldset
                    legend={uiText.experience.legend.date}
                    validation={datesValidation}
                >
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
                </Fieldset>

                <Fieldset legend={uiText.experience.legend.title}>
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
                </Fieldset>

                <Fieldset legend={uiText.experience.legend.description}>
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
                </Fieldset>

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

import { useRef, useState } from 'react';

import { Input, FormButtons, Bar, Fieldset } from './formComponents';
// import { ExperiencePreview } from './previewCards.jsx';
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

const ExperienceForm = ({ data, inPdf = true, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf);
    const inPdfHandler = () => {
        console.log(inPdfCallback);
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
    const props = propGenerator(
        'experience',
        refs,
        dataToInject,
        setDataToInject,
    );

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
        <div className="card" id={'cardID'}>
            <Bar
                type="experience"
                data={dataToInject}
                open={openToEdit}
                editHandler={() => setOpenToEdit(!openToEdit)}
                inPdf={renderInPdf}
                inPdfHandler={inPdfHandler}
            />

            <Container
                open={openToEdit}
                preview={
                    renderInPdf && <ExperiencePreview data={startingData} />
                }
            >
                <Input {...props('reference')} ref={null} />
                <hr />

                <Input
                    {...props('place')}
                    validations={[inputValidation.notEmpty]}
                />

                <Fieldset
                    legend={uiText.experience.legend.date}
                    validation={datesValidation}
                >
                    <Input
                        {...props('timeStart')}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.isDate,
                        ]}
                    />

                    <Input
                        {...props('timeEnd')}
                        validations={[inputValidation.isDate]}
                    />
                </Fieldset>

                <Fieldset legend={uiText.experience.legend.title}>
                    <Input
                        {...props('titleEsp')}
                        validations={[inputValidation.notEmpty]}
                    />

                    <Input
                        {...props('titleEng')}
                        sugestTranslation={
                            dataToInject.titleEsp && !dataToInject.titleEng
                        }
                    />
                </Fieldset>

                <Fieldset legend={uiText.experience.legend.description}>
                    <Input
                        {...props('descriptionEsp')}
                        height="5"
                        oneLine={false}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.maxLength(350),
                        ]}
                    />

                    <Input
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
            </Container>
        </div>
    );
};

export default ExperienceForm;

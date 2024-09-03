import { useRef, useState } from 'react';

import { Input, FormButtons, Container, Bar, Fieldset } from './formComponents';
import { ExperiencePreview } from './previewCards.jsx';
import {
    inputValidation,
    uiText,
} from './txtAndValidations.js';
import {
    propGenerator,
    resetData,
    deleteData,
    saveData,
} from './formMethods.js';

const BioForm = ({ data, inPdf = true, inPdfCallback }) => {
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

    // form inputs
    const refs = {
        descriptionEsp: useRef(),
        descriptionEng: useRef(),
    };
    const props = propGenerator('bio', refs, dataToInject, setDataToInject);

    // card handlers
    const handleDelete = () => deleteData(startingData);
    const handleReset = () => resetData(startingData, setDataToInject);
    const handleSave = () => {
        saveData(
            'bio',
            refs,
            startingData,
            dataToInject,
            //form validations array
            [],
            // setters
            {
                setDataToInject,
                setRenderInPdf,
                setOpenToEdit,
            },
        );
    };

    // global validations info collectors

    return (
        <div className="card__config" id={'cardID'}>
            <Bar
                type="bio"
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

                <Fieldset legend={uiText.bio.legend.description}>
                    <Input
                        {...props('descriptionEsp')}
                        height="5"
                        oneLine={false}
                        validations={[
                            inputValidation.notEmpty,
                            inputValidation.maxLength(450),
                        ]}
                    />

                    <Input
                        {...props('descriptionEng')}
                        oneLine={false}
                        height="5"
                        validations={[inputValidation.maxLength(450)]}
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

export default BioForm;

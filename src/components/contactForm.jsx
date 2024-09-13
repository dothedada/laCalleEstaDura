import { useRef, useState } from 'react';

import { Input, FormButtons, Container, Bar, Fieldset } from './formComponents';
import { ExperiencePreview } from './previewCards.jsx';
import { inputValidation, uiText } from './txtAndValidations.js';
import {
    propGenerator,
    resetData,
    deleteData,
    saveData,
} from './formMethods.js';

const ContactForm = ({ data, inPdf = true, inPdfCallback }) => {
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
        name: useRef(),
        titleEsp: useRef(),
        titleEng: useRef(),
        email: useRef(),
        phone: useRef(),
    };
    const props = propGenerator('contact', refs, dataToInject, setDataToInject);

    // card handlers
    const handleDelete = () => {
        console.log(dataToInject, startingData);
    };
    const handleReset = () => {
        console.log(dataToInject, startingData);
    };
    const handleSave = () => {
        console.log(dataToInject, startingData);
    };

    return (
        <div className="card" id={'cardID'}>
            <Bar
                type="contact"
                data={dataToInject}
                open={openToEdit}
                editHandler={() => setOpenToEdit(!openToEdit)}
                inPdf={renderInPdf}
                inPdfHandler={inPdfHandler}
            />

            <Container open={openToEdit}>
                <Input {...props('reference')} ref={null} />
                <hr />

                <Input
                    {...props('name')}
                    validations={[inputValidation.notEmpty]}
                />

                <Fieldset legend={uiText.contact.legend.title}>
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

                <Input
                    {...props('email')}
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.isEmail,
                    ]}
                />

                <Input
                    {...props('phone')}
                    validations={[inputValidation.notEmpty]}
                />

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

export default ContactForm;

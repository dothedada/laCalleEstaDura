import { useRef, useState } from 'react';

import { Input, FormButtons, Fieldset } from './formComponents';
import { inputValidation, uiText } from './txtAndValidations.js';
import {
    propGenerator,
    resetData,
    deleteData,
    saveData,
} from './formMethods.js';

const BioForm = ({ data, inPdfCallback }) => {
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
            },
        );
        inPdfCallback();
    };

    return (
        <div className="card__form" id={'cardID'}>
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
        </div>
    );
};

export default BioForm;

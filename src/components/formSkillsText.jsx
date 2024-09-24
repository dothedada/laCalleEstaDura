import { useEffect, useMemo, useRef, useState } from 'react';

import { Input, FormButtons, Fieldset } from './formComponents';
import { inputValidation, uiText } from './txtAndValidations.js';
import {
    propGenerator,
    resetData,
    deleteData,
    saveData,
} from './formMethods.js';

const SkillsTextForm = ({ data, cardsManager, inPdfCallback, update }) => {
    const initialData = useMemo(() => data ?? {}, [data]);
    const [startingData, setStartingData] = useState(initialData);
    const [dataToInject, setDataToInject] = useState({ ...initialData });

    useEffect(() => {
        setStartingData(() => (update ? initialData : {}));
    }, [initialData, update]);

    // form inputs
    const refs = {
        descriptionEsp: useRef(),
        descriptionEng: useRef(),
    };
    const props = propGenerator(
        'skillsText',
        refs,
        dataToInject,
        setDataToInject,
    );

    // card handlers
    const handleDelete = () => deleteData(startingData, cardsManager);
    const handleReset = () => resetData(startingData, setDataToInject);
    const handleSave = () => {
        saveData(
            'skillsText',
            refs,
            startingData,
            dataToInject,
            //form validations array
            [],
            // setters
            {
                cardsManager,
            },
        );
        inPdfCallback();
    };

    return (
        <div className="card__form" id={'cardID'}>
            <Input {...props('reference')} ref={null} />
            <hr />

            <Fieldset legend={uiText.skillsText.legend.description}>
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
                previousData={update}
                deleteCallback={handleDelete}
                resetCallback={handleReset}
                saveCallback={handleSave}
            />
        </div>
    );
};

export default SkillsTextForm;

import { useEffect, useMemo, useRef, useState } from 'react';

import { Input, FormButtons, Fieldset } from './formComponents';
import { inputValidation, uiText } from './txtAndValidations.js';
import {
    propGenerator,
    resetData,
    deleteData,
    saveData,
} from './formMethods.js';

const ProfileForm = ({ data, cardsManager, inPdfCallback, update }) => {
    const initialData = useMemo(() => data ?? {}, [data]);
    const [startingData, setStartingData] = useState(initialData);
    const [dataToInject, setDataToInject] = useState({ ...initialData });

    useEffect(() => {
        setStartingData(() => (update ? initialData : {}));
    }, [initialData, update]);

    const refs = {
        name: useRef(),
        titleEsp: useRef(),
        titleEng: useRef(),
        email: useRef(),
        phone: useRef(),
        link1: useRef(),
        link2: useRef(),
        location: useRef(),
    };
    const props = propGenerator('profile', refs, dataToInject, setDataToInject);

    // card handlers
    const handleDelete = () => deleteData(startingData, cardsManager);
    const handleReset = () => resetData(startingData, setDataToInject);
    const handleSave = () => {
        saveData(
            'profile',
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
        <div className="card__form">
            <Input {...props('reference')} ref={null} />
            <hr />

            <Input
                {...props('name')}
                validations={[inputValidation.notEmpty]}
            />

            <Fieldset legend={uiText.profile.legend.title}>
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

            <Input {...props('phone')} />

            <Fieldset legend={uiText.profile.legend.links}>
                <Input
                    {...props('link1')}
                    validations={[inputValidation.isURL]}
                />

                <Input
                    {...props('link2')}
                    validations={[inputValidation.isURL]}
                />
            </Fieldset>

            <Input {...props('location')} />
            <FormButtons
                previousData={update}
                deleteCallback={handleDelete}
                resetCallback={handleReset}
                saveCallback={handleSave}
            />
        </div>
    );
};

export default ProfileForm;

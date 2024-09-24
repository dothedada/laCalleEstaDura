import { useEffect, useMemo, useRef, useState } from 'react';

import { Input, FormButtons, Fieldset } from './formComponents';
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

const EducationForm = ({ data, cardsManager, inPdfCallback, update }) => {
    const initialData = useMemo(() => data ?? {}, [data]);
    const [startingData, setStartingData] = useState(initialData);
    const [dataToInject, setDataToInject] = useState({ ...initialData });
    const [globalValidations, setGlobalValidations] = useState([]);

    useEffect(() => {
        setStartingData(() => (update ? initialData : {}));
    }, [initialData, update]);

    // form inputs
    const refs = {
        place: useRef(),
        timeStart: useRef(),
        timeEnd: useRef(),
        titleEsp: useRef(),
        titleEng: useRef(),
    };
    const props = propGenerator(
        'education',
        refs,
        dataToInject,
        setDataToInject,
    );

    // card handlers
    const handleDelete = () => deleteData(startingData, cardsManager);
    const handleReset = () => resetData(startingData, setDataToInject);
    const handleSave = () => {
        saveData(
            'education',
            refs,
            startingData,
            dataToInject,
            //form validations array
            [formValidation.dateCoherence(dataToInject)],
            // setters
            {
                setGlobalValidations,
                cardsManager,
            },
        );
        inPdfCallback();
    };

    // global validations info collectors
    const datesValidation = getFieldValidation('Dates', globalValidations);

    return (
        <div className="card__form" id={'cardID'}>
            <Input {...props('reference')} ref={null} />
            <hr />

            <Input
                {...props('place')}
                validations={[inputValidation.notEmpty]}
            />

            <Fieldset
                legend={uiText.education.legend.date}
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

            <Fieldset legend={uiText.education.legend.title}>
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

            <FormButtons
                previousData={update}
                deleteCallback={handleDelete}
                resetCallback={handleReset}
                saveCallback={handleSave}
            />
        </div>
    );
};

export default EducationForm;

import { useEffect, useMemo, useRef, useState } from 'react';

import { Input, ListItem, FormButtons, Fieldset } from './formComponents';
import { propGenerator, deleteData, saveData } from './formMethods';
import { uiText } from './txtAndValidations';

const keygen = () =>
    (Math.floor(Math.random() * 1000) + new Date().getTime()).toString(26);

const SkillsListForm = ({ data, cardsManager, inPdfCallback, update }) => {
    const currentKeygen = keygen();
    const newBlankSkill = { value: '', visible: true, id: currentKeygen };

    // Card states
    const initialData = useMemo(() => data ?? {}, [data]);
    const [startingData, setStartingData] = useState(initialData);
    const [dataToInject, setDataToInject] = useState(
        'list' in initialData ? { ...initialData } : { list: [newBlankSkill] },
    );

    // const [dataToInject, setDataToInject] = useState(() =>
    //     startingData
    //         ? structuredClone(startingData)
    //         : { list: [newBlankSkill] },
    // );

    useEffect(() => {
        setStartingData(() => (update ? initialData : {}));
    }, [initialData, update]);

    const refs = {
        listTitleEsp: useRef(),
        listTitleEng: useRef(),
    };

    const props = propGenerator(
        'skillsList',
        refs,
        dataToInject,
        setDataToInject,
    );

    // card handlers
    const handleDelete = () => deleteData(startingData, cardsManager);
    const handleReset = () => {
        setDataToInject(() => startingData ?? { list: [newBlankSkill] });
    };
    const handleSave = () => {
        const sanitizedSkills = structuredClone(dataToInject);
        sanitizedSkills.list = sanitizedSkills.list.filter(
            (skill) => skill.value,
        );

        saveData(
            'skillsList',
            refs, //no references to check
            startingData,
            sanitizedSkills,
            //form validations array
            [],
            // setters
            {
                cardsManager,
            },
        );

        inPdfCallback();
    };

    const updateSkill = (id) => (item) => {
        const skillIndex = dataToInject.list.findIndex(
            (skill) => skill.id === id,
        );

        if (skillIndex < 0) {
            setDataToInject((prv) => ({ ...prv, list: [item] }));
        } else {
            const updatedSkills = structuredClone(dataToInject);
            updatedSkills.list[skillIndex] = item;
            setDataToInject(updatedSkills);
        }
    };

    const addSkill = () => {
        const updatedSkills = structuredClone(dataToInject);
        updatedSkills.list.push({ visible: true, id: keygen() });
        setDataToInject(updatedSkills);
    };

    const removeSkill = (id) => () => {
        const newSkillsList = dataToInject.list.filter(
            (skill) => id !== skill.id,
        );
        setDataToInject((prv) => ({ ...prv, list: newSkillsList }));
    };

    const addAvailability = dataToInject.list.some((skill) => !skill.value);

    return (
        <div className="card__form" id={'cardID'}>
            <Input {...props('reference')} ref={null} />
            <hr />

            <Fieldset legend={uiText.skillsList.legend.description}>
                <Input {...props('listTitleEsp')} />

                <Input
                    {...props('listTitleEng')}
                    sugestTranslation={
                        dataToInject.listTitleEsp && !dataToInject.listTitleEng
                    }
                />
            </Fieldset>

            <p>{uiText.skillsList.label.instructions}</p>

            <ul className="skills-list">
                {dataToInject.list.map((skill) => (
                    <ListItem
                        data={skill}
                        key={skill.id}
                        updateListCallback={updateSkill(skill.id)}
                        removeItemCallback={removeSkill(skill.id)}
                        placeholder={uiText.skillsList.placeholder.item}
                    />
                ))}
            </ul>

            <button
                className="add-item"
                type="button"
                onClick={addSkill}
                disabled={addAvailability}
            >
                {uiText.skillsList.label.addButton}
            </button>

            <hr />

            <FormButtons
                previousData={update}
                deleteCallback={handleDelete}
                resetCallback={handleReset}
                saveCallback={handleSave}
            />
        </div>
    );
};

export default SkillsListForm;

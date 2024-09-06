import { useState, useRef, useCallback } from 'react';
import { Bar, Container, Input, ListItem, FormButtons } from './formComponents';
import { ExperiencePreview } from './previewCards';
import { propGenerator, deleteData, resetData, saveData } from './formMethods';

const keygen = () =>
    (Math.floor(Math.random() * 1000) + new Date().getTime()).toString(26);

const SkillList = ({ data, inPdf, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf);
    const inPdfHandler = () => {
        console.log(inPdfCallback);
        setRenderInPdf(!renderInPdf);
    };

    const currentKeygen = keygen();
    // Card states
    const [openToEdit, setOpenToEdit] = useState(false);
    const [startingData] = useState(data || undefined);
    const [dataToInject, setDataToInject] = useState(() =>
        startingData
            ? structuredClone(startingData)
            : {
                  list: [
                      {
                          value: '',
                          visible: true,
                          id: currentKeygen,
                      },
                  ],
              },
    );

    const props = propGenerator(
        'skillsList',
        {},
        dataToInject,
        setDataToInject,
    );

    // card handlers
    const handleDelete = () => deleteData(startingData);
    const handleReset = () => resetData(startingData, setDataToInject);
    const handleSave = () => {
        saveData(
            'skillsList',
            {}, //no references to check
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

    const updateSkill = useCallback(
        (id) => (item) => {
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
        },
        [dataToInject],
    );

    const addSkill = () => {
        const updatedSkills = structuredClone(dataToInject);
        updatedSkills.list.push({ visible: true, id: keygen() });
        console.log(updatedSkills);
        setDataToInject(updatedSkills);
        console.log(dataToInject);
    };

    const removeSkill = (id) => () => {
        const newSkillsList = dataToInject.list.filter(
            (skill) => id !== skill.id,
        );
        console.log(newSkillsList)
        setDataToInject((prv) => ({ ...prv, list: newSkillsList }));
    };

    const addAvailability = dataToInject.list.some(
        (skill) => skill.value === '',
    );

    return (
        <div className="card__config" id={'cardID'}>
            <Bar
                type="skillsList"
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

                <p>
                    En caso de necesitar traduccion, separa la habilidad en dos
                    idiomas con una barra inclinada, (ej. habilidad, ó,
                    habilidad en español / habilidad en inglés)
                </p>

                {dataToInject.list
                    .reduce((list, item) => {
                        if (item.visible) list.push(item.value);
                        return list;
                    }, [])
                    .join(', ')}

                <ul className="skills-list">
                    {dataToInject.list.map((skill) => (
                        <ListItem
                            data={skill}
                            key={skill.id}
                            updateListCallback={updateSkill(skill.id)}
                            removeItemCallback={removeSkill(skill.id)}
                            placeholder={'pato'}
                        />
                    ))}
                </ul>

                <button
                    className="add-item"
                    type="button"
                    onClick={addSkill}
                    disabled={addAvailability}
                >
                    carajo
                </button>

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

export default SkillList;

// const List = ({ items, placeholder, callback }) => {
//     const [skills, setSkills] = useState(items);
//
//     const updateSkill = (id) => (data) => {
//         const skillIndex = skills.findIndex((skill) => skill.id === id);
//
//         if (skillIndex < 0) {
//             setSkills([data]);
//             callback(data);
//         } else {
//             const updatedSkills = [...skills];
//             updatedSkills[skillIndex] = data;
//             setSkills(updatedSkills);
//             callback(updatedSkills);
//         }
//     };
//
//     const addSkill = () => {
//         setSkills((prv) => [...prv, { visible: true, id: keygen() }]);
//     };
//
//     const removeSkill = (id) => () => {
//         const newSkillsList = skills.filter((skill) => id !== skill.id);
//         setSkills(newSkillsList);
//     };
//
//     const currentKeygen = keygen();
//     const addAvailability = skills.some((skill) => skill.value === '');
//
//     return (
//         <>
//             <p>
//                 En caso de necesitar traduccion, separa la habilidad en dos
//                 idiomas con una barra inclinada, (ej. habilidad, ó, habilidad en
//                 español / habilidad en inglés)
//             </p>
//             <ul className="skills-list">
//                 {skills.length ? (
//                     skills.map((skill) => (
//                         <ListItem
//                             data={skill}
//                             key={skill.id}
//                             listCallback={updateSkill(skill.id)}
//                             removeCallback={removeSkill(skill.id)}
//                             placeholder={placeholder}
//                         />
//                     ))
//                 ) : (
//                     <ListItem
//                         data={{
//                             value: '',
//                             visible: true,
//                             id: currentKeygen,
//                         }}
//                         key={currentKeygen}
//                         listCallback={updateSkill(currentKeygen)}
//                         removeCallback={removeSkill(currentKeygen)}
//                         placeholder={placeholder}
//                     />
//                 )}
//             </ul>
//             <button
//                 className="add-item"
//                 type="button"
//                 onClick={addSkill}
//                 disabled={addAvailability}
//             >
//                 Añadir habilidad
//             </button>
//         </>
//     );
// };

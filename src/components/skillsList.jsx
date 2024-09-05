
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

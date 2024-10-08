import { uiText } from './txtAndValidations';

const SkillsListPreview = ({ data, lang }) => {
    const listTitle = data?.[`listTitle${lang}`] || uiText.global.nonTranslated;
    const langIndex = lang === 'Esp' ? 0 : 1;

    const visibleSkills = data?.list.reduce((list, item) => {
        if (item.visible) {
            item = {
                ...item,
                value: /[/]/.test(item.value)
                    ? item.value.split('/')[langIndex]
                    : item.value,
            };

            list.push(item);
        }
        return list;
    }, []);

    return (
        <div>
            {listTitle && <h3>{listTitle}</h3>}
            <ul>
                {visibleSkills.map((skill) => (
                    <li key={skill.id}>{skill.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsListPreview;

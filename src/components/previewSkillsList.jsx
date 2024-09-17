import { Bar } from './formComponents';

const SkillsListPreview = ({ 
    data,
    lang,
    inPdf,
    inPdfCallback,
    editHandler,
    duplicateHandler,
}) => {
    const listTitle = data?.[`listTitle${lang}`];
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
        <div className="card" data-id={data.id} data-inpdf={inPdf}>
            <Bar
                data={data}
                inPdf={inPdf}
                editHandler={editHandler}
                duplicateHandler={duplicateHandler}
                inPdfHandler={inPdfCallback}
            />

            {inPdf && (
                <div className="card__preview">
                    {listTitle && <h3>{listTitle}</h3>}
                    <ul>
                        {visibleSkills.map((skill) => (
                            <li key={skill.id}>{skill.value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SkillsListPreview;

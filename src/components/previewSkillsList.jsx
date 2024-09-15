import { useState } from 'react';

import { Bar } from './formComponents';

const SkillsList = ({ data, lang, inPdf, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf);
    const inPdfHandler = () => {
        setRenderInPdf(!renderInPdf);
    };

    const listTitle = data?.[`listTitle${lang}`];
    const langIndex = lang === 'Esp' ? 0 : 1;

    const visibleSkills = data?.list.reduce((list, item) => {
        if (item.visible) {
            item.value = /[/]/.test(item.value)
                ? item.value.split('/')[langIndex]
                : item.value;

            list.push(item);
        }
        return list;
    }, []);

    const [startingData] = useState(data);

    return (
        <div className="card" id={'cardID'}>
            <Bar
                data={startingData}
                editHandler={() => console.log('edita')}
                duplicateHandler={() => console.log('duplica')}
                inPdf={renderInPdf}
                inPdfHandler={inPdfHandler}
            />

            {renderInPdf && (
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

export default SkillsList;

import { useState } from 'react';

import { Bar } from './formComponents';
import { months } from './txtAndValidations';

const formatDate = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    return `${months[workingDate.getMonth()]['Esp']} ${workingDate.getFullYear()}`;
};

const dateLabel = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    const formatedMonth = `${+workingDate.getMonth() + 1}`.padStart(2, '0');
    return `${workingDate.getFullYear()}-${formatedMonth}`;
};

const ExperiencePreview = ({ data, lang, inPdf, inPdfCallback }) => {
    const [startingData] = useState(data || undefined);

    return (
        <div className="card" id={'cardID'}>
            <Bar
                data={startingData}
                editHandler={() => console.log('edita')}
                duplicateHandler={() => console.log('duplica')}
                inPdf={inPdf}
                inPdfHandler={inPdfCallback}
            />

            {inPdf && (
                <div className="card__preview">
                    <div>
                        <h3>
                            {`${data.place} `}
                            <span className="secondary">
                                <time dateTime={dateLabel(data.timeStart)}>
                                    {formatDate(data.timeStart)}
                                </time>
                                {' - '}
                                <time dateTime={dateLabel(data.timeEnd)}>
                                    {formatDate(data.timeEnd)}
                                </time>
                            </span>
                        </h3>
                        <div className="title">{data[`title${lang}`]}</div>
                    </div>
                    <p>{data[`description${lang}`]}</p>
                </div>
            )}
        </div>
    );
};

export default ExperiencePreview;

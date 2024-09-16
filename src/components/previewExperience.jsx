import { Bar } from './formComponents';
import { months } from './txtAndValidations';

const formatDate = (date, lang) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    return `${months[workingDate.getMonth()][lang]} ${workingDate.getFullYear()}`;
};

const dateLabel = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    const formatedMonth = `${+workingDate.getMonth() + 1}`.padStart(2, '0');
    return `${workingDate.getFullYear()}-${formatedMonth}`;
};

const ExperiencePreview = ({
    data,
    lang,
    inPdf,
    editHandler,
    duplicateHandler,
    inPdfCallback,
}) => {
    return (
        <div className="card" id={'cardID'}>
            <Bar
                data={data}
                inPdf={inPdf}
                editHandler={editHandler}
                duplicateHandler={duplicateHandler}
                inPdfHandler={inPdfCallback}
            />

            {inPdf && (
                <div className="card__preview">
                    <div>
                        <h3>
                            {`${data.place} `}
                            <span className="secondary">
                                <time dateTime={dateLabel(data.timeStart)}>
                                    {formatDate(data.timeStart, lang)}
                                </time>
                                {' - '}
                                <time dateTime={dateLabel(data.timeEnd)}>
                                    {formatDate(data.timeEnd, lang)}
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

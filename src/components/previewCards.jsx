import { months } from './txtAndValidations';

const formatDate = (date) => {
    if (!date || (!(date instanceof Date) && date !== 'current')) return;

    const workingDate = date instanceof Date ? date : new Date();
    return `${months[workingDate.getMonth()]} ${workingDate.getFullYear()}`;
};

const dateLabel = (date) => {
    if (!date || (!(date instanceof Date) && date !== 'current')) return;

    const workingDate = date instanceof Date ? date : new Date();
    const formatedMonth = `${+workingDate.getMonth() + 1}`.padStart(2, '0');
    return `${workingDate.getFullYear()}-${formatedMonth}`;
};

const ExperiencePreview = ({ data, lang = 'Esp' }) => {
    return (
        data && (
            <article>
                <header>
                    <h3>
                        {data.place}
                        <span className="date">
                            <time dateTime={dateLabel(data.timeStart)}>
                                {formatDate(data.timeStart)}{' '}
                            </time>
                            -
                            <time dateTime={dateLabel(data.timeEnd)}>
                                {' '}
                                {formatDate(data.timeEnd)}
                            </time>
                        </span>
                    </h3>
                    <div className="title">{data[`title${lang}`]}</div>
                </header>
                <p>{data[`description${lang}`]}</p>
            </article>
        )
    );
};

export { ExperiencePreview };

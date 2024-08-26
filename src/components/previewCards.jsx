import { months } from './txtAndValidations';

const formatDate = (date) => {
    if (!(date instanceof Date) || !date) return;
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const dateLabel = (date) => {
    if (!(date instanceof Date) || !date) return;
    const formatedMonth = `${+date.getMonth() + 1}`.padStart(2, '0');
    return `${date.getFullYear()}-${formatedMonth}`;
};

const ExperiencePreview = ({ data, lang }) => {
    return (
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
    );
};

export { ExperiencePreview };

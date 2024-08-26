import { months } from './txtAndValidations';

const formatDate = (date) => `${months[date.getMonth()]} ${date.getFullYear()}`;

const dateLabel = (date) => {
    const formatedMonth = `${+date.getMonth() + 1}`.padStart(2, '0');
    return `${date.getFullYear()}-${formatedMonth}`;
};

const ExperiencePreview = ({ data, lang }) => {
    const timeStart = formatDate(data.timeStart);
    const timeEnd = formatDate(data.timeEnd);
    const timeLabelStart = dateLabel(data.timeStart);
    const timeLabelEnd = dateLabel(data.timeEnd);

    return (
        <article>
            <header>
                <h3>
                    {data.place}
                    <span className="date">
                        <time dateTime={timeLabelStart}>{timeStart} </time>-
                        <time dateTime={timeLabelEnd}> {timeEnd}</time>
                    </span>
                </h3>
                <div className="title">{data[`title${lang}`]}</div>
            </header>
            <p>{data[`description${lang}`]}</p>
        </article>
    );
};

export { ExperiencePreview };

import { dateLabel, formatDate } from './previewMethods';

const ExperiencePreview = ({ data, lang }) => {
    return (
        <>
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
        </>
    );
};

export default ExperiencePreview;

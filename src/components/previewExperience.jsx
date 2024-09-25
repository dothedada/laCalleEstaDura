import { dateLabel, formatDate } from './previewMethods';
import { uiText } from './txtAndValidations';

const ExperiencePreview = ({ data, lang }) => {
    const title = data[`title${lang}`] || uiText.global.nonTranslated;
    const description =
        data[`description${lang}`] || uiText.global.nonTranslated;
    return (
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
            <div className="title">{title}</div>
            <p>{description}</p>
        </div>
    );
};

export default ExperiencePreview;

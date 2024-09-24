import { dateLabel, formatDate } from './previewMethods';
import { uiText } from './txtAndValidations';

const EducationPreview = ({ data, lang }) => {
    const title = data[`title${lang}`] || uiText.global.nonTranslated;
    return (
        <>
            <h3>{title}</h3>
            <p>
                {data.place} (
                <time dateTime={dateLabel(data.timeStart)}>
                    {formatDate(data.timeStart, lang)}
                </time>
                {' - '}
                <time dateTime={dateLabel(data.timeEnd)}>
                    {formatDate(data.timeEnd, lang)}
                </time>
                )
            </p>
        </>
    );
};

export default EducationPreview;

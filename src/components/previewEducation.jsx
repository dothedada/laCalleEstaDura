import { dateLabel, formatDate } from './previewMethods';
const EducationPreview = ({ data, lang }) => {
    return (
        <>
            <h3>{data[`title${lang}`]}</h3>
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

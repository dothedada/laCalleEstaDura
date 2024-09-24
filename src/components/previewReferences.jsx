import { uiText } from './txtAndValidations';

const ReferencesPreview = ({ data, lang }) => {
    const title = data[`title${lang}`] || uiText.global.nonTranslated;
    return (
        <>
            <h3>{data.name}</h3>
            <div>{title}</div>
            <div>
                <a href={`mailto:${data.email}`}>{data.email}</a>
                {uiText.global.separator.type2}
                {data.phone}
            </div>
        </>
    );
};

export default ReferencesPreview;

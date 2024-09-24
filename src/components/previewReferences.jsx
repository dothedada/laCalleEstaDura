import { uiText } from './txtAndValidations';

const ReferencesPreview = ({ data, lang }) => {
    return (
        <>
            <h3>{data.name}</h3>
            <div>{data[`title${lang}`]}</div>
            <div>
                <a href={`mailto:${data.email}`}>{data.email}</a>
                {uiText.global.separator.type2}
                {data.phone}
            </div>
        </>
    );
};

export default ReferencesPreview;

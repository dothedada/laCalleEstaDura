import { uiText } from './txtAndValidations';

const ReferencesPreview = ({ data, lang }) => {
    const title = data[`title${lang}`] || uiText.global.nonTranslated;
    return (
        <div>
            <h3>
                {data.name} <span className="secondary">{title}</span>
            </h3>
            <div>
                <a href={`mailto:${data.email}`}>{data.email}</a>
                <br />
                {data.phone}
            </div>
        </div>
    );
};

export default ReferencesPreview;

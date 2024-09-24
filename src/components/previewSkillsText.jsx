import { uiText } from './txtAndValidations';

const SkillsTextPreview = ({ data, lang }) => {
    const description =
        data[`description${lang}`] || uiText.global.nonTranslated;
    return <p>{description}</p>;
};

export default SkillsTextPreview;

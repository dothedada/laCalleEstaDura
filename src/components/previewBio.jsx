import { uiText } from './txtAndValidations';

const BioPreview = ({ data, lang }) => {
    const description =
        data[`description${lang}`] || uiText.global.nonTranslated;
    return <p>{description}</p>;
};

export default BioPreview;

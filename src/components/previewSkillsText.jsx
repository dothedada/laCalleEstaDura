const SkillsTextPreview = ({ data, lang }) => {
    return <p>{data[`description${lang}`] || 'No ha sido traducido'}</p>;
};

export default SkillsTextPreview;

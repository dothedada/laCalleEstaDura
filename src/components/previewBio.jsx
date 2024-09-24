const BioPreview = ({ data, lang }) => {
    return <p>{data[`description${lang}`]}</p>;
};

export default BioPreview;

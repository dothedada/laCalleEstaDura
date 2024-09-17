import { Bar } from './formComponents';

const SkillsTextPreview = ({
    data,
    lang,
    inPdf,
    editHandler,
    duplicateHandler,
    inPdfCallback,
}) => {
    return (
        <div className="card" data-id={data.id} data-inpdf={inPdf}>
            <Bar
                data={data}
                inPdf={inPdf}
                editHandler={editHandler}
                duplicateHandler={duplicateHandler}
                inPdfHandler={inPdfCallback}
            />

            {inPdf && (
                <div className="card__preview">
                    <p>{data[`description${lang}`]}</p>
                </div>
            )}
        </div>
    );
};

export default SkillsTextPreview;

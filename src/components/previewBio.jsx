import { Bar } from './formComponents';

const BioPreview = ({
    data,
    lang,
    inPdf,
    inPdfCallback,
    editHandler,
    duplicateHandler,
}) => {
    return (
        <div className="card" id={'cardID'}>
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

export default BioPreview;

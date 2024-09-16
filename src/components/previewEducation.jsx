import { Bar } from './formComponents';

const EducationPreview = ({
    data,
    lang,
    inPdf,
    inPdfCallback,
    editHandler,
    duplicateHandler,
}) => {
    const dateToDisplay = `${data?.timeStart.getFullYear()} - ${data?.timeEnd.getFullYear()}`;

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
                    <h3>{data[`title${lang}`]}</h3>
                    <p>
                        {data.place} ({dateToDisplay})
                    </p>
                </div>
            )}
        </div>
    );
};

export default EducationPreview;

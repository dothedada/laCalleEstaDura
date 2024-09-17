import { Bar } from './formComponents';
import { dateLabel, formatDate } from './previewMethods';
const EducationPreview = ({
    data,
    lang,
    inPdf,
    inPdfCallback,
    editHandler,
    duplicateHandler,
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
                    <h3>{data[`title${lang}`]}</h3>
                    <p>
                        {data.place} (
                        <time dateTime={dateLabel(data.timeStart)}>
                            {formatDate(data.timeStart, lang)}
                        </time>
                        {' - '}
                        <time dateTime={dateLabel(data.timeEnd)}>
                            {formatDate(data.timeEnd, lang)}
                        </time>
                        )
                    </p>
                </div>
            )}
        </div>
    );
};

export default EducationPreview;

import { Bar } from './formComponents';
import { dateLabel, formatDate } from './previewMethods';

const ExperiencePreview = ({
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
                    <div>
                        <h3>
                            {`${data.place} `}
                            <span className="secondary">
                                <time dateTime={dateLabel(data.timeStart)}>
                                    {formatDate(data.timeStart, lang)}
                                </time>
                                {' - '}
                                <time dateTime={dateLabel(data.timeEnd)}>
                                    {formatDate(data.timeEnd, lang)}
                                </time>
                            </span>
                        </h3>
                        <div className="title">{data[`title${lang}`]}</div>
                    </div>
                    <p>{data[`description${lang}`]}</p>
                </div>
            )}
        </div>
    );
};

export default ExperiencePreview;

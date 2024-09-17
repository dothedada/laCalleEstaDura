import { Bar } from './formComponents';
import { uiText } from './txtAndValidations';

const ReferencesPreview = ({
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
                    <h3>{data.name}</h3>
                    <div>{data[`title${lang}`]}</div>
                    <div>
                        <a href={`mailto:${data.email}`}>{data.email}</a>
                        {uiText.global.separator.type2}
                        {data.phone}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReferencesPreview;

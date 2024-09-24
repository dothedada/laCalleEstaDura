import { Bar } from './formComponents';

const CardWrapper = ({
    data,
    children,
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

            {inPdf && <div className="card__preview">{children}</div>}
        </div>
    );
};

export default CardWrapper;

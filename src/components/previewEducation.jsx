import { useState } from 'react';

import { Bar } from './formComponents';

const EducationPreview = ({ data, lang, inPdf, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf);
    const inPdfHandler = () => {
        console.log(inPdfCallback);
        setRenderInPdf(!renderInPdf);
    };

    const dateToDisplay = `${data?.timeStart.getFullYear()} - ${data?.timeEnd.getFullYear()}`;
    // Card states
    const [startingData] = useState(data);

    return (
        <div className="card" id={'cardID'}>
            <Bar
                data={startingData}
                editHandler={() => console.log('edita')}
                duplicateHandler={() => console.log('duplica')}
                inPdf={renderInPdf}
                inPdfHandler={inPdfHandler}
            />

            {renderInPdf && (
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

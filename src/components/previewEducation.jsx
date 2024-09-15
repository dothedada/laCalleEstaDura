import { useState } from 'react';

import { Bar } from './formComponents';

const EducationPreview = ({ data, lang, inPdf, inPdfCallback }) => {
    const [startingData] = useState(data);
    const dateToDisplay = `${data?.timeStart.getFullYear()} - ${data?.timeEnd.getFullYear()}`;

    return (
        <div className="card" id={'cardID'}>
            <Bar
                data={startingData}
                editHandler={() => console.log('edita')}
                duplicateHandler={() => console.log('duplica')}
                inPdf={inPdf}
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

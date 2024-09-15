import { useState } from 'react';

import { Bar } from './formComponents';

const BioPreview = ({ data, lang, inPdf, inPdfCallback }) => {
    const [startingData] = useState(data);

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
                    <p>{data[`description${lang}`]}</p>
                </div>
            )}
        </div>
    );
};

export default BioPreview;

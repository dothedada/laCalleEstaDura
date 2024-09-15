import { useState } from 'react';

import { Bar } from './formComponents';
import { uiText } from './txtAndValidations';

const ReferencesPreview = ({ data, lang, inPdf, inPdfCallback }) => {
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

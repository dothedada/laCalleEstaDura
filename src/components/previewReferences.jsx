import { useState } from 'react';

import { Bar } from './formComponents';
import { uiText } from './txtAndValidations';

const ReferencesPreview = ({ data, lang, inPdf, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf);
    const inPdfHandler = () => {
        console.log(inPdfCallback);
        setRenderInPdf(!renderInPdf);
    };

    // Card states
    const [startingData] = useState(data || undefined);

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

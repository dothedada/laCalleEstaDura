import { useState } from 'react';

import { Bar } from './formComponents';

const ProfilePreview = ({ data, lang, inPdf, inPdfCallback }) => {
    // se va para arriba luego
    const [renderInPdf, setRenderInPdf] = useState(inPdf);
    const inPdfHandler = () => {
        setRenderInPdf(!renderInPdf);
    };

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
                <div className="card__preview twoCol">
                    <div>
                        <h2 className="name">{data.name}</h2>
                        <div className="title">{data[`title${lang}`]}</div>
                    </div>
                    <div>
                        <div>
                            <a href={`mailto:${data.email}`}>{data.email}</a>
                        </div>
                        {data.link1 && (
                            <div>
                                <a href={data.link1} target="_blank">
                                    {data.link1}
                                </a>
                            </div>
                        )}
                        {data.link2 && (
                            <div>
                                <a href={data.link2} target="_blank">
                                    {data.link2}
                                </a>
                            </div>
                        )}
                        <div>{data.phone}</div>
                        <div>{data.location}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePreview;

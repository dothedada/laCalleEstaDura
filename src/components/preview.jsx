import { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';

import { DynamicCard } from './decksGenerator';
import { cardTypesInOrder, uiText } from './txtAndValidations';

const Preview = ({ deck, renderInPdf, lang = 'Esp' }) => {
    const [overflow, setOverflow] = useState(false);
    const page = useRef(null);

    const cardsByType = (type) => {
        return deck[type].map((card) =>
            renderInPdf.has(card.id) ? (
                <DynamicCard
                    data={card}
                    inPdf={true}
                    lang={lang}
                    key={card.id}
                />
            ) : null,
        );
    };

    const pdfHandler = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: 'letter',
        });

        pdf.html(document.querySelector('#toPDF'), {
            width: 8.5,
            windowWidth: 612,
        }).then(() => {
            pdf.save('myCV.pdf');
        });
    };

    useEffect(() => {
        if (page.current) {
            setOverflow(page.current.scrollHeight > page.current.clientHeight);
        }
    }, [page]);

    return (
        <>
            {overflow && (
                <div className="overflow__text">
                    {uiText.global.dialog.previewOverflow}
                </div>
            )}
            <div
                id="toPDF"
                className={`preview${overflow ? ' overflow' : ''}`}
                ref={page}
            >
                {cardTypesInOrder.map((type) => (
                    <div className={`${type}`} key={type}>
                        {!/^profile|^bio/.test(type) && (
                            <h2 className="section">
                                {uiText.global.sections[lang][type]}
                            </h2>
                        )}
                        {cardsByType(type)}
                    </div>
                ))}
            </div>

            <button type="button" onPointerDown={pdfHandler}>
                guardar pdf
            </button>
        </>
    );
};

export { Preview };

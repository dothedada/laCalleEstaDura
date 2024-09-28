import { useEffect, useRef, useState } from 'react';
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
        </>
    );
};

export { Preview };

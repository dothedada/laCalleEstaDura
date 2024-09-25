import { useEffect } from 'react';
import { DynamicCard } from './decksGenerator';
import { cardTypesInOrder, uiText } from './txtAndValidations';

const Preview = ({ deck, renderInPdf = new Set(), lang = 'Esp' }) => {
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

    return (
        <div className="preview">
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
    );
};

export { Preview };

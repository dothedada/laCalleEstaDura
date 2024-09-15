import { useState } from 'react';

import { DynamicCard } from './decksGenerator';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

const cardGroups = [
    'profile',
    'bio',
    'experience',
    'education',
    'skills',
    'references',
];

const DeckManager = ({ cards }) => {
    const [storedCards, setStoredCards] = useState(cards);

    const [renderInPdf, setRenderInPdf] = useState(new Set());

    const inPdfHandler = (id) => () => {
        setRenderInPdf((prvRender) => {
            const newRender = new Set(prvRender);

            if (renderInPdf.has(id)) {
                newRender.delete(id);
            } else {
                newRender.add(id);
            }

            return newRender;
        });
    };

    return (
        <div className="frame decks">
            <div className="cv-selector">
                <select name="cvs" id="cvs_selector">
                    <option>carajo</option>
                </select>

                <div className="cv-actions">
                    <button type="button">Añadir</button>
                    <button type="button">Actualizar</button>
                    <button type="button">Eliminar</button>
                </div>
            </div>

            {cardGroups.map((deckType, index) => (
                <div key={index}>
                    <h2>{uiText.global.sections.Esp[deckType]}</h2>

                    {storedCards?.[deckType]?.map((card) => (
                        <DynamicCard
                            type={card.type}
                            key={card.id}
                            data={card}
                            lang="Esp"
                            inPdf={renderInPdf.has(card.id)}
                            inPdfCallback={inPdfHandler(card.id)}
                        />
                    ))}

                    {deckType !== 'skills' ? (
                        <Button
                            type="button"
                            text={uiText[deckType].reference}
                        />
                    ) : (
                        <>
                            <Button
                                type="button"
                                text={uiText.skillsList.reference}
                            />
                            <Button
                                type="button"
                                text={uiText.skillsText.reference}
                            />
                        </>
                    )}
                </div>
            ))}

            <div className="cv-actions">
                <button type="button">Añadir</button>
                <button type="button">Actualizar</button>
                <button type="button">Eliminar</button>
            </div>
        </div>
    );
};

export { DeckManager };

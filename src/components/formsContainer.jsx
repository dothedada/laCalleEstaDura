import { useState } from 'react';

import { cardGroups, DynamicCard } from './deckManager';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

const DeckManager = ({ cards }) => {
    const [storedCards, setStoredCards] = useState(cards);

    return (
        <>
            <h1>la calle esta dura</h1>
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
                                type={deckType}
                                data={card}
                                key={card.id}
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
        </>
    );
};

export { DeckManager };

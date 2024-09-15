import { useState } from 'react';

import { uiText } from './txtAndValidations';
import ProfilePreview from './profilePreview';
import { Button } from './formComponents';

const cardPreviewMap = {
    profile: ProfilePreview,
    bio: '',
    experience: '',
    education: '',
    skillsText: '',
    skillsList: '',
    references: '',
};

const cardGroups = [
    'profile',
    'bio',
    'experience',
    'education',
    'skills',
    'references',
];

const DynamicCard = ({
    type,
    data,
    lang = 'Esp',
    inPdf = true,
    inPdfCallback,
}) => {
    const CardToRender = cardPreviewMap[type] || null;

    return CardToRender ? (
        <CardToRender
            data={data}
            lang={lang}
            inPdf={inPdf}
            inPdfCallback={inPdfCallback}
        />
    ) : (
        'componente no encontrado'
    );
};

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

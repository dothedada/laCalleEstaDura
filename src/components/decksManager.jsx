import { useRef, useState } from 'react';

import { Dialog } from './formComponents';
import { Globals } from './globals';
import { DeckMenu } from './decksMenu';
import CardsGroup from './decksCardsGroups';

const cardTypes = [
    'profile',
    'bio',
    'experience',
    'skills',
    'education',
    'references',
];

const DeckManager = ({ deck }) => {
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const [lang, setLang] = useState('Esp');

    // al agregar o eliminar tarjeta, modificar storecards para forzar rerender
    const [storedCards, setStoredCards] = useState(deck.cardsGroups);

    const formDialog = useRef(null);
    const [formFields, setFormFields] = useState(null);

    const changeLang = () => {
        setLang((prvLang) => (prvLang === 'Esp' ? 'Eng' : 'Esp'));
    };

    const inPdfHandler = (id) => () => {
        setRenderInPdf((prvRender) => {
            const newRender = new Set(prvRender);

            renderInPdf.has(id) ? newRender.delete(id) : newRender.add(id);

            return newRender;
        });
    };

    return (
        <div className="decks">
            <div className="cv-selector">
                <Globals />

                <DeckMenu
                    data={deck}
                    cardsInPdfCallback={setRenderInPdf}
                    lang={lang}
                    langCallback={changeLang}
                    dialogRef={formDialog}
                    dialogHandler={setFormFields}
                />
            </div>

            {cardTypes.map((cardType) => (
                <CardsGroup
                    cards={storedCards[cardType]}
                    cardsManager={{
                        storedCards: storedCards[cardType],
                        setStoredCards,
                        dialogRef: formDialog,
                        dialogHandler: setFormFields,
                    }}
                    deckType={cardType}
                    lang={lang}
                    renderInPdf={renderInPdf}
                    inPdfHandler={inPdfHandler}
                    dialogRef={formDialog}
                    dialogHandler={setFormFields}
                    key={cardType}
                />
            ))}

            <Dialog ref={formDialog} dialogSetter={setFormFields}>
                {formFields}
            </Dialog>
        </div>
    );
};

export { DeckManager };

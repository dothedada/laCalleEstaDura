import { useRef, useState } from 'react';

import { DynamicForm } from './decksGenerator';
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

    const openCardForm = (type, data, id) => () => {
        formDialog.current.open();
        setFormFields(
            <DynamicForm
                type={type}
                data={data}
                inPdfCallback={inPdfHandler(id)}
            />,
        );
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
                />
            </div>

            {cardTypes.map((cardType) => (
                <CardsGroup
                    cards={storedCards[cardType]}
                    deckType={cardType}
                    lang={lang}
                    renderInPdf={renderInPdf}
                    inPdfHandler={inPdfHandler}
                    dialogHandler={openCardForm}
                    key={cardType}
                />
            ))}

            <Dialog ref={formDialog}>{formFields}</Dialog>
        </div>
    );
};

export { DeckManager };

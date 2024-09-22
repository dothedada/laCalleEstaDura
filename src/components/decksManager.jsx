import { useRef, useState } from 'react';

import { DynamicCard, DynamicForm } from './decksGenerator';
import { uiText } from './txtAndValidations';
import { Button, Dialog } from './formComponents';
import { Globals } from './globals';
import { DeckMenu } from './decksMenu';

const cardGroups = [
    'profile',
    'bio',
    'experience',
    'skills',
    'education',
    'references',
];

// TODO: separar elemento de construcción de subdecks

const DeckManager = ({ deck }) => {
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const [lang, setLang] = useState('Esp');

    // al agregar o eliminar tarjeta, modificar storecards para forzar rerender
    const [storedCards, setStoredCards] = useState(deck.cardsGroups);
    console.log(storedCards);

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

            {cardGroups.map((deckType) => (
                <div key={deckType}>
                    <h2>{uiText.global.sections[lang][deckType]}</h2>

                    {storedCards?.[deckType]?.map((card) => (
                        <DynamicCard
                            data={card}
                            lang={lang}
                            editHandler={() => console.log('editar', card.id)}
                            duplicateHandler={() =>
                                console.log('duplicar', card.id)
                            }
                            inPdf={renderInPdf.has(card.id)}
                            inPdfCallback={inPdfHandler(card.id)}
                            key={card.id}
                        />
                    ))}

                    {deckType !== 'skills' ? (
                        <Button
                            type="button"
                            text={uiText[deckType].reference}
                            callback={openCardForm(deckType)}
                        />
                    ) : (
                        <>
                            <Button
                                type="button"
                                text={uiText.skillsList.reference}
                                callback={openCardForm('skillsList')}
                            />
                            <Button
                                type="button"
                                text={uiText.skillsText.reference}
                                callback={openCardForm('skillsText')}
                            />
                        </>
                    )}
                </div>
            ))}

            <Dialog ref={formDialog}>{formFields}</Dialog>
        </div>
    );
};

export { DeckManager };

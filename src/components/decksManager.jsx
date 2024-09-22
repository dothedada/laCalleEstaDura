import { useRef, useState } from 'react';

import { DynamicCard, DynamicForm } from './decksGenerator';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';
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

const DeckManager = ({ deck }) => {
    // al agregar o eliminar tarjeta, modificar storecards para forzar rerender
    const [storedCards, setStoredCards] = useState(deck.cardsGroups);

    //evaluar si el render puede integrarse a los sets
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const [lang, setLang] = useState('Esp');
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

    const closeForm = () => {
        formDialog.current.close();
        setFormFields(null);
    };

    const openForm = (type, data, id) => () => {
        formDialog.current.showModal();
        setFormFields(
            <>
                <Button callback={closeForm} type="warn" text="cerrar" />
                <DynamicForm
                    type={type}
                    data={data}
                    inPdfCallback={inPdfHandler(id)}
                />
            </>,
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

            {cardGroups.map((deckType, index) => (
                <div key={index}>
                    <div>
                        <h2>{uiText.global.sections[lang][deckType]}</h2>

                        {storedCards?.[deckType]?.map((card) => (
                            <DynamicCard
                                data={card}
                                lang={lang}
                                editHandler={() =>
                                    console.log('editar', card.id)
                                }
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
                                callback={openForm(deckType)}
                            />
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    text={uiText.skillsList.reference}
                                    callback={openForm('skillsList')}
                                />
                                <Button
                                    type="button"
                                    text={uiText.skillsText.reference}
                                    callback={openForm('skillsText')}
                                />
                            </>
                        )}
                    </div>
                </div>
            ))}

            <dialog ref={formDialog}>{formFields}</dialog>
        </div>
    );
};

export { DeckManager };

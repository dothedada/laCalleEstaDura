import { useEffect, useRef, useState } from 'react';

import { DynamicCard, DynamicForm, DynamicSetForm } from './decksGenerator';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';
import { DecksGlobals } from './decksGlobals';
import { DeckPicker } from './decksPicker';

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
    const [storedCards, setStoredCards] = useState(deck.subDecks);
    const [decks, setDecks] = useState(deck.sets);
    const [currentDeck, setCurrentDeck] = useState('0');

    //evaluar si el render puede integrarse a los sets
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const [lang, setLang] = useState('Esp');
    const formDialog = useRef(null);
    const optionSets = useRef(null);
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

    const saveSet = (name) => () => {
        // deck, ref, sets, setSets
        const newSet = deck.createNewSet(name, lang);
        setDecks((prvSet) => [...prvSet, newSet]);
        setCurrentDeck(newSet.id);
        formDialog.current.close();
    };

    const updateSet = () => {
        // deck, ref, setSets
        const updatedSet = deck.updateSet(optionSets.current.value, lang);
        setDecks((prvSets) =>
            prvSets.map((set) => (set.id === updatedSet.id ? updatedSet : set)),
        );
        optionSets.current.value = updatedSet.id;
    };

    const removeSet = (id) => {
        // deck, ref, sets, setSets
        const setId = optionSets.current.value;
        if (!decks.length) return;

        deck.removeSet(setId);
        setDecks((prvSet) =>
            prvSet.reduce((sets, set) => {
                if (set.id === setId) return sets;
                sets.push(set);
                return sets;
            }, []),
        );
        setCurrentDeck(0);
    };

    const closeForm = () => {
        formDialog.current.close();
        setFormFields(null);
    };

    const openSetForm = (type, id) => () => {
        formDialog.current.showModal();
        setFormFields(
            <>
                <Button callback={closeForm} type="warn" text="cerrar" />
                <DynamicSetForm
                    type={type}
                    removeCallback={removeSet(id)}
                    cancelCallback={closeForm}
                    saveCallback={saveSet}
                />
            </>,
        );
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
                <DecksGlobals />

                <DeckPicker
                    decks={decks}
                    cardsInPdfCallback={setRenderInPdf}
                    lang={lang}
                    currentDeck={currentDeck}
                    langCallback={changeLang}
                />

                <div className="cv-actions">
                    <Button
                        type="warn"
                        text={uiText.global.deck.button.deleteModel}
                        reader={uiText.global.deck.reader.deleteModel}
                        callback={removeSet}
                    />
                    <Button
                        type="reset"
                        text={uiText.global.deck.button.createModel}
                        reader={uiText.global.deck.reader.createModel}
                        callback={openSetForm('addForm')}
                    />
                    <Button
                        type="reset"
                        text={uiText.global.deck.button.updateModel}
                        reader={uiText.global.deck.reader.updateModel}
                        callback={updateSet}
                    />
                </div>
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

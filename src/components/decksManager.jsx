import { useEffect, useRef, useState } from 'react';

import { DynamicCard, DynamicForm } from './decksGenerator';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

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
    const [sets, setSets] = useState(deck.sets);

    //evaluar si el render puede integrarse a los sets
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const [lang, setLang] = useState('Esp');
    const formDialog = useRef(null);
    const optionSets = useRef(null);
    const [formFields, setFormFields] = useState(null);

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

    useEffect(() => {
        if (!sets.length) return;
        optionSets.current.value = sets[sets.length - 1].id;
    }, [sets]);

    const addSet = (name) => () => {
        const newSet = deck.createNewSet(name, lang);
        setSets((prvSet) => [...prvSet, newSet]);
    };

    const selectSet = () => {
        const activeSet =
            optionSets.current.value !== '---'
                ? optionSets.current.value
                : undefined;
        if (!activeSet) return;

        const currentSet = sets.find((set) => set.id === activeSet);
        setRenderInPdf(new Set(currentSet.cardsIds));
        setLang(currentSet.lang);
    };

    const updateSet = () => {
        const currentSets = [...sets];
        const updatedSet = deck.updateSet(optionSets.current.value, lang);
        const indexOfSet = currentSets.findIndex((e) => e.id === updatedSet.id);
        currentSets[indexOfSet] = updatedSet;
        setSets(currentSets);
    };

    const removeSet = (id) => {
        deck.removeSet(id)
    };

    const changeLang = () => {
        setLang((prvLang) => (prvLang === 'Esp' ? 'Eng' : 'Esp'));
    };

    const addToPdf = (id) => () => {
        setRenderInPdf((prvRender) => {
            const newRender = new Set(prvRender);
            newRender.add(id);
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
                    inPdfCallback={addToPdf(id)}
                />
            </>,
        );
    };

    return (
        <div className="decks">
            <div className="cv-selector">
                <div className="cv-globals">
                    <Button
                        type="reset"
                        text={uiText.global.deck.button.exportData}
                        reader={uiText.global.deck.reader.exportData}
                    />
                    <Button
                        type="reset"
                        text={uiText.global.deck.button.importData}
                        reader={uiText.global.deck.reader.importData}
                    />
                </div>

                <div className="cv-picker">
                    <label>
                        <span className="sr-only">
                            {uiText.global.deck.reader.cvSelector}
                        </span>
                        <select
                            name="cvs"
                            id="cvs_selector"
                            onChange={selectSet}
                            ref={optionSets}
                        >
                            <option value="0">---</option>
                            {sets.map((set) => {
                                return (
                                    <option value={set.id} key={set.id}>
                                        {set.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>

                    <Button
                        type="reset"
                        text={
                            lang === 'Esp'
                                ? uiText.global.deck.button.language.toEnglish
                                : uiText.global.deck.button.language.toSpanish
                        }
                        callback={changeLang}
                        reader={
                            lang === 'Esp'
                                ? uiText.global.deck.reader.language.toEnglish
                                : uiText.global.deck.reader.language.toSpanish
                        }
                    />
                    <Button
                        type="reset"
                        text={uiText.global.deck.button.viewCV}
                        reader={uiText.global.deck.reader.viewCV}
                    />
                    <Button
                        type="button"
                        text={uiText.global.deck.button.downloadCV}
                        reader={uiText.global.deck.reader.downloadCV}
                    />
                </div>

                <div className="cv-actions">
                    <Button
                        type="warn"
                        text={uiText.global.deck.button.deleteModel}
                        reader={uiText.global.deck.reader.deleteModel}
                    />
                    <Button
                        type="reset"
                        text={uiText.global.deck.button.createModel}
                        reader={uiText.global.deck.reader.createModel}
                        callback={addSet(
                            `c_${Math.round(Math.random() * 1000)}`,
                        )}
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

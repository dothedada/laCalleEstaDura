import { useRef, useEffect, useState } from 'react';

import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

const DeckMenu = ({ data, cardsInPdfCallback, lang, langCallback }) => {
    const [decks, setDecks] = useState(data.decks);
    const [currentDeck, setCurrentDeck] = useState('');
    const optionSets = useRef(null);
    const dialogRef = useRef(null);
    const [dialogInfo, setDialogInfo] = useState(null);

    useEffect(() => {
        optionSets.current.value = currentDeck;
    }, [currentDeck]);

    const selectSet = () => {
        const activeSet = optionSets.current.value;
        if (!activeSet) return;

        const currentSet = decks.find((set) => set.id === activeSet);
        cardsInPdfCallback(new Set(currentSet.cardsIds));
    };

    const createDeck = (name) => () => {
        const newSet = data.createNewDeck(name, lang);
        setDecks((prvSet) => [...prvSet, newSet]);
        setCurrentDeck(newSet.id);
    };

    const updateDeck = () => {
        dialogRef.current.showModal();
        const deckId = optionSets.current.value;
        if (!decks.length || !deckId) return;

        const updatedDeck = data.updateDeck(optionSets.current.value, lang);
        setDecks((prvDecks) =>
            prvDecks.map((deck) =>
                deck.id === updatedDeck.id ? updatedDeck : deck,
            ),
        );
    };

    const removeDeck = () => {
        dialogRef.current.close();
        const deckId = optionSets.current.value;
        if (!decks.length || !deckId) return;

        data.removeDeck(deckId);
        setDecks((prvDeck) =>
            prvDeck.reduce((decks, currentDeck) => {
                if (currentDeck.id === deckId) return decks;
                decks.push(currentDeck);
                return decks;
            }, []),
        );
        setCurrentDeck('');
    };

    return (
        <>
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
                        <option value="">---</option>
                        {decks.map((set) => {
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
                    callback={langCallback}
                    reader={
                        lang === 'Esp'
                            ? uiText.global.deck.reader.language.toEnglish
                            : uiText.global.deck.reader.language.toSpanish
                    }
                />
            </div>

            <div className="cv-actions">
                <Button
                    type="warn"
                    text={uiText.global.deck.button.deleteModel}
                    reader={uiText.global.deck.reader.deleteModel}
                    callback={removeDeck}
                />
                <Button
                    type="reset"
                    text={uiText.global.deck.button.createModel}
                    reader={uiText.global.deck.reader.createModel}
                    callback={createDeck(
                        `pato ${Math.round(Math.random() * 1000)}`,
                    )}
                />
                <Button
                    type="reset"
                    text={uiText.global.deck.button.updateModel}
                    reader={uiText.global.deck.reader.updateModel}
                    callback={updateDeck}
                />
                <dialog ref={dialogRef}>carajo</dialog>
            </div>
        </>
    );
};

export { DeckMenu };

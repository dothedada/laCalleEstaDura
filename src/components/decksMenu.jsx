import { useRef, useEffect, useState } from 'react';

import { uiText } from './txtAndValidations';
import { Button } from './formComponents';
import NewDeckForm from './formNewDeck';
import RemoveDeckForm from './formRemoveDeck';

const DeckMenu = ({
    data,
    cardsInPdfCallback,
    lang,
    langCallback,
    dialogRef,
    dialogHandler,
}) => {
    const [decks, setDecks] = useState(data.decks);
    const [currentDeck, setCurrentDeck] = useState('');
    const optionSets = useRef(null);

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
        dialogRef.current.close();
        dialogHandler();
    };

    const newDeck = () => {
        dialogRef.current.open();
        dialogHandler(
            <NewDeckForm
                saveCallback={createDeck}
                cancelCallback={dialogRef.current.close}
            />,
        );
    };

    const updateDeck = () => {
        const deckId = optionSets.current.value;
        if (!decks.length || !deckId) return;

        const updatedDeck = data.updateDeck(optionSets.current.value, lang);
        setDecks((prvDecks) =>
            prvDecks.map((deck) =>
                deck.id === updatedDeck.id ? updatedDeck : deck,
            ),
        );
    };

    const deleteDeck = () => {
        const deckId = optionSets.current.value;
        data.removeDeck(deckId);
        setDecks((prvDeck) =>
            prvDeck.reduce((decks, currentDeck) => {
                if (currentDeck.id === deckId) return decks;
                decks.push(currentDeck);
                return decks;
            }, []),
        );
        setCurrentDeck('');
        dialogHandler();
        dialogRef.current.close();
    };

    const removeDeck = () => {
        const deckId = optionSets.current.value;
        if (!decks.length || !deckId) return;

        const deckName = Array.from(optionSets.current.options).find(
            (deck) => deck.value === deckId,
        ).text;

        dialogRef.current.open();
        dialogHandler(
            <RemoveDeckForm
                cvName={deckName}
                cancelCallback={dialogRef.current.close}
                saveCallback={deleteDeck}
            />,
        );
    };

    return (
        <>
            <div className="cv-picker">
                <label>
                    <span className="sr-only">
                        {uiText.global.deck.cvSelector.reader}
                    </span>
                    <select
                        name="cvs"
                        id="cvs_selector"
                        onChange={selectSet}
                        ref={optionSets}
                    >
                        <option value="">
                            {uiText.global.deck.cvSelector.text}
                        </option>
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
                            ? uiText.global.deck.language.toEnglish.text
                            : uiText.global.deck.language.toSpanish.text
                    }
                    callback={langCallback}
                    reader={
                        lang === 'Esp'
                            ? uiText.global.deck.language.toEnglish.reader
                            : uiText.global.deck.language.toSpanish.reader
                    }
                />
            </div>

            <div className="cv-actions">
                {optionSets.current.value !== '' && (
                    <Button
                        type="warn"
                        text={uiText.global.deck.deleteModel.text}
                        reader={uiText.global.deck.deleteModel.reader}
                        callback={removeDeck}
                    />
                )}
                <Button
                    type="reset"
                    text={uiText.global.deck.createModel.text}
                    reader={uiText.global.deck.createModel.reader}
                    callback={newDeck}
                />
                <Button
                    type="reset"
                    text={uiText.global.deck.updateModel.text}
                    reader={uiText.global.deck.updateModel.reader}
                    callback={updateDeck}
                />
            </div>
        </>
    );
};

export { DeckMenu };

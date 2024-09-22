import { useRef, useEffect, useState } from 'react';

import { uiText } from './txtAndValidations';
import { Button, Dialog } from './formComponents';
import NewDeckForm from './formNewDeck';

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
        dialogRef.current.close();
        setDialogInfo();
    };

    const newDeck = () => {
        dialogRef.current.open();
        setDialogInfo(
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
                <Button
                    type="warn"
                    text={uiText.global.deck.deleteModel.text}
                    reader={uiText.global.deck.deleteModel.reader}
                    callback={removeDeck}
                />
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
                <Dialog ref={dialogRef}>{dialogInfo}</Dialog>
            </div>
        </>
    );
};

export { DeckMenu };

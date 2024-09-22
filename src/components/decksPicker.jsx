import { useRef, useEffect } from 'react';

import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

const DeckPicker = ({
    decks,
    cardsInPdfCallback,
    lang,
    langCallback,
    currentDeck,
}) => {
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

    return (
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
                    <option value={0}>---</option>
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
    );
};

export { DeckPicker };

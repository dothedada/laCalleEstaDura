import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

const DeckPicker = () => {
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
    );
};

export { DeckPicker };

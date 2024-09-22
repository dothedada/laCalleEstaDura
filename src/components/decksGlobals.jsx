import { Button } from './formComponents';
import { uiText } from './txtAndValidations';

const DecksGlobals = ({ exportCallback, importCallback }) => {
    return (
        <div className="cv-globals">
            <Button
                type="reset"
                text={uiText.global.deck.button.exportData}
                reader={uiText.global.deck.reader.exportData}
                callback={exportCallback}
            />
            <Button
                type="reset"
                text={uiText.global.deck.button.importData}
                reader={uiText.global.deck.reader.importData}
                callback={importCallback}
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

export { DecksGlobals };

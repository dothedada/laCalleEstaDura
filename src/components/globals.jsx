import { Button } from './formComponents';
import { uiText } from './txtAndValidations';

const Globals = ({
    exportCallback,
    importCallback,
    viewCallback,
    downloadCallback,
}) => {
    return (
        <div className="cv-globals">
            {Object.keys(localStorage).length > 0 && (
                <Button
                    type="reset"
                    text={uiText.global.deck.exportData.text}
                    reader={uiText.global.deck.exportData.reader}
                    callback={exportCallback}
                />
            )}

            <Button
                type="reset"
                text={uiText.global.deck.importData.text}
                reader={uiText.global.deck.importData.reader}
                callback={importCallback}
            />

            {viewCallback && (
                <Button
                    type="reset"
                    text={uiText.global.deck.viewCV.text}
                    reader={uiText.global.deck.viewCV.reader}
                    callback={viewCallback}
                />
            )}
            {downloadCallback && (
                <Button
                    type="button"
                    text={uiText.global.deck.downloadCV.text}
                    reader={uiText.global.deck.downloadCV.reader}
                    callback={downloadCallback}
                />
            )}
        </div>
    );
};

export { Globals };

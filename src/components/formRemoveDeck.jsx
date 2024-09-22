import { Button } from './formComponents';
import { uiText } from './txtAndValidations';

const RemoveDeckForm = ({ cvName, saveCallback, cancelCallback }) => {
    return (
        <div className="card__form" id={'cardID'}>
            <p>{uiText.global.dialog.removeDeckForm.text(cvName)}</p>
            <Button
                text={uiText.global.dialog.removeDeckForm.cancelBtn.text}
                reader={uiText.global.dialog.removeDeckForm.cancelBtn.reader}
                type="warn"
                callback={cancelCallback}
            />

            <Button
                text={uiText.global.dialog.removeDeckForm.saveBtn.text}
                reader={uiText.global.dialog.removeDeckForm.saveBtn.reader}
                type="button"
                callback={saveCallback}
            />
        </div>
    );
};

export default RemoveDeckForm;

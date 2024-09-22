import { useState } from 'react';
import { Input, Button } from './formComponents';
import { uiText } from './txtAndValidations';

const NewDeckForm = ({ saveCallback, cancelCallback }) => {
    const [deckName, setDeckName] = useState();
    const handleChange = (event) => {
        setDeckName(event);
    };

    return (
        <div className="card__form" id={'cardID'}>
            <Input
                label={uiText.global.dialog.decksForm.label}
                placeholder={uiText.global.dialog.decksForm.placeholder}
                dataField={deckName}
                callback={handleChange}
            />

            <Button
                text={uiText.global.dialog.decksForm.cancelBtn.text}
                reader={uiText.global.dialog.decksForm.cancelBtn.reader}
                type="warn"
                callback={cancelCallback}
            />

            <Button
                text={uiText.global.dialog.decksForm.saveBtn.text}
                reader={uiText.global.dialog.decksForm.saveBtn.reader}
                type="button"
                callback={saveCallback(deckName)}
            />
        </div>
    );
};

export default NewDeckForm;

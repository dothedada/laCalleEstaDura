import { useState } from 'react';
import { Input, Button } from './formComponents';

const NewSetForm = ({ saveCallback, cancelCallback, removeCallback }) => {
    const [deckName, setDeckName] = useState();
    const handleChange = (event) => {
        setDeckName(event);
    };

    return (
        <div className="card__form" id={'cardID'}>
            <Input
                dataField={deckName}
                label="Qué nombre le quieres dar a la nueva configuración"
                placeholder="Hoja de vida para Diseño"
                callback={handleChange}
            />

            <Button
                text="Cancelar"
                type="warn"
                callback={cancelCallback}
                reader="Cerrar ventana sin crear un nuevo set"
            />
            {removeCallback && (
                <Button
                    text="Eliminar set"
                    type="reset"
                    callback={saveCallback}
                    reader="Crear un nuevo set y cerrar ventana"
                />
            )}
            <Button
                text="Guardar"
                type="button"
                callback={saveCallback(deckName)}
                reader="Crear un nuevo set y cerrar ventana"
            />
        </div>
    );
};

export default NewSetForm;

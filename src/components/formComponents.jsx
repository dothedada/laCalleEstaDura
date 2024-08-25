import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { inputUiText, iconsPaths } from './formValidations';

const IconWrapper = ({ icon, open }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path
            fill="currentColor"
            d={open ? iconsPaths[icon].open : iconsPaths[icon].close}
        ></path>
    </svg>
);

const makeValidations = (validations, field) => {
    if (!validations.length) return [];

    const errorList = validations.reduce((errors, validation) => {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(field.value)) errors.push(validation.message);

        return errors;
    }, []);
    field.setCustomValidity(errorList[0] || '');

    return errorList;
};

const TextInput = forwardRef(function TextInput(
    {
        oneLine = true,
        label,
        placeholder = '',
        dataField = '',
        callback,
        validations = [],
        sugestTranslation = false,
        height = '1',
    },
    ref,
) {
    const [errors, setErrors] = useState([]);
    const field = useRef();

    useImperativeHandle(ref, () => ({
        validate: () => {
            setErrors(makeValidations(validations, field.current));
            if (errors.length) return field.current;
        },
    }));

    const handleChange = () => {
        callback(field.current.value);
        if (errors.length) {
            setErrors(makeValidations(validations, field.current));
        }
    };

    const handleOnBlur = () => {
        setErrors(makeValidations(validations, field.current));
    };

    const maxLength = validations
        .find((val) => /caracteres/.test(val.message))
        ?.message.match(/\d+/);
    const currentLength = dataField.replace(/\s+/g, ' ').length;

    const props = {
        ref: field,
        placeholder: placeholder,
        value: dataField,
        onChange: handleChange,
        onBlur: handleOnBlur,
        className: sugestTranslation ? 'warn-background' : '',
        ...(oneLine ? { type: 'text' } : { rows: height }),
    };

    return (
        <label>
            {label}
            {maxLength && `, quedan ${maxLength - currentLength} caracteres.`}
            {errors.map((error, index) => (
                <div className="error" key={index}>
                    {error}
                </div>
            ))}
            {oneLine ? <input {...props} /> : <textarea {...props}></textarea>}
        </label>
    );
});

const handleKeyDown = (callback) => (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;

    event.preventDefault();
    callback();
};

const EditCard = ({ edit, callback }) => (
    <button
        type="button"
        onPointerDown={callback}
        onKeyDown={handleKeyDown(callback)}
    >
        <span className="sr-only">
            {edit
                ? 'Haz clic para abrir el cuadro de edición'
                : 'Haz clic para guardar los cambios y cerrar'}
        </span>
        <IconWrapper icon={'edit'} open={edit} />
    </button>
);

const RenderCard = ({ renderInPdf, callback }) => (
    <label tabIndex="0" onKeyDown={handleKeyDown(callback)}>
        <span className="sr-only">
            Este elemento {renderInPdf ? 'se' : 'no se'} encuentra en la hoja de
            vida actual, haz clic para cambiar el estado.
        </span>
        <IconWrapper icon={'renderInPdf'} open={renderInPdf} />
        <input
            type="checkbox"
            className="hidden"
            onChange={callback}
            checked={renderInPdf}
        />
    </label>
);

const Button = ({ text, type, callback }) => (
    <button
        type={type === 'warn' ? 'button' : type}
        onPointerDown={callback}
        onKeyDown={handleKeyDown(callback)}
        className={`button__${type}`}
    >
        {text}
    </button>
);

const FormButtons = ({
    previousData,
    deleteCallback,
    resetCallback,
    saveCallback,
}) => {
    return (
        <div className="card__buttons">
            <Button
                text={inputUiText.global.buttons.delete}
                type="warn"
                callback={deleteCallback}
            />

            <Button
                text={inputUiText.global.buttons.reset(previousData)}
                type="reset"
                callback={resetCallback}
            />

            <Button
                text={inputUiText.global.buttons.save(previousData)}
                type="button"
                callback={saveCallback}
            />
        </div>
    );
};

const DataContainer = ({ name, children, preview, render }) => {
    const [open, setOpen] = useState(false);
    const [renderInPdf, setRenderInPdf] = useState(false);

    const handleEdit = () => {
        setOpen(!open);
    };

    const handleRender = () => {
        setRenderInPdf(!renderInPdf);
    };

    return (
        <div className="card__config">
            <div className="card__title">
                <h2>{name}</h2>
                <EditCard edit={open} callback={handleEdit} />
                {render && (
                    <RenderCard
                        renderInPdf={renderInPdf}
                        callback={handleRender}
                    />
                )}
            </div>
            {open ? (
                <form>{children}</form>
            ) : (
                renderInPdf && <div className="preview">{preview}</div>
            )}
        </div>
    );
};

export { TextInput, RenderCard, Button, FormButtons, DataContainer };

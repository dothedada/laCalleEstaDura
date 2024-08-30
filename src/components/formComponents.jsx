import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { uiText, iconsPaths } from './txtAndValidations';

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
            d={open !== undefined ? iconsPaths[icon][open] : iconsPaths[icon]}
        ></path>
    </svg>
);

const handleKeyDown = (callback) => (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;

    event.preventDefault();
    callback();
};

const EditButon = ({ isOpen, editHandler }) => (
    <button
        type="button"
        onPointerDown={editHandler}
        onKeyDown={handleKeyDown(editHandler)}
    >
        <span className="sr-only">
            {isOpen
                ? uiText.global.reader.editCard.open
                : uiText.global.reader.editCard.closed}
        </span>
        <IconWrapper icon={'edit'} open={isOpen} />
    </button>
);

const InPdfCheckbox = ({ isInPdf, inPdfHandler }) => (
    <label tabIndex="0" onKeyDown={handleKeyDown(inPdfHandler)}>
        <span className="sr-only">
            {isInPdf
                ? uiText.global.reader.renderInPdf.open
                : uiText.global.reader.renderInPdf.closed}
        </span>
        <IconWrapper icon={'renderInPdf'} open={isInPdf} />
        <input
            type="checkbox"
            className="hidden"
            onChange={inPdfHandler}
            checked={isInPdf}
        />
    </label>
);

const validateInput = (validations, field) => {
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
            const validationResult = validateInput(validations, field.current);
            setErrors(validationResult);
            if (validationResult.length) return field.current;
        },
    }));

    const handleChange = () => {
        callback(field.current.value);
        if (errors.length) {
            setErrors(validateInput(validations, field.current));
        }
    };

    const handleOnBlur = () => {
        setErrors(validateInput(validations, field.current));
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
            {maxLength &&
                uiText.global.inputs.lengthStatus(maxLength, currentLength)}
            {errors.map((error, index) => (
                <div className="error" key={index}>
                    {error}
                </div>
            ))}
            {oneLine ? <input {...props} /> : <textarea {...props}></textarea>}
        </label>
    );
});

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
                text={uiText.global.buttons.delete}
                type="warn"
                callback={deleteCallback}
            />

            <Button
                text={uiText.global.buttons.reset(previousData)}
                type="reset"
                callback={resetCallback}
            />

            <Button
                text={uiText.global.buttons.save(previousData)}
                type="button"
                callback={saveCallback}
            />
        </div>
    );
};

const CardBar = ({ data, open, editHandler, inPdf, inPdfHandler }) => {
    const translated = data
        ? Object.keys(data)
              .filter((key) => /Translated$/.test(key))
              .every((key) => data[key] === true)
        : true;

    return (
        <div
            className={`card__title${!translated ? ' card__title--sugest' : ''}`}
        >
            <h2>{data?.reference ?? uiText.experience.reference}</h2>
            <EditButon isOpen={open} editHandler={editHandler} />
            {data && (
                <InPdfCheckbox isInPdf={inPdf} inPdfHandler={inPdfHandler} />
            )}
        </div>
    );
};

const DataContainer = ({ open, children, preview }) => {
    return (
        <div>
            {open ? (
                <form>{children}</form>
            ) : (
                <div className="preview">{preview}</div>
            )}
        </div>
    );
};

export { TextInput, Button, FormButtons, CardBar, DataContainer };

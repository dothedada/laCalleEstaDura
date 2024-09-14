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

const BarButton = ({ action, actionHandler }) => (
    <button
        type="button"
        onPointerDown={actionHandler}
        onKeyDown={handleKeyDown(actionHandler)}
    >
        <span className="sr-only">{uiText.global.reader[`${action}Card`]}</span>
        <IconWrapper icon={action} />
    </button>
);

const RemoveButton = ({ removeHandler }) => (
    <button
        type="button"
        onPointerDown={removeHandler}
        onKeyDown={handleKeyDown(removeHandler)}
    >
        <span className="sr-only">{uiText.global.reader.remove}</span>
        <IconWrapper icon={'remove'} />
    </button>
);

const InRenderCheckbox = ({ inRender, inRenderHandler }) => {
    return (
        <label tabIndex="0" onKeyDown={handleKeyDown(inRenderHandler)}>
            <span className="sr-only">
                {inRender
                    ? uiText.global.reader.renderInPdf.open
                    : uiText.global.reader.renderInPdf.closed}
            </span>
            <IconWrapper icon={'renderInPdf'} open={inRender} />
            <input
                type="checkbox"
                className="hidden"
                onChange={inRenderHandler}
                checked={inRender}
            />
        </label>
    );
};

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

const Input = forwardRef(function TextInput(
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

const ListItem = ({
    data,
    placeholder,
    updateListCallback,
    removeItemCallback,
}) => {
    const { value, visible } = data;

    const valueChange = (event) => {
        updateListCallback({
            ...data,
            value: event.target.value,
        });
    };
    const visibleChange = (event) => {
        updateListCallback({
            ...data,
            visible: event.target.checked,
        });
    };

    return (
        <li>
            <IconWrapper icon={'dragNDrop'} />
            <input
                type="text"
                placeholder={placeholder}
                value={value ?? ''}
                onChange={valueChange}
            />
            <div>
                <InRenderCheckbox
                    inRender={visible}
                    inRenderHandler={visibleChange}
                />
                <RemoveButton removeHandler={removeItemCallback} />
            </div>
        </li>
    );
};

const Fieldset = ({ legend, validation, children }) => {
    return (
        <fieldset className={validation?.validate === false ? 'error' : ''}>
            <legend>
                {legend} {validation?.message}
            </legend>
            {children}
        </fieldset>
    );
};

const Button = ({ text, type, callback }) => {
    return (
        <button
            type={type === 'warn' ? 'button' : type}
            onPointerDown={callback}
            onKeyDown={handleKeyDown(callback)}
            className={type}
        >
            {text}
        </button>
    );
};

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

const Bar = ({ data, editHandler, duplicateHandler, inPdf, inPdfHandler }) => {
    const translated = data
        ? Object.keys(data)
              .filter((key) => /Translated$/.test(key))
              .every((key) => data[key] === true)
        : true;

    return (
        <div className={`card__title${!translated ? ' need-translation' : ''}`}>
            <h2>{data.reference}</h2>
            <BarButton action={'edit'} actionHandler={editHandler} />
            <BarButton action={'duplicate'} actionHandler={duplicateHandler} />
            <InRenderCheckbox inRender={inPdf} inRenderHandler={inPdfHandler} />
        </div>
    );
};

export { Input, Fieldset, Button, FormButtons, Bar, ListItem };

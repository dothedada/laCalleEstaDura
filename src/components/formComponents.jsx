import { useState } from 'react';

const IconEdit = ({ open }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path
            fill="currentColor"
            d={
                open
                    ? 'M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88'
                    : 'm227.32 73.37l-44.69-44.68a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.32l112-112a16 16 0 0 0 0-22.63M92.69 208H48v-44.69l88-88L180.69 120ZM192 108.69L147.32 64l24-24L216 84.69Z'
            }
        ></path>
    </svg>
);

const IconEye = ({ open }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path
            fill="currentColor"
            d={
                open
                    ? 'M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32'
                    : 'M234.42 162a12 12 0 1 1-20.84 12l-16.86-29.5a127.2 127.2 0 0 1-30.17 13.86l5.29 31.64a12 12 0 0 1-9.87 13.8a11 11 0 0 1-2 .17a12 12 0 0 1-11.82-10l-5.15-30.8a136.5 136.5 0 0 1-30.06 0l-5.1 30.83A12 12 0 0 1 96 204a11 11 0 0 1-2-.17A12 12 0 0 1 84.16 190l5.29-31.72a127.2 127.2 0 0 1-30.17-13.86L42.42 174a12 12 0 1 1-20.84-12L40 129.85a160 160 0 0 1-17.31-18.31a12 12 0 0 1 18.65-15.08C57.38 116.32 85.44 140 128 140s70.62-23.68 86.66-43.54a12 12 0 0 1 18.67 15.08A160 160 0 0 1 216 129.85Z'
            }
        ></path>
    </svg>
);

const validateField = (validations, field) => {
    if (!validations.length) return [];
    const errorList = [];

    validations.forEach((validation) => {
        const regex = new RegExp(validation.pattern);

        if (!regex.test(field.value)) {
            errorList.push(validation.message);
        }
    });

    if (errorList.length) {
        field.setCustomValidity(errorList[0]);
    } else {
        field.setCustomValidity('');
    }

    return errorList;
};

const TextInput = ({
    label,
    placeholder = '',
    dataField = '',
    callback,
    validations = [],
    sugestTranslation = false,
}) => {
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        callback(event.target.value);
    };

    const handleOnBlur = (event) => {
        setErrors(validateField(validations, event.target));
    };

    return (
        <label>
            {label}
            {errors.map((error, indx) => (
                <div className="error" key={indx}>
                    {error}
                </div>
            ))}
            <input
                type="text"
                placeholder={placeholder}
                value={dataField}
                onChange={handleChange}
                onBlur={handleOnBlur}
                className={sugestTranslation ? 'warn-background' : ''}
            />
        </label>
    );
};

const TextArea = ({
    label,
    placeholder,
    dataField,
    height = '5',
    callback,
    validations = [],
    sugestTranslation = false,
}) => {
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        callback(event.target.value);
    };

    const handleOnBlur = (event) => {
        setErrors(validateField(validations, event.target));
    };

    const dataLenght = !dataField ? '0' : dataField.replace(/\s+/g, ' ').length;

    return (
        <label>
            {label} ({`${dataLenght} de 350 caracteres`})
            {errors.map((error, indx) => (
                <div className="error" key={indx}>
                    {error}
                </div>
            ))}
            <textarea
                type="text"
                rows={height}
                placeholder={placeholder}
                value={dataField}
                onChange={handleChange}
                onBlur={handleOnBlur}
                className={sugestTranslation ? 'warn-background' : ''}
            ></textarea>
        </label>
    );
};

const EditCard = ({ edit, callback }) => {
    const handleChange = () => {
        callback();
    };

    const handleKeyDown = (event) => {
        if (event.key !== ' ' && event.key !== 'Enter') return;

        event.preventDefault();
        callback();
    };

    return (
        <button
            type="button"
            onPointerDown={handleChange}
            onKeyDown={handleKeyDown}
        >
            <span className="sr-only">
                {edit
                    ? 'Haz clic para abrir el cuadro de edición'
                    : 'Haz clic para guardar los cambios y cerrar'}
            </span>
            <IconEdit open={edit} />
        </button>
    );
};
const RenderCard = ({ renderInPdf, callback }) => {
    const handleChange = () => {
        callback();
    };

    const handleKeyDown = (event) => {
        if (event.key !== ' ' && event.key !== 'Enter') return;

        event.preventDefault();
        callback();
    };

    return (
        <label tabIndex="0" onKeyDown={handleKeyDown}>
            <span className="sr-only">
                Este elemento {renderInPdf ? 'se' : 'no se'} encuentra en la
                hoja de vida actual, haz clic para cambiar el estado.
            </span>
            <IconEye open={renderInPdf} />
            <input
                type="checkbox"
                className="hidden"
                onChange={handleChange}
                checked={renderInPdf}
            />
        </label>
    );
};

const Button = ({ text, type, callback }) => {
    return (
        <button
            type={type === 'reset' ? 'reset' : 'button'}
            onPointerDown={callback}
            className={`button__${type}`}
        >
            {text}
        </button>
    );
};

const DataContainer = ({ name, children, preview }) => {
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
                <RenderCard renderInPdf={renderInPdf} callback={handleRender} />
            </div>
            {open ? (
                <form>{children}</form>
            ) : (
                renderInPdf && <form>{preview}</form>
            )}
        </div>
    );
};

export { TextInput, TextArea, RenderCard, Button, DataContainer };

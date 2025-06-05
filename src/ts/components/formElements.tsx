import React, { useEffect, useState } from 'react';
import type {
    ButtonType,
    FormProps,
    InputFieldProps,
    SelectProps,
} from './components';
import type { ErrorObject } from '../types';

export function Button(props: ButtonType) {
    const btnClass = props.buttonAction;

    const handleClick = () => {
        if (!props.action) {
            return;
        }
        props.action();
    };

    return (
        <button
            type={props?.type ? props.type : 'button'}
            value={props.buttonAction}
            onClick={handleClick}
            {...props.attributes}
            className={btnClass}
        >
            {props.text}
        </button>
    );
}

export function ButtonsSet({
    buttons,
    containerAttributes,
}: {
    buttons: ButtonType[];
    containerAttributes?: React.HTMLAttributes<HTMLDivElement>;
}) {
    return (
        <div {...containerAttributes}>
            {buttons.map((btn, i) => {
                const { text, ...attributes } = btn;
                return <Button key={i} {...attributes} text={text} />;
            })}
        </div>
    );
}

export function Errors({ errors }: { errors: Record<string, string[]> }) {
    const errorList = Object.keys(errors);
    return (
        <>
            {errorList.map((name: string) => (
                <div key={name}>
                    {name}
                    <ul>
                        {errors[name]!.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

export function Input({
    name,
    label = name,
    hiddenLabel = false,
    type = 'text',
    placeholder,
    value,
    charLimit,
    attributes,
}: InputFieldProps) {
    const [inputValue, setInputValue] = useState('');
    const remainingChars = charLimit ? charLimit - inputValue.length : null;

    useEffect(() => {
        setInputValue(value ?? '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (charLimit && newValue.length > charLimit) {
            return;
        }
        setInputValue(newValue);
    };

    return (
        <label>
            <span className={hiddenLabel ? 'sr-only' : ''}>{label}</span>
            <input
                type={type}
                name={name}
                placeholder={placeholder ?? ''}
                value={inputValue}
                onChange={handleChange}
                maxLength={charLimit}
                autoComplete="off"
                {...attributes}
            />
            {charLimit && remainingChars !== null && remainingChars < 10 && (
                <span>
                    {inputValue.length}/{charLimit}
                </span>
            )}
        </label>
    );
}

export function KeyValueInput({
    kProps,
    vProps,
    attributes,
}: {
    kProps: InputFieldProps;
    vProps: InputFieldProps;
    attributes?: React.HTMLAttributes<HTMLDivElement>;
}) {
    // TODO: Asegurar la carga correcta de la data en los dos campos
    // y en relacion con el resto del formulario donde este contenido
    // ¿¿¿separar key y value desde el prop???
    return (
        <div className="keyValueInput" {...attributes}>
            <Input {...kProps} />
            <Input {...vProps} />
        </div>
    );
}

export function Select({
    name,
    selectValues,
    action,
    hiddenLabel = false,
    label = name,
    defaultValue = '',
}: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (action === undefined) {
            return;
        }
        action(e.target.value);
    };

    return (
        <label>
            <span className={hiddenLabel ? 'sr-only' : ''}>{label}</span>
            <select
                name={name}
                onChange={handleChange}
                defaultValue={defaultValue}
            >
                {selectValues.map(({ name, value }) => (
                    <option key={value} value={value}>
                        {name}
                    </option>
                ))}
            </select>
        </label>
    );
}

export function Form(props: FormProps) {
    const [errors, setErrors] = useState<ErrorObject | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitAction = (e.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement;
        if (!submitAction) {
            return;
        }
        setErrors(null);

        const formData = new FormData(e.currentTarget);
        const formObject = Object.fromEntries(formData.entries());
        const validations = props.validator
            ? props.validator(formObject as Record<string, string>)
            : null;

        if (validations !== null && Object.keys(validations).length > 0) {
            setErrors(validations);
            return;
        }

        formObject['formAction'] = submitAction.value;
        formObject['id'] = props.id ?? '';

        props.action(formObject as Record<string, string>);
    };

    return (
        <form onSubmit={handleSubmit} {...props.attributes}>
            {errors ? <Errors errors={errors} /> : ''}
            {props.children}
        </form>
    );
}

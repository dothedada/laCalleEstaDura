import React, { useState } from 'react';
import type {
    ButtonProp,
    ButtonsSetProps,
    InputFieldProps,
    SelectProps,
} from './components';

export function Button(props: ButtonProp & { children: string }) {
    const btnClass = props.buttonType;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            props.action();
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.action();
    };

    return (
        <button
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...props.attributes}
            className={btnClass}
        >
            {props.children}
        </button>
    );
}

export function ButtonsSet({
    buttons,
    containerAttributes,
}: {
    buttons: ButtonsSetProps[];
    containerAttributes?: React.HTMLAttributes<HTMLDivElement>;
}) {
    return (
        <div {...containerAttributes}>
            {buttons.map((btn, i) => {
                const { label, ...attributes } = btn;
                return (
                    <Button key={i} {...attributes}>
                        {label}
                    </Button>
                );
            })}
        </div>
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
    const [inputValue, setInputValue] = useState(value ?? '');
    const remainingChars = charLimit ? charLimit - inputValue.length : null;

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

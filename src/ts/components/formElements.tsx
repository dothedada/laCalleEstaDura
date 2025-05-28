import React, { useState } from 'react';
import type {
    ButtonProp,
    ButtonsSetProps,
    // FormProps,
    InputFieldProps,
    // SubmitProps,
    // TextareaProps,
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

export function Input(props: InputFieldProps) {
    const [inputValue, setInputValue] = useState(props.value ?? '');
    const remainingChars = props.charLimit
        ? props.charLimit - inputValue.length
        : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (props.charLimit && newValue.length >= props.charLimit) {
            return;
        }
        setInputValue(newValue);
    };

    return (
        <>
            <label>
                <span className={props.hiddenLabel ? 'sr-only' : ''}>
                    {props.label}
                </span>
                <input
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder ?? ''}
                    value={inputValue}
                    onChange={handleChange}
                    maxLength={props.charLimit}
                    {...props.attributes}
                />
                {props.charLimit && remainingChars && remainingChars < 10 && (
                    <span>
                        {inputValue.length}/{props.charLimit}
                    </span>
                )}
            </label>
        </>
    );
}

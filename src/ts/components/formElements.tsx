import React, { useState } from 'react';
import type {
    ButtonProp,
    // FormProps,
    // InputFieldProps,
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

export function ButtonsSet(buttons: (ButtonProp & { label: string })[]) {
    return (
        <>
            {buttons.map((btn, i) => {
                const { label, ...attributes } = btn;
                return (
                    <Button key={i} {...attributes}>
                        {label}
                    </Button>
                );
            })}
        </>
    );
}

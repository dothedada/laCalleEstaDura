import React from 'react';
import type { ErrorObject } from '../types';

export type SubmitProps = 'new' | 'update' | 'derivate' | 'delete';

export interface ButtonBase {
    buttonAction: SubmitProps;
    type?: 'button' | 'submit' | 'reset';
    action?: (
        e?:
            | undefined
            | string
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>,
    ) => void;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonType extends ButtonBase {
    text: string;
}

export interface ButtonsSetProps extends ButtonBase {
    buttons: ButtonType[];
}

export type InputFieldProps = {
    name: string;
    label?: string;
    hiddenLabel?: boolean;
    type?: 'text' | 'url' | 'email' | string;
    placeholder?: string;
    value?: string;
    charLimit?: number;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
};

export type SelectProps = {
    name: string;
    selectValues: { name: string; value: string }[];
    action?: (event: string | React.ChangeEvent<HTMLSelectElement>) => void;
    hiddenLabel?: boolean;
    label?: string;
    defaultValue?: string;
};

export type FormProps = {
    action: (arg: Record<string, string>) => Record<string, string>;
    validator?: (arg: Record<string, string>) => ErrorObject;
    children: React.ReactNode;
    id?: string;
    attributes?: React.FormHTMLAttributes<HTMLFormElement>;
};

export type CardStatus = 'active' | 'hidden';

export type CardInfoProps = {
    id: string;
    status: CardStatus;
    activeActions: ButtonType[];
    hiddenActions: ButtonType[];
};

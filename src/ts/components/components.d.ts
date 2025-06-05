import React from 'react';
import type { ElementId, ErrorObject } from '../types';

export type ActionType = 'new' | 'update' | 'derivate' | 'delete';

export interface ButtonBase {
    buttonAction: ActionType;
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
    action: (arg: Record<string, string>) => void;
    validator?: (arg: Record<string, string>) => ErrorObject;
    id?: ElementId;
    children: React.ReactNode;
    attributes?: React.FormHTMLAttributes<HTMLFormElement>;
};

export type CardStatus = 'active' | 'hidden';

export type CardInfoProps = {
    id: string;
    status: CardStatus;
    actions: ButtonType[];
};

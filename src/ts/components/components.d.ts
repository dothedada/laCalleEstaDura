import React from 'react';
import type { ElementTypes, ErrorObject } from '../types';

export type SubmitProps = 'new' | 'update' | 'derivate' | 'delete';

export interface ButtonProp {
    buttonAction: SubmitProps;
    type?: 'button' | 'submit' | 'reset';
    action?: (
        e?:
            | string
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>,
    ) => void;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonsSetProps extends ButtonProp {
    label: string;
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

export interface CardInfoProps {
    id: string;
    title: string;
    text: string;

    status: 'active' | 'hidden';
    activeActions: ButtonsSetProps[];
    hiddenActions: ButtonsSetProps[];
}

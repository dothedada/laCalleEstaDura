import React from 'react';
import { Tags } from '../types';

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
    action: (event: string) => void;
    hiddenLabel?: boolean;
    label?: string;
    defaultValue?: string;
};

export type TextareaProps = Omit<InputFieldProps, 'type'>;

export type SubmitProps = 'new' | 'update' | 'derivate' | 'delete';

export interface ButtonProp {
    buttonType: SubmitProps;
    action: () => void;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonsSetProps extends ButtonProp {
    label: string;
}

export type FormProps = {
    children: React.ReactNode;
    id: Tags;
};

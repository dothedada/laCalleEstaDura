import React from 'react';
import { Tags } from '../types';

export type InputFieldProps = {
    type: 'text' | 'url' | 'email' | string;
    placeholder?: string;
    name: string;
    visibleLabel: boolean;
    label?: string;
    value?: string;
    charLimit?: number;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
};

export type TextareaProps = Omit<InputFieldProps, 'type'>;

export type SubmitProps = 'new' | 'update' | 'derivate' | 'delete';

export interface ButtonProp {
    buttonType: SubmitProps;
    attributes: React.ButtonHTMLAttributes<HTMLButtonElement>;
    action: () => void;
}

export interface ButtonsSetProps extends ButtonProp {
    label: string;
}

export type FormProps = {
    children: React.ReactNode;
    id: Tags;
};

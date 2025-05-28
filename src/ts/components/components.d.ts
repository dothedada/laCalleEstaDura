import React from 'react';
import { Tags } from '../types';

export type InputFieldProps = {
    type: 'text' | 'url' | 'email' | string;
    placeholder?: string;
    name: string;
    baseValue?: string;
};

export type TextareaProps = Omit<InputFieldProps, 'type'>;

export type SubmitProps = 'new' | 'update' | 'derivate' | 'delete';

export type ButtonProp = {
    buttonType: SubmitProps;
    attributes: React.ButtonHTMLAttributes<HTMLButtonElement>;
    action: () => void;
};

export type FormProps = {
    children: React.ReactNode;
    id: Tags;
};

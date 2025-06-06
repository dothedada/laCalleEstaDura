import React from 'react';
import type {
    SectionNames,
    Validations,
    ElementId,
    ErrorObject,
} from '../types';

export type buttonStyle = 'new' | 'update' | 'duplicate' | 'delete';

export interface ButtonType extends ButtonBase {
    text: string | React.ReactSVGElement;
    alt?: string;
    style?: buttonStyle;
    action?: (e?: string | React.MouseEvent<HTMLButtonElement>) => void;
    data?: Record<string, string>;
    value?: string;
    type?: 'button' | 'submit' | 'reset';
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonsSetProps {
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

export interface TextFormProps extends InputFieldProps {
    id?: ElementId;
    section: SectionNames;
    validations?: Validations;
}

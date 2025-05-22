import React, { useState } from 'react';
import type {
    FormProps,
    InputFieldProps,
    SubmitProps,
    TextareaProps,
} from './components';

export function InputField(props: InputFieldProps) {
    const { baseValue, ...inputParams } = props;
    const [value, setValue] = useState<string>(baseValue ?? '');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    return (
        <label>
            {props.name}
            <input {...inputParams} onChange={onChange} value={value} />
        </label>
    );
}

export function TextareaField(props: TextareaProps) {
    const { baseValue, ...inputParams } = props;
    const [value, setValue] = useState<string>(baseValue ?? '');

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(e.target.value);
    };

    return (
        <label>
            {props.name}
            <textarea {...inputParams} onChange={onChange}>
                {value}
            </textarea>
        </label>
    );
}

export function Form(props: FormProps) {
    const [action, setAction] = useState<SubmitProps | null>(null);

    const onSubmit = (e: React.FormEvent) => {
        if (action === null) {
            return;
        }
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData);

        console.log(props.id, data, action);
    };

    return (
        <form onSubmit={onSubmit}>
            {props.children}
            <button onClick={() => setAction('new')}>New</button>
            <button onClick={() => setAction('update')}>Update</button>
            <button onClick={() => setAction('derivate')}>Derivate</button>
            <button onClick={() => setAction('delete')}>Delete</button>
        </form>
    );
}

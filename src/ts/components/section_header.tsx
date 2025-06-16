import React, { useState, type ReactNode } from 'react';
import { Button, Form, Input } from './form_components';
import type { Section } from '../types_app';
import type { CardAction } from '../hooks/types_hooks';

export function FormSectionSettings(props: {
    data: { section: Section; dispatch: React.Dispatch<CardAction> };
    children?: ReactNode;
}) {
    const [reset, setReset] = useState(0);

    const onSubmitSuccess = (newData: Record<string, string>) => {
        props.data.dispatch({ type: 'data_updated', data: newData });
    };

    const onClickReset = () => {
        setReset(reset + 1);
    };

    return (
        <Form action={onSubmitSuccess} key={reset}>
            <Input
                name="name"
                label="reference *"
                value={props.data.section ? props.data.section.name : ''}
                charLimit={20}
            />
            <Input
                name="title"
                label="Printing title"
                value={props.data.section ? props.data.section.title : ''}
                charLimit={20}
            />
            <Button text="guardar" type="submit" />
            <Button text="restablecer" type="reset" action={onClickReset} />
            {props.children}
        </Form>
    );
}

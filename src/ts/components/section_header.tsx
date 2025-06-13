import { useReducer, useState, type ReactNode } from 'react';
import { Button, Form, Input } from './form_components';
import { sectionReducer } from '../hooks/sectionReducer';
import type { Section } from '../types_app';

export function FormSectionSettings(props: {
    data: Section;
    children?: ReactNode;
}) {
    const [data, dispatch] = useReducer(sectionReducer, props.data);
    const [reset, setReset] = useState(0);

    const onSubmitSuccess = (newData: Record<string, string>) => {
        dispatch({ type: 'data_updated', data: newData });
    };

    const onClickReset = () => {
        setReset(reset + 1);
    };

    return (
        <Form action={onSubmitSuccess} key={reset}>
            <Input
                name="name"
                label="reference *"
                value={data ? data.name : ''}
                charLimit={20}
            />
            <Input
                name="title"
                label="Printing title"
                value={data ? data.title : ''}
                charLimit={20}
            />
            <Button text="guardar" type="submit" />
            <Button text="restablecer" type="reset" action={onClickReset} />
            {props.children}
        </Form>
    );
}

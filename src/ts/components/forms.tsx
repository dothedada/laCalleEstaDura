import { useState, useEffect } from 'react';
import { createID, getItemFromLS, saveItemToLS } from '../utils/dataStorage.ts';
import type { ElementId, SectionNames, Text, Validations } from '../types.d.ts';
import { Input, Button, Form } from './formElements.tsx';
import type { InputFieldProps } from './components';
import { validator } from '../utils/validator.ts';

export interface TextFormProps extends InputFieldProps {
    id?: ElementId;
    section: SectionNames;
    validations?: Validations;
}

export function TextForm(props: TextFormProps) {
    // TODO: tarjeta de form cuando el id no existe
    const [data, setData] = useState<Text | null>(null);
    const { id, section, validations, ...inputAttributes } = props;

    const contextLang = 'es';

    useEffect(() => {
        if (id !== undefined) {
            const loadedData = getItemFromLS<Text>(id);
            if (loadedData === null || loadedData === undefined) {
                throw new Error('No data from the LS loaded');
            }
            setData(loadedData);
        }
    }, [id]);

    const onSuccesSubmit = (newData: Record<string, string>) => {
        const setId =
            id === undefined || (data && data.lang !== contextLang)
                ? createID(section, 'text', false)
                : id;

        saveItemToLS({ ...newData, id: setId, lang: contextLang });
    };

    const textValidator =
        validations !== undefined ? validator(validations) : undefined;

    return (
        <Form action={onSuccesSubmit} validator={textValidator}>
            <div>CV lang: {data?.lang || contextLang}</div>
            {data?.lang !== undefined && data.lang !== contextLang
                ? 'Saving would create a copy of the card with the updated lang'
                : ''}
            <Input {...inputAttributes} value={data?.name ?? ''} />
            <Button text="guardar" type="submit" buttonAction="new" />
        </Form>
    );
}

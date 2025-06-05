import { useState, useEffect, useContext } from 'react';
import { createID, getItemFromLS, saveItemToLS } from '../utils/dataStorage.ts';
import { Input, Button, Form } from './formElements.tsx';
import { validator } from '../utils/validator.ts';
import type { Text } from '../types.d.ts';
import type { TextFormProps } from './components';
import { LangContext } from '../hooks/context.ts';

export function TextForm(props: TextFormProps) {
    const contextLang = useContext(LangContext);
    const [data, setData] = useState<Text | null>(null);
    const { id, section, validations, ...inputAttributes } = props;

    useEffect(() => {
        if (id !== undefined) {
            const loadedData = getItemFromLS<Text>(id);
            if (loadedData === null || loadedData === undefined) {
                throw new Error('Unable to get the data from LocalStorage');
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
            <div>
                sec lang: {data?.lang}, ctx: {contextLang}
            </div>
            {data?.lang !== undefined && data.lang !== contextLang
                ? 'Saving would create a copy of the card with the updated lang'
                : ''}
            <Input {...inputAttributes} value={data?.name ?? ''} />
            <Button text="guardar" type="submit" style="new" />
        </Form>
    );
}

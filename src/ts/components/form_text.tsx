import { useState, useEffect, useContext } from 'react';
import { createID, getItemFromLS, saveItemToLS } from '../utils/dataStorage';
import { Input, Button, Form } from './form_components';
import { validator } from '../utils/validator';
import type { Text } from '../types_app';
import type { TextFormProps } from './types_components';
import { LangContext } from '../hooks/context';

export function FormText(props: TextFormProps) {
    const contextLang = useContext(LangContext);
    const [data, setData] = useState<Text | null>(null);
    const { id, section, validations, ...inputAttributes } = props;

    useEffect(() => {
        if (id !== undefined) {
            const loadedData = getItemFromLS<Text>(id);
            if (loadedData === null || loadedData === undefined) {
                throw new Error('No data from the LS loaded');
            }
            setData(loadedData);
        }
    }, [id]);

    const onSubmitSuccess = (newData: Record<string, string>) => {
        const setId =
            id === undefined || (data && data.lang !== contextLang)
                ? createID(section, 'text', false)
                : id;

        saveItemToLS({ ...newData, id: setId, lang: contextLang });
    };

    const textValidator =
        validations !== undefined && Object.keys(validations).length > 0
            ? validator(validations)
            : undefined;

    const translate = data?.lang !== undefined && data.lang !== contextLang;

    return (
        <Form
            action={onSubmitSuccess}
            validator={textValidator}
            attributes={{ className: translate ? 'warn' : '' }}
        >
            {translate && (
                <div className="warn">
                    Saving would create a copy of the card with the updated lang
                </div>
            )}

            <Input {...inputAttributes} value={data?.name ?? ''} />
            <Button text="guardar" type="submit" style="new" />
        </Form>
    );
}

import { useContext } from 'react';
import type { CV, ElementId, Langs } from '../types';
import { validator } from '../utils/validator';
import { Form, Input, Button } from './form_components';
import { LangContext } from '../hooks/context';
import { saveItemToLS } from '../utils/dataStorage';

export function LangForm({
    currentCV,
    setLangCallback,
    cancelCallback,
}: {
    currentCV: CV;
    setLangCallback: (l: Langs) => void;
    cancelCallback: () => void;
}) {
    const currentLang = useContext(LangContext);

    const onSuccessSubmit = (newData: Record<string, string>) => {
        if (newData.lang === undefined) {
            throw new Error('No data to create new CV');
        }

        const updatedCV = { ...currentCV };
        updatedCV.langs = { ...currentCV.langs };
        const sections: { active: ElementId[]; hidden: ElementId[] } = {
            active: [],
            hidden: [],
        };

        if (
            newData.copy !== undefined &&
            currentCV.langs[currentLang] !== undefined
        ) {
            sections.active = [...currentCV.langs[currentLang].active];
            sections.hidden = [...currentCV.langs[currentLang].hidden];
        }

        updatedCV.langs[newData.lang] = sections;
        saveItemToLS(currentCV);

        setLangCallback(newData.lang);
    };

    const validate = validator({
        lang: [
            [/^..$/, 'el codigo iso del lenguaje debe ser de dos caracteres'],
            [
                (input) => !Object.keys(currentCV.langs).includes(input.lang),
                'ya existe una versión de este cv en el idioma seteado',
            ],
        ],
    });

    return (
        <div>
            <Form action={onSuccessSubmit} validator={validate}>
                <Input
                    charLimit={2}
                    name="lang"
                    label="código iso del lenguaje"
                    placeholder="'es', 'en', 'fr'"
                />
                <label>
                    <input type="checkbox" name="copy" checked />
                    Incluir las secciones del idioma actual
                </label>
                <Button text="Crear version para traducir" type="submit" />
            </Form>
            <Button text="Cancelar" action={cancelCallback} />
        </div>
    );
}

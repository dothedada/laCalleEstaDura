import { Button, Form, Input } from './form_components';
import type { CV } from '../types_app';
import { createID, getItemFromLS, saveItemToLS } from '../utils/dataStorage';
import { validator } from '../utils/validator';

export function FormCV({
    action,
    currentCV,
    callbackOnSuccess,
}: {
    action: 'new' | 'edit' | 'duplicate';
    currentCV?: CV;
    callbackOnSuccess?: (id: CV['id']) => void;
}) {
    const id = currentCV?.id;

    const onSuccesSubmit = (newData: Record<string, string>) => {
        if (newData.name === undefined || newData.tag === undefined) {
            throw new Error('No data to create new CV');
        }

        const saveToId =
            id !== undefined && action === 'edit'
                ? id
                : (createID(newData.name, newData.tag, true) as CV['id']);
        let sectionsCopy: CV['langs'] = {};
        if (id && (action === 'edit' || action === 'duplicate')) {
            if (currentCV.langs === undefined) {
                const { langs } = getItemFromLS<CV>(id);
                sectionsCopy = langs;
            } else {
                for (const lang in currentCV.langs) {
                    const active = [...currentCV.langs[lang]!.active];
                    const hidden = [...currentCV.langs[lang]!.hidden];
                    sectionsCopy[lang] = { active, hidden };
                }
            }
        }

        saveItemToLS({
            name: newData.name,
            tag: newData.tag,
            id: saveToId,
            langs: sectionsCopy,
        });

        if (callbackOnSuccess !== undefined) {
            callbackOnSuccess(saveToId);
        }
    };

    const validate = validator({
        name: [
            [/^.+$/, 'no puede estar vacio'],
            [/^.{1,20}/, 'maximo 20 caracteres'],
        ],
        tag: [
            [/^.+$/, 'no puede estar vacio'],
            [/^.{1,20}/, 'maximo 40 caracteres'],
        ],
    });

    return (
        <Form action={onSuccesSubmit} validator={validate}>
            <Input
                name="name"
                placeholder="Menganite de Butifa"
                label="Tu nombre"
                charLimit={20}
            />
            <Input
                name="tag"
                placeholder="Para comunicaciones"
                label="Una pista para reconocerla"
                charLimit={40}
            />
            <Button
                text={id ? 'duplicar' : 'Crear'}
                style={id ? 'duplicate' : 'new'}
                type="submit"
            />
        </Form>
    );
}

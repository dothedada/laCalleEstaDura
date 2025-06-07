import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../hooks/context';
import type { CV, Langs } from '../types';
import { Button, Select } from './formElements';
import { loadCVsFromLS } from '../utils/dataStorage';

// NOTE: mover el current CV a header
// cargar solo los id de los CV
// currentCV que sea el objeto completo
export function CVmanager(props: { setCV: (cv: CV) => void }) {
    const [cvs, setCVs] = useState<CV[] | null>(null);
    // const [formActive, setFormActive] = useState<boolean>(false);

    useEffect(() => {
        const cvsInLS: CV[] = loadCVsFromLS();
        if (cvsInLS.length === 0) {
            return;
        }
        setCVs(cvsInLS);
        props.setCV(cvsInLS[0]!);
    }, [props]);

    const cvsAvailable = cvs
        ? cvs.map((cv) => ({ name: cv.name, value: cv.id }))
        : [];

    const addCV = () => {};
    const editCV = () => {};
    const deleteCV = () => {};

    return (
        <div>
            <Select
                name="CVs"
                selectValues={cvsAvailable}
                defaultValue={currentCV ?? ''}
            />
            <Button text="Editar" style="update" action={editCV} />
            <Button text="Duplicar" style="duplicate" action={addCV} />
            <Button text="Borrar" style="delete" action={deleteCV} />
            <hr />
            <Button text="Nuevo" style="new" action={addCV} />
        </div>
    );
}

export function LangManager(props: {
    cvData: CV;
    setLang: (lang: Langs) => void;
}) {
    const [formActive, setFormActive] = useState<boolean>(false);
    const langsAvailable = Object.keys(props.cvData.langs);
    const lang = useContext(LangContext);

    const openForm = () => setFormActive(!formActive);

    return (
        <div>
            {langsAvailable.map((lang) => (
                <Button text={lang} action={() => props.setLang(lang)} />
            ))}
            <br />
            <Button text="traducir" action={openForm} />
            <Button text={`borrar version en ${lang}`} />
        </div>
    );
}

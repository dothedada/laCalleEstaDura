import { useEffect, useState } from 'react';
import type { CV } from '../types_app';
import { Button, Select } from './form_components';
import { loadCVsFromLS } from '../utils/dataStorage';
import { FormCV } from './form_CV';

export function CVmanager(props: { setCV: (cv: CV) => void }) {
    const [cvs, setCVs] = useState<CV[] | null>(null);
    const [currentCV, setCurrentCV] = useState<string | null>(null);
    const [formActive, setFormActive] = useState<boolean>(false);

    useEffect(() => {
        const cvsInLS: CV[] = loadCVsFromLS();
        if (cvsInLS.length <= 0) {
            return;
        }

        setCVs(cvsInLS);

        if (cvsInLS[0] === undefined) {
            return;
        }
        props.setCV(cvsInLS[0]);
        setCurrentCV(cvsInLS[0].id);
    }, [props]);

    const cvsAvailable = cvs
        ? cvs.map((cv) => ({ name: cv.name, value: cv.id }))
        : [];

    const addCV = () => {};
    const editCV = () => {};
    const deleteCV = () => {};

    return formActive ? (
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
    ) : (
        <FormCV currentCV={currentCV} />
    );
}

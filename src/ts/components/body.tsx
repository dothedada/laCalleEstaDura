import React, { useContext, useEffect, useState, type ReactNode } from 'react';
import { Button, Select } from './formElements';
import type { CV, Langs } from '../types';
import { LangContext } from '../hooks/context';
import { loadCVsFromLS } from '../utils/dataStorage';

function CVmanager() {
    const [cvs, setCVs] = useState<CV[] | null>(null);
    const [currentCV, setCurrentCV] = useState<CV['id'] | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const loadCVs = useContext(LangContext);

    useEffect(() => {
        const cvsInLS: CV[] = loadCVsFromLS();
        if (cvsInLS === null || cvsInLS.length === 0) {
            return;
        }
        setCVs(cvsInLS);
        setCurrentCV(cvsInLS[0]?.id ?? null);
    }, []);

    const cvsAvailable = cvs
        ? cvs.map((cv) => ({ name: cv.name, value: cv.id }))
        : [];

    const addCV = () => {
        const cvsInLS: CV[] = loadCVsFromLS();
        if (cvsInLS === null || cvsInLS.length === 0) {
            return;
        }
        setCVs(cvsInLS);
        setCurrentCV(cvsInLS[0]?.id ?? null);
    };
    const editCV = () => {};
    const deleteCV = () => {};

    return (
        <div>
            <h1>Tu Curriculum</h1>
            {cvs && (
                <Select
                    name="CVs"
                    selectValues={cvsAvailable}
                    defaultValue={currentCV ?? ''}
                />
            )}
            <Button text="Editar" style="update" action={editCV} />
            <Button text="Duplicar" style="duplicate" action={addCV} />
            <Button text="Borrar" style="delete" action={deleteCV} />
            <hr />
            <Button text="Nuevo" style="new" action={addCV} />
        </div>
    );
}

export function AppBody(props: { children: ReactNode }) {
    const [lang, setLang] = useState<Langs>('es');

    return <LangContext value={lang}>{props.children}</LangContext>;
}

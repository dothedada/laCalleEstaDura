import { useState, type ReactNode } from 'react';
import type { CV, Langs } from '../types';
import { LangContext } from '../hooks/context';
import { CVmanager, LangManager } from './settingsManager';

export function Header(props: { children: ReactNode }) {
    const [cv, setCV] = useState<CV | null>(null);
    const [lang, setLang] = useState<Langs>('es');

    return (
        <LangContext value={lang}>
            <CVmanager setCV={setCV} />
            <LangManager cvData={cv} setLang={setLang} />
            {props.children}
        </LangContext>
    );
}

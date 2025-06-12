import { useState, type ReactNode } from 'react';
import type { CV, Langs } from '../types';
import { LangContext } from '../hooks/context';
import { CVmanager } from './header_CVmanager.tsx';
import { LangManager } from './header_langManager.tsx';

export function Body(props: { children: ReactNode }) {
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

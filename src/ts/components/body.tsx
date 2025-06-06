import React, { useState, type ReactNode } from 'react';
import { Button } from './formElements';
import type { Langs } from '../types';
import { LangContext } from '../hooks/context';

export function AppBody(props: { children: ReactNode }) {
    const [lang, setLang] = useState<Langs>('en');

    const setLangBtn = (e?: string | React.MouseEvent<HTMLButtonElement>) => {
        if (e === undefined || typeof e === 'string') {
            console.log('rechazado', e);
            return;
        }
        setLang(e.currentTarget.dataset.lang as Langs);
    };

    return (
        <LangContext value={lang}>
            <header>
                set lang:
                <Button
                    text="en"
                    alt="cambiar el idioma de la oha de vida a inglés"
                    data={{ lang: 'en' }}
                    style="update"
                    action={setLangBtn}
                />
                <Button
                    text="es"
                    alt="cambiar el idioma de la oha de vida a español"
                    data={{ lang: 'es' }}
                    style="update"
                    action={setLangBtn}
                />
            </header>

            {props.children}
        </LangContext>
    );
}

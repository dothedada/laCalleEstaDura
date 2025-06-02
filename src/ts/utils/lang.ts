import type { Langs } from './types';

type UITxtStructure = { [K in Langs]?: Record<string, string> };

export let currentLang: Langs = 'es';

export function changeLang(lang: Langs) {
    currentLang = lang;
}

export const uiTxt = {
    es: {
        current: 'actualidad',
    },
} as const satisfies UITxtStructure;

import type { ElementId, CVData, CV, Element, Sections } from '../types';

export function createHash(): string {
    return (Math.random() * 10_000 * new Date().getTime())
        .toString(26)
        .replace(/\./g, '')
        .slice(0, 10)
        .padEnd(10, '0');
}

export function createID<S, E>(
    section: S,
    element: E,
    isCV: boolean,
): ElementId<S, E> {
    const date = new Date().toISOString().replace(/\D/g, '').slice(0, 8);
    const hash = createHash();
    const cv = isCV ? 'CV_' : '';
    return `${cv}${section}_${element}_${date}-${hash}` as ElementId<S, E>;
}

export function loadFromLocalStorage(): CVData {
    const cvData: CVData = { cvs: [], elements: [] };

    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);

        if (!element) {
            break;
        }

        cvData[element.startsWith('CV_') ? 'cvs' : 'elements'].push(
            JSON.parse(element),
        );
    }

    return cvData;
}

export function saveToLocalStorage(element: {
    id: string;
    lastUpdate?: string;
}): void {
    if (element.id.startsWith('CV_')) {
        element.lastUpdate = new Date().toISOString().slice(0, 10);
    }
    localStorage.setItem(element.id, JSON.stringify(element));
}

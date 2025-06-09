import type { ElementId, ElementTypes, CV } from '../types';

export function createHash(): string {
    return (Math.random() * 10_000 * new Date().getTime())
        .toString(26)
        .replace(/\./g, '')
        .slice(0, 10)
        .padEnd(10, '0');
}

export function createID(
    firstBlock: string,
    secondBlock: string,
    isCV: boolean,
) {
    const date = new Date().toISOString().replace(/\D/g, '').slice(0, 8);
    const hash = createHash();
    if (isCV) {
        return `CV_${firstBlock}_${secondBlock}_${date}-${hash}` as CV['id'];
    }
    return `${firstBlock}_${secondBlock}_${date}-${hash}` as ElementId;
}

export function getItemFromLS<T extends ElementTypes | CV>(id: string): T {
    const data = localStorage.getItem(id);
    if (data === null) {
        throw new Error(`No element in local storage with id '${id}'`);
    }

    const dataObj = JSON.parse(data);
    return dataObj as T;
}

export function loadCVsFromLS(): CV[] {
    const cvData: CV[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) {
            break;
        }

        const element = localStorage.getItem(key);
        if (!element) {
            break;
        }

        cvData.push(JSON.parse(element));
    }

    cvData.sort(
        (a, b) =>
            +b.lastUpdate.split('-').join('') -
            +a.lastUpdate.split('-').join(''),
    );

    return cvData;
}

export function saveItemToLS<T extends { id: string }>(element: T): void {
    let data = element;
    if (element.id.startsWith('CV_')) {
        data = { ...data, lastUpdate: new Date().toISOString() };
    }
    localStorage.setItem(element.id, JSON.stringify(data));
}

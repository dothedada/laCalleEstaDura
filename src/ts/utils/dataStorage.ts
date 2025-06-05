import type {
    ElementId,
    CVInventory,
    SectionNames,
    ElementNames,
    ElementTypes,
} from '../types';

export function createHash(): string {
    return (Math.random() * 10_000 * new Date().getTime())
        .toString(26)
        .replace(/\./g, '')
        .slice(0, 10)
        .padEnd(10, '0');
}

export function createID(
    section: SectionNames,
    element: ElementNames,
    isCV: boolean,
): ElementId {
    const date = new Date().toISOString().replace(/\D/g, '').slice(0, 8);
    const hash = createHash();
    const cv = isCV ? 'CV_' : '';
    return `${cv}${section}_${element}_${date}-${hash}` as ElementId;
}

export function getItemFromLS<T extends ElementTypes>(id: string): T {
    const data = localStorage.getItem(id);
    if (data === null) {
        throw new Error(`No element in local storage with id '${id}'`);
    }

    const dataObj = JSON.parse(data);
    return dataObj as T;
}

export function loadCVsFromLS(): CVInventory {
    const cvData: CVInventory = [];

    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);

        if (!element) {
            break;
        }

        cvData.push(JSON.parse(element));
    }

    return cvData;
}

export function saveItemToLS<T extends { id: string }>(element: T): void {
    let data = element;
    if (element.id.startsWith('CV_')) {
        data = { ...data, lastUpdate: new Date().toISOString().slice(0, 10) };
        console.log(new Date().toISOString().slice(0, 10));
        console.log('dentro', data);
    }
    localStorage.setItem(element.id, JSON.stringify(data));
}

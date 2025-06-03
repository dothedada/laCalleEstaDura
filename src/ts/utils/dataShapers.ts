import type {
    Element,
    FixedCard,
    OpenCard,
    Section,
    Text,
} from '../types.d.ts';

function isElement(rawData: unknown): rawData is Element {
    if (typeof rawData !== 'object' || rawData === null) {
        return false;
    }
    return 'lang' in rawData && 'id' in rawData && 'name' in rawData;
}

function isText(rawData: unknown): rawData is Text {
    return isElement(rawData) && 'content' in rawData;
}

function isOpenCard(rawData: unknown): rawData is OpenCard {
    if (
        isElement(rawData) &&
        'items' in rawData &&
        Array.isArray(rawData.items)
    ) {
        return (
            rawData.items[0]?.key !== undefined &&
            rawData.items[0]?.value !== undefined
        );
    } else {
        return false;
    }
}

function isFixedCard(rawData: unknown): rawData is FixedCard {
    return isElement(rawData) && 'kind' in rawData;
}

function isSection(rawData: unknown): rawData is Section {
    return (
        isElement(rawData) &&
        'multiple' in rawData &&
        'active' in rawData &&
        Array.isArray(rawData.active)
    );
}

export function makeCardDataFromElement(rawData: unknown): {
    title: string;
    text: string;
} {
    if (!isElement(rawData)) {
        throw new Error('rawData is not a valid element');
    }

    let text = '';

    if (isText(rawData)) {
        text = rawData.content;
    }

    if (isOpenCard(rawData)) {
        for (const { key, value } of rawData.items) {
            text += `${key}: ${value}; `;
        }
    }

    if (isFixedCard(rawData)) {
        let when = '';
        switch (rawData.kind) {
            case 'common':
                when = rawData.when;
                break;
            case 'education':
                when = `${rawData.from}-${rawData.to}`;
                break;
            case 'experience':
                when = `${rawData.from}-${rawData.to ?? 'actualidad'}`;
                break;
        }
        text = `${rawData.title}, ${when}.`;
    }

    if (isSection(rawData)) {
        text = '';
    }

    const title = rawData.title ?? rawData.name;
    return { title, text };
}

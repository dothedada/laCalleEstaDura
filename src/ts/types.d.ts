type Langs = 'es' | 'en' | string;
type SectionNames =
    | 'profile'
    | 'contact'
    | 'skill'
    | 'languages'
    | 'courses'
    | 'achievements'
    | 'certifications'
    | 'education'
    | 'experience-card'
    | 'experience-tasks'
    | 'experience-achievements';
export type ElementNames = 'section' | 'fixedcard' | 'opencard' | 'text';
export type ElementTypes = Section | FixedCard | OpenCard | Text;

export type CVInventory = CV[];
export type CVid<T extends string, E extends string> = CV<T, E>['id'];

export type CV<T extends string, E extends string> = {
    name: T;
    tag: E;
    id: `CV_${T}_${E}_${string}`;
    langs: {
        [lang in Langs]?: {
            active: ElementId[];
            hidden: ElementId[];
        };
    };
    lastUpdate: string;
};

export type ElementId = `${SectionNames}_${ElementNames}_${string}-${string}`;

interface Element {
    lang: Langs;
    id: ElementId;
    name: string;
    title?: string;
}

export interface Section extends Element {
    multiple: boolean;
    active: ElementId[];
    hidden: ElementId[];
}

type CommonData = {
    kind: 'common';
    title: string;
    description: string;
    when: string;
};

type ExperienceData = {
    kind: 'experience';
    title: string;
    location: string;
    from: string;
    to?: string;
};

type EducationData = {
    kind: 'education';
    title: string;
    institution: string;
    where: string;
    from: string;
    to: string;
    achievement?: string;
};

export type FixedCard = Element & (CommonData | ExperienceData | EducationData);

export interface OpenCard extends Element {
    items: { key: string; value: string }[];
}

export interface Text extends Element {
    content: string;
}

export type Validations = {
    [field: string]: [
        rule: RegExp | ((...args: strin[]) => boolean),
        message: string,
    ][];
};

export type ErrorObject = Record<string, string[]>;

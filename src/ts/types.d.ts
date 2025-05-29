type Langs = 'es' | 'en' | string;
type Sections =
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

export type DataInventory = {
    cvs: CV[];
    elements: Element[];
};

export type CV = {
    name: string;
    tag: string;
    id: `CV_${string}_${string}_${string}`;
    langs: {
        [lang in Langs]?: {
            active: ElementId[];
            hidden: ElementId[];
        };
    };
    lastUpdate: string;
};

export type ElementId = `${string}_${string}_${string}-${string}`;

interface Element {
    lang: Langs;
    id: ElementId;
    name: string;
    title?: string;
}

export type ElementTypes = 'section' | 'fixedcard' | 'opencard' | 'text';

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

export interface FixedCard extends Element {
    items: (CommonData | ExperienceData | EducationData)[];
}

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

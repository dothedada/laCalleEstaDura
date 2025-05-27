// CV elements
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

type ElementTypes = 'section' | 'fixedcard' | 'opencard' | 'text';

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

export type CV<Name extends string, Tag extends string> = {
    name: Name;
    tag: Tag;
    id: `CV_${Name}_${Tag}_${string}`;
    langs: {
        [lang in Langs]?: {
            active: string[];
            hidden: string[];
        };
    };
    lastUpdate: string;
};

export type ElementId<SEC, ET> = `${SEC}_${ET}_${string}-${string}`;

interface Element<SEC extends Sections, ET extends ElementTypes> {
    lang: Langs;
    id: ElementId<SEC, ET>;
    name: string;
    title?: string;
}

export interface Section<SEC extends Sections, ET extends ElementTypes>
    extends Element<SEC, ET> {
    multiple: boolean;
    active: string[];
    hidden: string[];
}

export interface FixedCard<SEC extends Sections, ET extends ElementTypes>
    extends Element<SEC, ET> {
    items: (CommonData | ExperienceData | EducationData)[];
}

export interface OpenCard<SEC extends Sections, ET extends ElementTypes>
    extends Element<SEC, ET> {
    items: { key: string; value: string }[];
}

export interface Text<SEC extends Sections, ET extends ElementTypes>
    extends Element<SEC, ET> {
    content: string;
}

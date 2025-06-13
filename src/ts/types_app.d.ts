// UN languages + German
type Langs = 'es' | 'en' | 'de' | 'ar' | 'zh' | 'fr' | 'ru' | string;

export type CV = {
    name: string;
    tag: string;
    id: string;
    langs: {
        [lang in Langs]?: {
            active: ElementId[];
            hidden: ElementId[];
        };
    };
    lastUpdate: string;
};

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

export type ElementTypes = Section | FixedCards | OpenCard | Text;
export type ElementNames = ElementTypes['kind'];
export type ElementId = `${SectionNames}_${ElementNames}_${string}-${string}`;

interface Element {
    lang: Langs;
    id: ElementId;
    name: string;
    title?: string;
}

export interface Section extends Element {
    kind: 'section';
    multiple: boolean;
    active: ElementId[];
    hidden: ElementId[];
}

export interface OpenCard extends Element {
    kind: 'openCard';
    items: { key: string; value: string }[];
}

export interface Text extends Element {
    kind: 'text';
    content: string;
}

export type FixedCards = Element &
    (CommonData | ExperienceData | EducationData);

type CommonData = {
    kind: 'commonCard';
    title: string;
    description: string;
    when: string;
};

type ExperienceData = {
    kind: 'experienceCard';
    title: string;
    location: string;
    from: string;
    to?: string;
};

type EducationData = {
    kind: 'educationCard';
    title: string;
    institution: string;
    where: string;
    from: string;
    to: string;
    achievement?: string;
};

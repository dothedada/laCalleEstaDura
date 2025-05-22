// CV elements
export type Lang = 'es' | 'en';
type Elements = 'section' | 'card' | 'job' | 'ul' | 'li' | 'p';
export type Tags = `${Elements}_${string}`;

interface Module<T extends Tags = Tags> {
    lang: Lang;
    inRender: boolean;
    id: T;
    derivated?: T;
}

export type CV = {
    lang: Lang;
    name: string;
    id: `cv_${string}`;
    elements: `section_${string}`[];
};

export interface Section extends Module<`section_${string}`> {
    title: string;
    position: number;
    elements: (Card | Job | List | Paragraph)[];
}

export interface Card extends Module<`card_${string}`> {
    title?: string;
    items: Record<string, string>;
}

export interface Job extends Module<`job_${string}`> {
    data: {
        jobTitle: string;
        company: string;
        location: string;
        startDate: string;
        endDate: string | null;
        description: string | List;
        achievements: string | List;
    };
}

export interface List extends Module<`ul_${string}`> {
    title?: string;
    items: ListItem[];
}

export interface Paragraph extends Module<`p_${string}`> {
    title?: string;
    content: string;
}

export interface ListItem extends Module<`li_${string}`> {
    content: string;
}

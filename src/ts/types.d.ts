// CV elements
export type Lang = 'es' | 'en';
export type Tags =
    | `section_${string}`
    | `card_${string}`
    | `job_${string}`
    | `ul_${string}`
    | `p_${string}`
    | `li_${string}`;

interface Module<T extends Tags = Tags> {
    lang: Lang;
    inRender: boolean;
    id: T;
    derivated?: T;
}

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

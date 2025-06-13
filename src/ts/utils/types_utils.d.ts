export type NodeLabels = 'strong' | 'em' | 'mark' | 'text';

export type InputNode = {
    label: NodeLabels;
    position?: number;
    content: InputNode[] | string;
};

export type Pattern = ('end' | 'char' | 'digit' | string)[];

export type InOutPattern = { open: Pattern; close: Pattern };

export type Segments = {
    labelled: [number, number][];
    plain: [number, number][];
    pad: { start: number; end: number };
};

export type Validations = {
    [field: string]: [
        rule: RegExp | ((...args: strin[]) => boolean),
        message: string,
    ][];
};

export type ErrorObject = Record<string, string[]>;

type UITxtStructure = { [K in Langs]?: Record<string, string> };

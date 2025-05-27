export type NodeLabels = 'strong' | 'em' | 'mark' | 'text';

export type Node = {
    label: NodeLabels;
    position?: number;
    content: Node[] | string;
};

export type Pattern = ('end' | 'char' | 'digit' | string)[];

export type InOutPattern = { open: Pattern; close: Pattern };

export type Segments = {
    labelled: [number, number][];
    plain: [number, number][];
    pad: { start: number; end: number };
};

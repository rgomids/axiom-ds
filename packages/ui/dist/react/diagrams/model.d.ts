import { MarkerType, type Edge, type Node } from '@xyflow/react';
export declare const kinds: readonly ["process", "decision", "agent", "database", "output"];
export type NodeKind = (typeof kinds)[number];
export type DiagramNode = Node<{
    label: string;
    description: string;
    kind: NodeKind;
}, 'axiom'>;
export type Graph = {
    nodes: DiagramNode[];
    edges: Edge[];
};
export declare const kindLabels: Record<NodeKind, string>;
export declare const edgeDefaults: {
    type: string;
    markerEnd: {
        type: MarkerType;
        width: number;
        height: number;
    };
};
export declare function arrange(graph: Graph, direction: 'TB' | 'LR'): Graph;
export declare function exampleGraph(): Graph;
export declare function serialize(graph: Graph): string;
export declare function parseDocument(source: string): Graph;

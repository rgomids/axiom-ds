import dagre from '@dagrejs/dagre';
import { MarkerType, type Edge, type Node } from '@xyflow/react';

export const kinds = ['process', 'decision', 'agent', 'database', 'output'] as const;
export type NodeKind = (typeof kinds)[number];
export type DiagramNode = Node<{ label: string; description: string; kind: NodeKind }, 'axiom'>;
export type Graph = { nodes: DiagramNode[]; edges: Edge[] };
export const kindLabels: Record<NodeKind, string> = {
  process: 'Processo',
  decision: 'Decisão',
  agent: 'Agente',
  database: 'Dados',
  output: 'Saída',
};
export const edgeDefaults = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
};

export function arrange(graph: Graph, direction: 'TB' | 'LR'): Graph {
  const layout = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  layout.setGraph({ rankdir: direction, nodesep: 64, ranksep: 72, marginx: 32, marginy: 32 });
  graph.nodes.forEach((node) => layout.setNode(node.id, { width: 208, height: 92 }));
  graph.edges.forEach((edge) => layout.setEdge(edge.source, edge.target));
  dagre.layout(layout);
  return {
    ...graph,
    nodes: graph.nodes.map((node) => {
      const position = layout.node(node.id);
      return { ...node, position: { x: position.x - 104, y: position.y - 46 } };
    }),
  };
}

const initialNodes: [string, NodeKind, string, string][] = [
  ['input', 'process', 'Receber solicitação', 'Evento de entrada'],
  ['context', 'database', 'Base de conhecimento', 'Contexto e evidências'],
  ['coordinator', 'agent', 'Coordenador Axiom', 'Distribuir tarefas'],
  ['decision', 'decision', 'Validar contexto', 'Definir o próximo passo'],
  ['analyst', 'agent', 'Agente analista', 'Investigar informações'],
  ['reviewer', 'agent', 'Agente revisor', 'Revisar evidências'],
  ['report', 'output', 'Consolidar relatório', 'Entrega da operação'],
];
export function exampleGraph(): Graph {
  return arrange(
    {
      nodes: initialNodes.map(([id, kind, label, description]) => ({
        id,
        type: 'axiom',
        position: { x: 0, y: 0 },
        data: { label, description, kind },
      })),
      edges: [
        ['input', 'coordinator', 'Solicitação'],
        ['context', 'coordinator', 'Contexto'],
        ['coordinator', 'decision', 'Plano'],
        ['decision', 'analyst', 'Análise'],
        ['decision', 'reviewer', 'Revisão'],
        ['analyst', 'report', ''],
        ['reviewer', 'report', ''],
      ].map(([source, target, label], i) => ({
        id: `edge-${i}`,
        source,
        target,
        label,
        ...edgeDefaults,
      })),
    },
    'TB',
  );
}

export function serialize(graph: Graph): string {
  return JSON.stringify(
    {
      version: 1,
      nodes: graph.nodes.map(({ id, position, data }) => ({ id, position, ...data })),
      edges: graph.edges.map(({ id, source, target, sourceHandle, targetHandle, label, type }) => ({
        id,
        source,
        target,
        sourceHandle,
        targetHandle,
        label: label || '',
        type: type || 'smoothstep',
      })),
    },
    null,
    2,
  );
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function shortText(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.length <= max;
}

// Only import the public document schema; never spread untrusted React Flow props.
export function parseDocument(source: string): Graph {
  if (source.length > 2_000_000) throw new Error('O arquivo excede o limite de 2 MB.');
  let data: unknown;
  try {
    data = JSON.parse(source);
  } catch {
    throw new Error('JSON inválido. Verifique vírgulas e aspas.');
  }
  if (
    !record(data) ||
    data.version !== 1 ||
    !Array.isArray(data.nodes) ||
    !Array.isArray(data.edges)
  ) {
    throw new Error('Informe version: 1 e as listas nodes e edges.');
  }
  if (data.nodes.length > 1000 || data.edges.length > 4000)
    throw new Error('Limite: 1.000 blocos e 4.000 conexões.');
  const ids = new Set<string>();
  const nodes: DiagramNode[] = data.nodes.map((node: unknown) => {
    if (
      !record(node) ||
      !shortText(node.id, 100) ||
      !node.id ||
      ids.has(node.id) ||
      !shortText(node.label, 120) ||
      !node.label.trim() ||
      !shortText(node.description, 200) ||
      !kinds.includes(node.kind as NodeKind) ||
      !record(node.position) ||
      typeof node.position.x !== 'number' ||
      typeof node.position.y !== 'number' ||
      !Number.isFinite(node.position.x) ||
      !Number.isFinite(node.position.y) ||
      Math.abs(node.position.x) > 1_000_000 ||
      Math.abs(node.position.y) > 1_000_000
    ) {
      throw new Error('Bloco inválido: verifique ID único, título, tipo e posição.');
    }
    ids.add(node.id);
    return {
      id: node.id,
      type: 'axiom',
      position: { x: node.position.x, y: node.position.y },
      data: { label: node.label, description: node.description, kind: node.kind as NodeKind },
    };
  });
  const edgeIds = new Set<string>();
  const edges: Edge[] = data.edges.map((edge: unknown) => {
    if (
      !record(edge) ||
      !shortText(edge.id, 100) ||
      !edge.id ||
      edgeIds.has(edge.id) ||
      typeof edge.source !== 'string' ||
      typeof edge.target !== 'string' ||
      !ids.has(edge.source) ||
      !ids.has(edge.target) ||
      !shortText(edge.label ?? '', 120) ||
      !['smoothstep', 'straight', 'default'].includes(String(edge.type ?? 'smoothstep')) ||
      ![undefined, null, 'out', 'right'].includes(edge.sourceHandle as string | undefined | null) ||
      ![undefined, null, 'in', 'left'].includes(edge.targetHandle as string | undefined | null)
    ) {
      throw new Error('Conexão inválida: verifique os blocos de origem e destino.');
    }
    edgeIds.add(edge.id);
    return {
      ...edgeDefaults,
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: (edge.label ?? '') as string,
      type: (edge.type ?? 'smoothstep') as string,
      sourceHandle: edge.sourceHandle as string | undefined,
      targetHandle: edge.targetHandle as string | undefined,
    };
  });
  return { nodes, edges };
}

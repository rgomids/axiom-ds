import { describe, expect, it } from 'vitest';
import {
  arrange,
  exampleGraph,
  parseDocument,
  serialize,
} from '../../packages/ui/src/diagrams/model';

describe('diagram document', () => {
  it('round trips a graph with branches, merges and port assignments', () => {
    const graph = exampleGraph();
    graph.edges[0].sourceHandle = 'right';
    graph.edges[0].targetHandle = 'left';
    const restored = parseDocument(serialize(graph));
    expect(restored.nodes.map((n) => n.data)).toEqual(graph.nodes.map((n) => n.data));
    expect(restored.edges[0].sourceHandle).toBe('right');
    expect(restored.edges.filter((e) => e.source === 'decision')).toHaveLength(2);
    expect(restored.edges.filter((e) => e.target === 'report')).toHaveLength(2);
    expect(serialize(restored)).toBe(serialize(graph));
  });
  it('rejects duplicate IDs, dangling edges and invalid positions', () => {
    const doc = JSON.parse(serialize(exampleGraph()));
    doc.nodes.push(doc.nodes[0]);
    expect(() => parseDocument(JSON.stringify(doc))).toThrow(/Bloco inválido/);
    doc.nodes.pop();
    doc.edges[0].target = 'missing';
    expect(() => parseDocument(JSON.stringify(doc))).toThrow(/Conexão inválida/);
    doc.edges = [];
    doc.nodes[0].position.x = null;
    expect(() => parseDocument(JSON.stringify(doc))).toThrow(/Bloco inválido/);
  });
  it('whitelists document fields and refuses unknown handles and versions', () => {
    const doc = JSON.parse(serialize(exampleGraph()));
    doc.nodes[0].style = { display: 'none' };
    doc.nodes[0].type = 'unexpected';
    const parsed = parseDocument(JSON.stringify(doc));
    expect(parsed.nodes[0].style).toBeUndefined();
    expect(parsed.nodes[0].type).toBe('axiom');
    doc.edges[0].sourceHandle = 'missing';
    expect(() => parseDocument(JSON.stringify(doc))).toThrow();
    doc.version = 2;
    expect(() => parseDocument(JSON.stringify(doc))).toThrow(/version/);
    expect(() => parseDocument('{')).toThrow(/JSON inválido/);
  });
  it('lays out graphs in either direction without discarding edges', () => {
    const graph = exampleGraph();
    const horizontal = arrange(graph, 'LR');
    const input = horizontal.nodes.find((n) => n.id === 'input')!;
    const report = horizontal.nodes.find((n) => n.id === 'report')!;
    expect(report.position.x).toBeGreaterThan(input.position.x);
    expect(horizontal.edges).toEqual(graph.edges);
    expect(arrange({ nodes: [], edges: [] }, 'TB')).toEqual({ nodes: [], edges: [] });
  });
});

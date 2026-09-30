'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  useViewport,
  type Connection,
  type Edge,
} from '@xyflow/react';
import { Tabs, Tooltip } from 'radix-ui';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  Copy,
  Download,
  Hand,
  Layers,
  LayoutGrid,
  Lightbulb,
  LightbulbOff,
  Link2,
  Maximize,
  MousePointer2,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Redo2,
  Scan,
  Settings2,
  Trash2,
  Undo2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { DiagramNodeView, DiagramToggle, kindIcons, ToolButton } from './components';
import {
  arrange,
  edgeDefaults,
  exampleGraph,
  kindLabels,
  kinds,
  parseDocument,
  serialize,
  type DiagramNode,
  type Graph,
  type NodeKind,
} from './model';
import '@xyflow/react/dist/style.css';
import './styles.css';

const nodeTypes = { axiom: DiagramNodeView };
const STORAGE = 'axiom-diagram-v1';
function loadGraph(persist: boolean) {
  try {
    const saved = persist && localStorage.getItem(STORAGE);
    if (saved) return parseDocument(saved);
  } catch {
    /* Keep the example available when browser storage is unavailable. */
  }
  return exampleGraph();
}

export type DiagramEditorProps = {
  initialTheme?: 'light' | 'dark';
  persist?: boolean;
  brandSrc?: string;
};

export function DiagramEditor(props: DiagramEditorProps) {
  return (
    <Tooltip.Provider delayDuration={300}>
      <ReactFlowProvider>
        <Editor {...props} />
      </ReactFlowProvider>
    </Tooltip.Provider>
  );
}

function Editor({ initialTheme = 'light', persist = false, brandSrc }: DiagramEditorProps) {
  const [graph, setGraph] = useState<Graph>(() => loadGraph(persist));
  const [theme, setTheme] = useState(initialTheme);
  const [panel, setPanel] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(max-width: 700px)').matches,
  );
  const [tab, setTab] = useState<'code' | 'layers'>('code');
  const [auto, setAuto] = useState(true);
  const [grid, setGrid] = useState(true);
  const [snap, setSnap] = useState(false);
  const [minimap, setMinimap] = useState(false);
  const [settings, setSettings] = useState(false);
  const [mode, setMode] = useState<'select' | 'pan'>('select');
  const [direction, setDirection] = useState<'TB' | 'LR'>('TB');
  const [edgeType, setEdgeType] = useState('smoothstep');
  const [connectionTarget, setConnectionTarget] = useState('');
  const [draft, setDraft] = useState(() => serialize(graph));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(persist ? 'Salvo neste navegador' : 'Diagrama de exemplo');
  const [historyVersion, setHistoryVersion] = useState(0);
  const history = useRef<{ past: Graph[]; future: Graph[] }>({ past: [], future: [] });
  const graphRef = useRef(graph);
  const flow = useReactFlow<DiagramNode>();
  const viewport = useViewport();
  const canvasRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const selected = graph.nodes.find((node) => node.selected);
  const selectedEdge = graph.edges.find((edge) => edge.selected);
  const selectionCount =
    graph.nodes.filter((n) => n.selected).length + graph.edges.filter((e) => e.selected).length;

  useEffect(() => {
    graphRef.current = graph;
  }, [graph]);
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);
  useEffect(() => {
    if (!dirty) setDraft(serialize(graph));
  }, [graph, dirty]);
  useEffect(() => {
    if (!persist) return;
    try {
      localStorage.setItem(STORAGE, serialize(graph));
      setStatus('Salvo neste navegador');
    } catch {
      setStatus('Não foi possível salvar. Exporte uma cópia.');
    }
  }, [graph, persist]);

  function checkpoint() {
    history.current.past = [...history.current.past.slice(-79), graphRef.current];
    history.current.future = [];
    setHistoryVersion((v) => v + 1);
  }
  function commit(next: Graph) {
    checkpoint();
    graphRef.current = next;
    setGraph(next);
    setDirty(false);
    setError('');
  }
  function travel(back: boolean) {
    const from = back ? history.current.past : history.current.future;
    const to = back ? history.current.future : history.current.past;
    const next = from.pop();
    if (!next) return;
    to.push(graphRef.current);
    graphRef.current = next;
    setGraph(next);
    setDirty(false);
    setError('');
    setHistoryVersion((v) => v + 1);
  }
  function applyDraft() {
    try {
      commit(parseDocument(draft));
    } catch (issue) {
      setError((issue as Error).message);
    }
  }
  useEffect(() => {
    if (!auto || !dirty) return;
    const timeout = window.setTimeout(() => {
      try {
        const next = parseDocument(draft);
        history.current.past = [...history.current.past.slice(-79), graphRef.current];
        history.current.future = [];
        graphRef.current = next;
        setGraph(next);
        setDirty(false);
        setError('');
        setHistoryVersion((v) => v + 1);
      } catch (issue) {
        setError((issue as Error).message);
      }
    }, 650);
    return () => window.clearTimeout(timeout);
  }, [draft, dirty, auto]);

  function create(kind: NodeKind) {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const position = flow.screenToFlowPosition({
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    });
    const offset =
      graph.nodes.filter((n) => Math.abs(n.position.x - (position.x - 104)) < 40).length * 24;
    const node: DiagramNode = {
      id: crypto.randomUUID(),
      type: 'axiom',
      selected: true,
      position: { x: position.x - 104 + offset, y: position.y - 46 + offset },
      data: {
        kind,
        label: `Novo ${kindLabels[kind].toLowerCase()}`,
        description: 'Etapa do fluxo',
      },
    };
    commit({
      nodes: [...graph.nodes.map((n) => ({ ...n, selected: false })), node],
      edges: graph.edges.map((e) => ({ ...e, selected: false })),
    });
    setPanel(true);
  }
  function removeSelected() {
    const ids = new Set(graph.nodes.filter((n) => n.selected).map((n) => n.id));
    commit({
      nodes: graph.nodes.filter((n) => !n.selected),
      edges: graph.edges.filter((e) => !e.selected && !ids.has(e.source) && !ids.has(e.target)),
    });
  }
  function duplicate() {
    if (!selected) return;
    commit({
      ...graph,
      nodes: [
        ...graph.nodes.map((n) => ({ ...n, selected: false })),
        {
          ...selected,
          id: crypto.randomUUID(),
          selected: true,
          position: { x: selected.position.x + 48, y: selected.position.y + 120 },
          data: { ...selected.data, label: `${selected.data.label.slice(0, 112)} (cópia)` },
        },
      ],
    });
  }
  function connect(connection: Connection) {
    commit({
      ...graph,
      edges: addEdge({ ...connection, ...edgeDefaults, type: edgeType }, graph.edges),
    });
  }
  function layout(nextDirection = direction) {
    setDirection(nextDirection);
    commit(
      arrange(
        {
          ...graph,
          edges: graph.edges.map((e) => ({
            ...e,
            sourceHandle: nextDirection === 'TB' ? 'out' : 'right',
            targetHandle: nextDirection === 'TB' ? 'in' : 'left',
          })),
        },
        nextDirection,
      ),
    );
    window.requestAnimationFrame(() => void flow.fitView({ padding: 0.22, duration: 250 }));
  }
  function exportFile() {
    const href = URL.createObjectURL(new Blob([serialize(graph)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = href;
    link.download = 'axiom-diagrama.json';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(href), 1000);
    setStatus('Diagrama exportado');
  }
  function shortcuts(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('input, textarea, select, [role="switch"]')) return;
    if (event.ctrlKey || event.metaKey) {
      if (event.key.toLowerCase() === 'z') {
        event.preventDefault();
        travel(!event.shiftKey);
      }
      if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        exportFile();
      }
      if (event.key.toLowerCase() === 'd' && selected) {
        event.preventDefault();
        duplicate();
      }
    }
    if (event.key === 'Escape') {
      setSettings(false);
      setGraph((g) => ({
        nodes: g.nodes.map((n) => ({ ...n, selected: false })),
        edges: g.edges.map((e) => ({ ...e, selected: false })),
      }));
    }
  }

  return (
    <div
      ref={shellRef}
      className="dg-app"
      data-theme={theme}
      onKeyDown={shortcuts}
      data-history={historyVersion}
    >
      <header className="dg-header">
        <a className="dg-brand" href="../resources.html" aria-label="Axiom Design System">
          {brandSrc && <img src={brandSrc} alt="" />}
          <span>
            AXIOM<small>DIAGRAMAS</small>
          </span>
        </a>
        <span className="dg-header-divider" />
        <div className="dg-document-title">
          <strong>Orquestração de agentes</strong>
          <span>Workspace / Diagramas</span>
        </div>
        <div className="dg-header-actions">
          <a className="dg-catalog-link" href="diagram-kit.html">
            <LayoutGrid size={15} />
            Componentes
          </a>
          <ToolButton
            label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Lightbulb /> : <LightbulbOff />}
          </ToolButton>
          <ToolButton label="Importar diagrama" onClick={() => fileRef.current?.click()}>
            <Upload />
          </ToolButton>
          <button className="dg-button dg-primary" onClick={exportFile}>
            <Download size={15} />
            <span>Exportar</span>
          </button>
        </div>
        <input
          ref={fileRef}
          className="dg-hidden"
          type="file"
          accept=".json,application/json"
          aria-label="Arquivo de diagrama"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            try {
              if (file.size > 2_000_000) throw new Error('O arquivo excede o limite de 2 MB.');
              commit(parseDocument(await file.text()));
              window.requestAnimationFrame(() => void flow.fitView({ padding: 0.2 }));
            } catch (issue) {
              setError((issue as Error).message);
              setPanel(true);
            }
            event.target.value = '';
          }}
        />
      </header>
      <div className="dg-workspace" data-panel={panel}>
        {panel && (
          <Tabs.Root
            value={tab}
            onValueChange={(value) => setTab(value as 'code' | 'layers')}
            asChild
          >
            <aside className="dg-sidebar" aria-label="Editor do diagrama">
              <div className="dg-panel-header">
                <Tabs.List className="dg-tabs" aria-label="Painel de edição">
                  <Tabs.Trigger value="code">
                    <Code2 size={15} />
                    Código
                  </Tabs.Trigger>
                  <Tabs.Trigger value="layers">
                    <Layers size={15} />
                    Camadas
                  </Tabs.Trigger>
                </Tabs.List>
                <ToolButton label="Recolher painel" onClick={() => setPanel(false)}>
                  <PanelLeftClose />
                </ToolButton>
              </div>
              {tab === 'code' ? (
                <Tabs.Content className="dg-code-panel" value="code">
                  <div className="dg-code-meta">
                    <span>fluxo.axiom.json</span>
                    <DiagramToggle label="Auto" checked={auto} onChange={setAuto} />
                  </div>
                  <div className="dg-code-editor">
                    <div ref={linesRef} className="dg-line-numbers" aria-hidden="true">
                      {draft.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <textarea
                      ref={codeRef}
                      spellCheck={false}
                      aria-label="Código JSON do diagrama"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'dg-error' : undefined}
                      value={draft}
                      onScroll={() => {
                        if (linesRef.current && codeRef.current)
                          linesRef.current.scrollTop = codeRef.current.scrollTop;
                      }}
                      onChange={(e) => {
                        setDraft(e.target.value);
                        setDirty(true);
                        setError('');
                      }}
                    />
                  </div>
                  <div className="dg-code-footer">
                    <span>JSON</span>
                    <span>UTF-8</span>
                    <button className="dg-text-button" disabled={!dirty} onClick={applyDraft}>
                      Aplicar
                    </button>
                  </div>
                </Tabs.Content>
              ) : (
                <Tabs.Content className="dg-layer-list" value="layers">
                  {graph.nodes.map((node) => {
                    const Icon = kindIcons[node.data.kind];
                    return (
                      <button
                        key={node.id}
                        aria-pressed={!!node.selected}
                        onClick={() => {
                          setGraph((g) => ({
                            nodes: g.nodes.map((n) => ({ ...n, selected: n.id === node.id })),
                            edges: g.edges.map((e) => ({ ...e, selected: false })),
                          }));
                          void flow.fitView({ nodes: [node], maxZoom: 1.1, duration: 200 });
                        }}
                      >
                        <Icon size={16} />
                        <span>
                          {node.data.label}
                          <small>{kindLabels[node.data.kind]}</small>
                        </span>
                      </button>
                    );
                  })}
                  {!graph.nodes.length && <p className="dg-empty">Nenhum bloco no diagrama.</p>}
                </Tabs.Content>
              )}
              {error && (
                <p role="alert" id="dg-error" className="dg-error">
                  {error}
                </p>
              )}
              <section className="dg-properties" aria-label="Propriedades">
                <div className="dg-section-label">
                  <span>PROPRIEDADES</span>
                  {selected ? (
                    <span>{kindLabels[selected.data.kind]}</span>
                  ) : selectedEdge ? (
                    <span>Conexão</span>
                  ) : (
                    <span>Diagrama</span>
                  )}
                </div>
                {selected ? (
                  <>
                    <label>
                      Título
                      <input
                        maxLength={120}
                        value={selected.data.label}
                        onChange={(e) => {
                          if (!e.target.value.trim()) return;
                          commit({
                            ...graph,
                            nodes: graph.nodes.map((n) =>
                              n.id === selected.id
                                ? { ...n, data: { ...n.data, label: e.target.value } }
                                : n,
                            ),
                          });
                        }}
                      />
                    </label>
                    <label>
                      Descrição
                      <input
                        maxLength={200}
                        value={selected.data.description}
                        onChange={(e) =>
                          commit({
                            ...graph,
                            nodes: graph.nodes.map((n) =>
                              n.id === selected.id
                                ? { ...n, data: { ...n.data, description: e.target.value } }
                                : n,
                            ),
                          })
                        }
                      />
                    </label>
                    <div className="dg-row">
                      <label>
                        Tipo
                        <select
                          aria-label="Tipo do bloco"
                          value={selected.data.kind}
                          onChange={(e) =>
                            commit({
                              ...graph,
                              nodes: graph.nodes.map((n) =>
                                n.id === selected.id
                                  ? { ...n, data: { ...n.data, kind: e.target.value as NodeKind } }
                                  : n,
                              ),
                            })
                          }
                        >
                          {kinds.map((kind) => (
                            <option key={kind} value={kind}>
                              {kindLabels[kind]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <ToolButton label="Duplicar bloco" onClick={duplicate}>
                        <Copy />
                      </ToolButton>
                      <ToolButton label="Excluir seleção" onClick={removeSelected}>
                        <Trash2 />
                      </ToolButton>
                    </div>
                    <div className="dg-row dg-connect-row">
                      <label>
                        Conectar a
                        <select
                          aria-label="Conectar a"
                          value={connectionTarget}
                          onChange={(event) => setConnectionTarget(event.target.value)}
                        >
                          <option value="">Selecionar destino</option>
                          {graph.nodes
                            .filter((node) => node.id !== selected.id)
                            .map((node) => (
                              <option key={node.id} value={node.id}>
                                {node.data.label}
                              </option>
                            ))}
                        </select>
                      </label>
                      <ToolButton
                        label="Criar conexão"
                        disabled={
                          !connectionTarget ||
                          connectionTarget === selected.id ||
                          !graph.nodes.some((node) => node.id === connectionTarget)
                        }
                        onClick={() => {
                          connect({
                            source: selected.id,
                            target: connectionTarget,
                            sourceHandle: direction === 'TB' ? 'out' : 'right',
                            targetHandle: direction === 'TB' ? 'in' : 'left',
                          });
                          setConnectionTarget('');
                        }}
                      >
                        <Link2 />
                      </ToolButton>
                    </div>
                  </>
                ) : selectedEdge ? (
                  <>
                    <label>
                      Rótulo da conexão
                      <input
                        maxLength={120}
                        value={String(selectedEdge.label || '')}
                        onChange={(e) =>
                          commit({
                            ...graph,
                            edges: graph.edges.map((edge) =>
                              edge.id === selectedEdge.id
                                ? { ...edge, label: e.target.value }
                                : edge,
                            ),
                          })
                        }
                      />
                    </label>
                    <label>
                      Traçado
                      <select
                        aria-label="Traçado da conexão"
                        value={selectedEdge.type}
                        onChange={(e) =>
                          commit({
                            ...graph,
                            edges: graph.edges.map((edge) =>
                              edge.id === selectedEdge.id
                                ? { ...edge, type: e.target.value }
                                : edge,
                            ),
                          })
                        }
                      >
                        <option value="smoothstep">Ortogonal</option>
                        <option value="default">Curvo</option>
                        <option value="straight">Reto</option>
                      </select>
                    </label>
                    <button className="dg-button" onClick={removeSelected}>
                      <Trash2 size={14} />
                      Excluir conexão
                    </button>
                  </>
                ) : (
                  <>
                    <div className="dg-document-stats">
                      <span>
                        <strong>{graph.nodes.length}</strong> blocos
                      </span>
                      <span>
                        <strong>{graph.edges.length}</strong> conexões
                      </span>
                    </div>
                    <DiagramToggle label="Encaixar na grade" checked={snap} onChange={setSnap} />
                    <DiagramToggle label="Minimapa" checked={minimap} onChange={setMinimap} />
                  </>
                )}
              </section>
            </aside>
          </Tabs.Root>
        )}
        <main className="dg-canvas" ref={canvasRef} aria-label="Área de criação de diagramas">
          <div className="dg-canvas-header">
            <div className="dg-row">
              {!panel && (
                <ToolButton label="Abrir painel" onClick={() => setPanel(true)}>
                  <PanelLeftOpen />
                </ToolButton>
              )}
              <span className="dg-canvas-name">Fluxo de operação</span>
            </div>
            <div className="dg-row dg-canvas-options">
              <label className="dg-inline-select">
                <span className="dg-sr-only">Direção do fluxo</span>
                {direction === 'TB' ? <ArrowDown size={14} /> : <ArrowRight size={14} />}
                <select
                  aria-label="Direção do fluxo"
                  value={direction}
                  onChange={(e) => layout(e.target.value as 'TB' | 'LR')}
                >
                  <option value="TB">Vertical</option>
                  <option value="LR">Horizontal</option>
                </select>
              </label>
              <ToolButton label="Organizar diagrama" onClick={() => layout()}>
                <LayoutGrid />
              </ToolButton>
              <ToolButton
                label="Opções de visualização"
                active={settings}
                onClick={() => setSettings(!settings)}
              >
                <Settings2 />
              </ToolButton>
            </div>
          </div>
          {settings && (
            <div className="dg-settings">
              <div className="dg-row">
                <strong>Visualização</strong>
                <ToolButton label="Fechar opções" onClick={() => setSettings(false)}>
                  <X />
                </ToolButton>
              </div>
              <DiagramToggle label="Grade de pontos" checked={grid} onChange={setGrid} />
              <DiagramToggle label="Encaixar na grade" checked={snap} onChange={setSnap} />
              <DiagramToggle label="Minimapa" checked={minimap} onChange={setMinimap} />
              <label>
                Novas conexões
                <select
                  aria-label="Novas conexões"
                  value={edgeType}
                  onChange={(e) => setEdgeType(e.target.value)}
                >
                  <option value="smoothstep">Ortogonal</option>
                  <option value="default">Curva</option>
                  <option value="straight">Reta</option>
                </select>
              </label>
            </div>
          )}
          <div className="dg-flow-surface">
            <ReactFlow<DiagramNode, Edge>
              nodes={graph.nodes}
              edges={graph.edges}
              nodeTypes={nodeTypes}
              onNodesChange={(changes) =>
                setGraph((g) => ({ ...g, nodes: applyNodeChanges(changes, g.nodes) }))
              }
              onEdgesChange={(changes) =>
                setGraph((g) => ({ ...g, edges: applyEdgeChanges(changes, g.edges) }))
              }
              onConnect={connect}
              onNodeDragStart={checkpoint}
              onBeforeDelete={async () => {
                checkpoint();
                return true;
              }}
              defaultEdgeOptions={edgeDefaults}
              fitView
              fitViewOptions={{ padding: 0.17, maxZoom: 1 }}
              minZoom={0.05}
              maxZoom={4}
              snapToGrid={snap}
              snapGrid={[16, 16]}
              panOnDrag={mode === 'pan' ? true : [1, 2]}
              selectionOnDrag={mode === 'select'}
              nodesDraggable={mode === 'select'}
              panOnScroll
              colorMode={theme}
              deleteKeyCode={['Backspace', 'Delete']}
              onlyRenderVisibleElements
              ariaLabelConfig={{
                'minimap.ariaLabel': 'Minimapa do diagrama',
                'node.a11yDescription.default':
                  'Use as setas para mover. Delete exclui o bloco. Escape cancela a seleção.',
                'edge.a11yDescription.default':
                  'Delete exclui a conexão. Escape cancela a seleção.',
              }}
            >
              {grid && <Background variant={BackgroundVariant.Dots} gap={24} size={1} />}
              {minimap && <MiniMap pannable zoomable position="bottom-right" />}
            </ReactFlow>
          </div>
          <div className="dg-tool-rail" role="toolbar" aria-label="Ferramentas do diagrama">
            <ToolButton
              label="Selecionar"
              active={mode === 'select'}
              onClick={() => setMode('select')}
            >
              <MousePointer2 />
            </ToolButton>
            <ToolButton label="Mover área" active={mode === 'pan'} onClick={() => setMode('pan')}>
              <Hand />
            </ToolButton>
            <hr />
            {kinds.map((kind) => {
              const Icon = kindIcons[kind];
              return (
                <ToolButton
                  key={kind}
                  label={`Adicionar ${kindLabels[kind].toLowerCase()}`}
                  onClick={() => create(kind)}
                >
                  <Icon />
                </ToolButton>
              );
            })}
            <hr />
            <ToolButton
              label="Excluir selecionados"
              disabled={!selectionCount}
              onClick={removeSelected}
            >
              <Trash2 />
            </ToolButton>
          </div>
          <div className="dg-history-tools" role="toolbar" aria-label="Histórico">
            <ToolButton
              label="Desfazer"
              disabled={!history.current.past.length}
              onClick={() => travel(true)}
            >
              <Undo2 />
            </ToolButton>
            <ToolButton
              label="Refazer"
              disabled={!history.current.future.length}
              onClick={() => travel(false)}
            >
              <Redo2 />
            </ToolButton>
          </div>
          <div className="dg-zoom-tools" role="toolbar" aria-label="Zoom">
            <ToolButton
              label="Diminuir zoom"
              disabled={viewport.zoom <= 0.0501}
              onClick={() => void flow.zoomTo(Math.max(0.05, viewport.zoom / 1.35))}
            >
              <ZoomOut />
            </ToolButton>
            <button
              className="dg-zoom-value"
              aria-label="Restaurar zoom para 100%"
              onClick={() => void flow.zoomTo(1)}
            >
              {Math.round(viewport.zoom * 100)}%
            </button>
            <ToolButton
              label="Aumentar zoom"
              disabled={viewport.zoom >= 3.999}
              onClick={() => void flow.zoomTo(Math.min(4, viewport.zoom * 1.35))}
            >
              <ZoomIn />
            </ToolButton>
            <span className="dg-divider" />
            <ToolButton
              label="Enquadrar diagrama"
              onClick={() =>
                void flow.fitView({ padding: 0.2, minZoom: 0.05, maxZoom: 1.2, duration: 200 })
              }
            >
              <Scan />
            </ToolButton>
            <ToolButton
              label="Tela cheia"
              onClick={() => {
                const request = document.fullscreenElement
                  ? document.exitFullscreen()
                  : shellRef.current?.requestFullscreen();
                void request?.catch(() => setStatus('Tela cheia indisponível neste navegador.'));
              }}
            >
              <Maximize />
            </ToolButton>
          </div>
          {!graph.nodes.length && (
            <div className="dg-canvas-empty">
              <Layers size={28} />
              <h2>Diagrama vazio</h2>
              <button className="dg-button" onClick={() => create('process')}>
                <Plus size={16} />
                Adicionar processo
              </button>
            </div>
          )}
        </main>
      </div>
      <footer className="dg-statusbar">
        <span role="status">
          <Check size={13} />
          {dirty ? 'Alterações no código pendentes' : status}
        </span>
        <span>
          {graph.nodes.length} blocos<span className="dg-status-dot">·</span>
          {graph.edges.length} conexões
        </span>
        <span>
          Axiom Diagram Kit <span className="dg-status-dot">/</span> 0.1
        </span>
      </footer>
    </div>
  );
}

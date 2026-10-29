'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { ReactFlow, ReactFlowProvider, Background, BackgroundVariant, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow, useViewport, } from '@xyflow/react';
import { Tabs, Tooltip } from 'radix-ui';
import { ArrowDown, ArrowRight, Check, Code2, Copy, Download, Hand, Layers, LayoutGrid, Lightbulb, LightbulbOff, Link2, Maximize, MousePointer2, PanelLeftClose, PanelLeftOpen, Plus, Redo2, Scan, Settings2, Trash2, Undo2, Upload, X, ZoomIn, ZoomOut, } from 'lucide-react';
import { DiagramNodeView, DiagramToggle, kindIcons, ToolButton } from './components';
import { arrange, edgeDefaults, exampleGraph, kindLabels, kinds, parseDocument, serialize, } from './model';
import '@xyflow/react/dist/style.css';
import './styles.css';
const nodeTypes = { axiom: DiagramNodeView };
const STORAGE = 'axiom-diagram-v1';
function loadGraph(persist) {
    try {
        const saved = persist && localStorage.getItem(STORAGE);
        if (saved)
            return parseDocument(saved);
    }
    catch {
        /* Keep the example available when browser storage is unavailable. */
    }
    return exampleGraph();
}
export function DiagramEditor(props) {
    return (_jsx(Tooltip.Provider, { delayDuration: 300, children: _jsx(ReactFlowProvider, { children: _jsx(Editor, { ...props }) }) }));
}
function Editor({ initialTheme = 'light', persist = false, brandSrc }) {
    const [graph, setGraph] = useState(() => loadGraph(persist));
    const [theme, setTheme] = useState(initialTheme);
    const [panel, setPanel] = useState(() => typeof window === 'undefined' || !window.matchMedia('(max-width: 700px)').matches);
    const [tab, setTab] = useState('code');
    const [auto, setAuto] = useState(true);
    const [grid, setGrid] = useState(true);
    const [snap, setSnap] = useState(false);
    const [minimap, setMinimap] = useState(false);
    const [settings, setSettings] = useState(false);
    const [mode, setMode] = useState('select');
    const [direction, setDirection] = useState('TB');
    const [edgeType, setEdgeType] = useState('smoothstep');
    const [connectionTarget, setConnectionTarget] = useState('');
    const [draft, setDraft] = useState(() => serialize(graph));
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState(persist ? 'Salvo neste navegador' : 'Diagrama de exemplo');
    const [historyVersion, setHistoryVersion] = useState(0);
    const history = useRef({ past: [], future: [] });
    const graphRef = useRef(graph);
    const flow = useReactFlow();
    const viewport = useViewport();
    const canvasRef = useRef(null);
    const shellRef = useRef(null);
    const fileRef = useRef(null);
    const codeRef = useRef(null);
    const linesRef = useRef(null);
    const selected = graph.nodes.find((node) => node.selected);
    const selectedEdge = graph.edges.find((edge) => edge.selected);
    const selectionCount = graph.nodes.filter((n) => n.selected).length + graph.edges.filter((e) => e.selected).length;
    useEffect(() => {
        graphRef.current = graph;
    }, [graph]);
    useEffect(() => {
        setTheme(initialTheme);
    }, [initialTheme]);
    useEffect(() => {
        if (!dirty)
            setDraft(serialize(graph));
    }, [graph, dirty]);
    useEffect(() => {
        if (!persist)
            return;
        try {
            localStorage.setItem(STORAGE, serialize(graph));
            setStatus('Salvo neste navegador');
        }
        catch {
            setStatus('Não foi possível salvar. Exporte uma cópia.');
        }
    }, [graph, persist]);
    function checkpoint() {
        history.current.past = [...history.current.past.slice(-79), graphRef.current];
        history.current.future = [];
        setHistoryVersion((v) => v + 1);
    }
    function commit(next) {
        checkpoint();
        graphRef.current = next;
        setGraph(next);
        setDirty(false);
        setError('');
    }
    function travel(back) {
        const from = back ? history.current.past : history.current.future;
        const to = back ? history.current.future : history.current.past;
        const next = from.pop();
        if (!next)
            return;
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
        }
        catch (issue) {
            setError(issue.message);
        }
    }
    useEffect(() => {
        if (!auto || !dirty)
            return;
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
            }
            catch (issue) {
                setError(issue.message);
            }
        }, 650);
        return () => window.clearTimeout(timeout);
    }, [draft, dirty, auto]);
    function create(kind) {
        const bounds = canvasRef.current?.getBoundingClientRect();
        if (!bounds)
            return;
        const position = flow.screenToFlowPosition({
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
        });
        const offset = graph.nodes.filter((n) => Math.abs(n.position.x - (position.x - 104)) < 40).length * 24;
        const node = {
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
        if (!selected)
            return;
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
    function connect(connection) {
        commit({
            ...graph,
            edges: addEdge({ ...connection, ...edgeDefaults, type: edgeType }, graph.edges),
        });
    }
    function layout(nextDirection = direction) {
        setDirection(nextDirection);
        commit(arrange({
            ...graph,
            edges: graph.edges.map((e) => ({
                ...e,
                sourceHandle: nextDirection === 'TB' ? 'out' : 'right',
                targetHandle: nextDirection === 'TB' ? 'in' : 'left',
            })),
        }, nextDirection));
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
    function shortcuts(event) {
        if (event.target.closest('input, textarea, select, [role="switch"]'))
            return;
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
    return (_jsxs("div", { ref: shellRef, className: "dg-app", "data-theme": theme, onKeyDown: shortcuts, "data-history": historyVersion, children: [_jsxs("header", { className: "dg-header", children: [_jsxs("a", { className: "dg-brand", href: "../resources.html", "aria-label": "Axiom Design System", children: [brandSrc && _jsx("img", { src: brandSrc, alt: "" }), _jsxs("span", { children: ["AXIOM", _jsx("small", { children: "DIAGRAMAS" })] })] }), _jsx("span", { className: "dg-header-divider" }), _jsxs("div", { className: "dg-document-title", children: [_jsx("strong", { children: "Orquestra\u00E7\u00E3o de agentes" }), _jsx("span", { children: "Workspace / Diagramas" })] }), _jsxs("div", { className: "dg-header-actions", children: [_jsxs("a", { className: "dg-catalog-link", href: "diagram-kit.html", children: [_jsx(LayoutGrid, { size: 15 }), "Componentes"] }), _jsx(ToolButton, { label: theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro', onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'), children: theme === 'light' ? _jsx(Lightbulb, {}) : _jsx(LightbulbOff, {}) }), _jsx(ToolButton, { label: "Importar diagrama", onClick: () => fileRef.current?.click(), children: _jsx(Upload, {}) }), _jsxs("button", { className: "dg-button dg-primary", onClick: exportFile, children: [_jsx(Download, { size: 15 }), _jsx("span", { children: "Exportar" })] })] }), _jsx("input", { ref: fileRef, className: "dg-hidden", type: "file", accept: ".json,application/json", "aria-label": "Arquivo de diagrama", onChange: async (event) => {
                            const file = event.target.files?.[0];
                            if (!file)
                                return;
                            try {
                                if (file.size > 2_000_000)
                                    throw new Error('O arquivo excede o limite de 2 MB.');
                                commit(parseDocument(await file.text()));
                                window.requestAnimationFrame(() => void flow.fitView({ padding: 0.2 }));
                            }
                            catch (issue) {
                                setError(issue.message);
                                setPanel(true);
                            }
                            event.target.value = '';
                        } })] }), _jsxs("div", { className: "dg-workspace", "data-panel": panel, children: [panel && (_jsx(Tabs.Root, { value: tab, onValueChange: (value) => setTab(value), asChild: true, children: _jsxs("aside", { className: "dg-sidebar", "aria-label": "Editor do diagrama", children: [_jsxs("div", { className: "dg-panel-header", children: [_jsxs(Tabs.List, { className: "dg-tabs", "aria-label": "Painel de edi\u00E7\u00E3o", children: [_jsxs(Tabs.Trigger, { value: "code", children: [_jsx(Code2, { size: 15 }), "C\u00F3digo"] }), _jsxs(Tabs.Trigger, { value: "layers", children: [_jsx(Layers, { size: 15 }), "Camadas"] })] }), _jsx(ToolButton, { label: "Recolher painel", onClick: () => setPanel(false), children: _jsx(PanelLeftClose, {}) })] }), tab === 'code' ? (_jsxs(Tabs.Content, { className: "dg-code-panel", value: "code", children: [_jsxs("div", { className: "dg-code-meta", children: [_jsx("span", { children: "fluxo.axiom.json" }), _jsx(DiagramToggle, { label: "Auto", checked: auto, onChange: setAuto })] }), _jsxs("div", { className: "dg-code-editor", children: [_jsx("div", { ref: linesRef, className: "dg-line-numbers", "aria-hidden": "true", children: draft.split('\n').map((_, i) => (_jsx("div", { children: i + 1 }, i))) }), _jsx("textarea", { ref: codeRef, spellCheck: false, "aria-label": "C\u00F3digo JSON do diagrama", "aria-invalid": !!error, "aria-describedby": error ? 'dg-error' : undefined, value: draft, onScroll: () => {
                                                        if (linesRef.current && codeRef.current)
                                                            linesRef.current.scrollTop = codeRef.current.scrollTop;
                                                    }, onChange: (e) => {
                                                        setDraft(e.target.value);
                                                        setDirty(true);
                                                        setError('');
                                                    } })] }), _jsxs("div", { className: "dg-code-footer", children: [_jsx("span", { children: "JSON" }), _jsx("span", { children: "UTF-8" }), _jsx("button", { className: "dg-text-button", disabled: !dirty, onClick: applyDraft, children: "Aplicar" })] })] })) : (_jsxs(Tabs.Content, { className: "dg-layer-list", value: "layers", children: [graph.nodes.map((node) => {
                                            const Icon = kindIcons[node.data.kind];
                                            return (_jsxs("button", { "aria-pressed": !!node.selected, onClick: () => {
                                                    setGraph((g) => ({
                                                        nodes: g.nodes.map((n) => ({ ...n, selected: n.id === node.id })),
                                                        edges: g.edges.map((e) => ({ ...e, selected: false })),
                                                    }));
                                                    void flow.fitView({ nodes: [node], maxZoom: 1.1, duration: 200 });
                                                }, children: [_jsx(Icon, { size: 16 }), _jsxs("span", { children: [node.data.label, _jsx("small", { children: kindLabels[node.data.kind] })] })] }, node.id));
                                        }), !graph.nodes.length && _jsx("p", { className: "dg-empty", children: "Nenhum bloco no diagrama." })] })), error && (_jsx("p", { role: "alert", id: "dg-error", className: "dg-error", children: error })), _jsxs("section", { className: "dg-properties", "aria-label": "Propriedades", children: [_jsxs("div", { className: "dg-section-label", children: [_jsx("span", { children: "PROPRIEDADES" }), selected ? (_jsx("span", { children: kindLabels[selected.data.kind] })) : selectedEdge ? (_jsx("span", { children: "Conex\u00E3o" })) : (_jsx("span", { children: "Diagrama" }))] }), selected ? (_jsxs(_Fragment, { children: [_jsxs("label", { children: ["T\u00EDtulo", _jsx("input", { maxLength: 120, value: selected.data.label, onChange: (e) => {
                                                                if (!e.target.value.trim())
                                                                    return;
                                                                commit({
                                                                    ...graph,
                                                                    nodes: graph.nodes.map((n) => n.id === selected.id
                                                                        ? { ...n, data: { ...n.data, label: e.target.value } }
                                                                        : n),
                                                                });
                                                            } })] }), _jsxs("label", { children: ["Descri\u00E7\u00E3o", _jsx("input", { maxLength: 200, value: selected.data.description, onChange: (e) => commit({
                                                                ...graph,
                                                                nodes: graph.nodes.map((n) => n.id === selected.id
                                                                    ? { ...n, data: { ...n.data, description: e.target.value } }
                                                                    : n),
                                                            }) })] }), _jsxs("div", { className: "dg-row", children: [_jsxs("label", { children: ["Tipo", _jsx("select", { "aria-label": "Tipo do bloco", value: selected.data.kind, onChange: (e) => commit({
                                                                        ...graph,
                                                                        nodes: graph.nodes.map((n) => n.id === selected.id
                                                                            ? { ...n, data: { ...n.data, kind: e.target.value } }
                                                                            : n),
                                                                    }), children: kinds.map((kind) => (_jsx("option", { value: kind, children: kindLabels[kind] }, kind))) })] }), _jsx(ToolButton, { label: "Duplicar bloco", onClick: duplicate, children: _jsx(Copy, {}) }), _jsx(ToolButton, { label: "Excluir sele\u00E7\u00E3o", onClick: removeSelected, children: _jsx(Trash2, {}) })] }), _jsxs("div", { className: "dg-row dg-connect-row", children: [_jsxs("label", { children: ["Conectar a", _jsxs("select", { "aria-label": "Conectar a", value: connectionTarget, onChange: (event) => setConnectionTarget(event.target.value), children: [_jsx("option", { value: "", children: "Selecionar destino" }), graph.nodes
                                                                            .filter((node) => node.id !== selected.id)
                                                                            .map((node) => (_jsx("option", { value: node.id, children: node.data.label }, node.id)))] })] }), _jsx(ToolButton, { label: "Criar conex\u00E3o", disabled: !connectionTarget ||
                                                                connectionTarget === selected.id ||
                                                                !graph.nodes.some((node) => node.id === connectionTarget), onClick: () => {
                                                                connect({
                                                                    source: selected.id,
                                                                    target: connectionTarget,
                                                                    sourceHandle: direction === 'TB' ? 'out' : 'right',
                                                                    targetHandle: direction === 'TB' ? 'in' : 'left',
                                                                });
                                                                setConnectionTarget('');
                                                            }, children: _jsx(Link2, {}) })] })] })) : selectedEdge ? (_jsxs(_Fragment, { children: [_jsxs("label", { children: ["R\u00F3tulo da conex\u00E3o", _jsx("input", { maxLength: 120, value: String(selectedEdge.label || ''), onChange: (e) => commit({
                                                                ...graph,
                                                                edges: graph.edges.map((edge) => edge.id === selectedEdge.id
                                                                    ? { ...edge, label: e.target.value }
                                                                    : edge),
                                                            }) })] }), _jsxs("label", { children: ["Tra\u00E7ado", _jsxs("select", { "aria-label": "Tra\u00E7ado da conex\u00E3o", value: selectedEdge.type, onChange: (e) => commit({
                                                                ...graph,
                                                                edges: graph.edges.map((edge) => edge.id === selectedEdge.id
                                                                    ? { ...edge, type: e.target.value }
                                                                    : edge),
                                                            }), children: [_jsx("option", { value: "smoothstep", children: "Ortogonal" }), _jsx("option", { value: "default", children: "Curvo" }), _jsx("option", { value: "straight", children: "Reto" })] })] }), _jsxs("button", { className: "dg-button", onClick: removeSelected, children: [_jsx(Trash2, { size: 14 }), "Excluir conex\u00E3o"] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "dg-document-stats", children: [_jsxs("span", { children: [_jsx("strong", { children: graph.nodes.length }), " blocos"] }), _jsxs("span", { children: [_jsx("strong", { children: graph.edges.length }), " conex\u00F5es"] })] }), _jsx(DiagramToggle, { label: "Encaixar na grade", checked: snap, onChange: setSnap }), _jsx(DiagramToggle, { label: "Minimapa", checked: minimap, onChange: setMinimap })] }))] })] }) })), _jsxs("main", { className: "dg-canvas", ref: canvasRef, "aria-label": "\u00C1rea de cria\u00E7\u00E3o de diagramas", children: [_jsxs("div", { className: "dg-canvas-header", children: [_jsxs("div", { className: "dg-row", children: [!panel && (_jsx(ToolButton, { label: "Abrir painel", onClick: () => setPanel(true), children: _jsx(PanelLeftOpen, {}) })), _jsx("span", { className: "dg-canvas-name", children: "Fluxo de opera\u00E7\u00E3o" })] }), _jsxs("div", { className: "dg-row dg-canvas-options", children: [_jsxs("label", { className: "dg-inline-select", children: [_jsx("span", { className: "dg-sr-only", children: "Dire\u00E7\u00E3o do fluxo" }), direction === 'TB' ? _jsx(ArrowDown, { size: 14 }) : _jsx(ArrowRight, { size: 14 }), _jsxs("select", { "aria-label": "Dire\u00E7\u00E3o do fluxo", value: direction, onChange: (e) => layout(e.target.value), children: [_jsx("option", { value: "TB", children: "Vertical" }), _jsx("option", { value: "LR", children: "Horizontal" })] })] }), _jsx(ToolButton, { label: "Organizar diagrama", onClick: () => layout(), children: _jsx(LayoutGrid, {}) }), _jsx(ToolButton, { label: "Op\u00E7\u00F5es de visualiza\u00E7\u00E3o", active: settings, onClick: () => setSettings(!settings), children: _jsx(Settings2, {}) })] })] }), settings && (_jsxs("div", { className: "dg-settings", children: [_jsxs("div", { className: "dg-row", children: [_jsx("strong", { children: "Visualiza\u00E7\u00E3o" }), _jsx(ToolButton, { label: "Fechar op\u00E7\u00F5es", onClick: () => setSettings(false), children: _jsx(X, {}) })] }), _jsx(DiagramToggle, { label: "Grade de pontos", checked: grid, onChange: setGrid }), _jsx(DiagramToggle, { label: "Encaixar na grade", checked: snap, onChange: setSnap }), _jsx(DiagramToggle, { label: "Minimapa", checked: minimap, onChange: setMinimap }), _jsxs("label", { children: ["Novas conex\u00F5es", _jsxs("select", { "aria-label": "Novas conex\u00F5es", value: edgeType, onChange: (e) => setEdgeType(e.target.value), children: [_jsx("option", { value: "smoothstep", children: "Ortogonal" }), _jsx("option", { value: "default", children: "Curva" }), _jsx("option", { value: "straight", children: "Reta" })] })] })] })), _jsx("div", { className: "dg-flow-surface", children: _jsxs(ReactFlow, { nodes: graph.nodes, edges: graph.edges, nodeTypes: nodeTypes, onNodesChange: (changes) => setGraph((g) => ({ ...g, nodes: applyNodeChanges(changes, g.nodes) })), onEdgesChange: (changes) => setGraph((g) => ({ ...g, edges: applyEdgeChanges(changes, g.edges) })), onConnect: connect, onNodeDragStart: checkpoint, onBeforeDelete: async () => {
                                        checkpoint();
                                        return true;
                                    }, defaultEdgeOptions: edgeDefaults, fitView: true, fitViewOptions: { padding: 0.17, maxZoom: 1 }, minZoom: 0.05, maxZoom: 4, snapToGrid: snap, snapGrid: [16, 16], panOnDrag: mode === 'pan' ? true : [1, 2], selectionOnDrag: mode === 'select', nodesDraggable: mode === 'select', panOnScroll: true, colorMode: theme, deleteKeyCode: ['Backspace', 'Delete'], onlyRenderVisibleElements: true, ariaLabelConfig: {
                                        'minimap.ariaLabel': 'Minimapa do diagrama',
                                        'node.a11yDescription.default': 'Use as setas para mover. Delete exclui o bloco. Escape cancela a seleção.',
                                        'edge.a11yDescription.default': 'Delete exclui a conexão. Escape cancela a seleção.',
                                    }, children: [grid && _jsx(Background, { variant: BackgroundVariant.Dots, gap: 24, size: 1 }), minimap && _jsx(MiniMap, { pannable: true, zoomable: true, position: "bottom-right" })] }) }), _jsxs("div", { className: "dg-tool-rail", role: "toolbar", "aria-label": "Ferramentas do diagrama", children: [_jsx(ToolButton, { label: "Selecionar", active: mode === 'select', onClick: () => setMode('select'), children: _jsx(MousePointer2, {}) }), _jsx(ToolButton, { label: "Mover \u00E1rea", active: mode === 'pan', onClick: () => setMode('pan'), children: _jsx(Hand, {}) }), _jsx("hr", {}), kinds.map((kind) => {
                                        const Icon = kindIcons[kind];
                                        return (_jsx(ToolButton, { label: `Adicionar ${kindLabels[kind].toLowerCase()}`, onClick: () => create(kind), children: _jsx(Icon, {}) }, kind));
                                    }), _jsx("hr", {}), _jsx(ToolButton, { label: "Excluir selecionados", disabled: !selectionCount, onClick: removeSelected, children: _jsx(Trash2, {}) })] }), _jsxs("div", { className: "dg-history-tools", role: "toolbar", "aria-label": "Hist\u00F3rico", children: [_jsx(ToolButton, { label: "Desfazer", disabled: !history.current.past.length, onClick: () => travel(true), children: _jsx(Undo2, {}) }), _jsx(ToolButton, { label: "Refazer", disabled: !history.current.future.length, onClick: () => travel(false), children: _jsx(Redo2, {}) })] }), _jsxs("div", { className: "dg-zoom-tools", role: "toolbar", "aria-label": "Zoom", children: [_jsx(ToolButton, { label: "Diminuir zoom", disabled: viewport.zoom <= 0.0501, onClick: () => void flow.zoomTo(Math.max(0.05, viewport.zoom / 1.35)), children: _jsx(ZoomOut, {}) }), _jsxs("button", { className: "dg-zoom-value", "aria-label": "Restaurar zoom para 100%", onClick: () => void flow.zoomTo(1), children: [Math.round(viewport.zoom * 100), "%"] }), _jsx(ToolButton, { label: "Aumentar zoom", disabled: viewport.zoom >= 3.999, onClick: () => void flow.zoomTo(Math.min(4, viewport.zoom * 1.35)), children: _jsx(ZoomIn, {}) }), _jsx("span", { className: "dg-divider" }), _jsx(ToolButton, { label: "Enquadrar diagrama", onClick: () => void flow.fitView({ padding: 0.2, minZoom: 0.05, maxZoom: 1.2, duration: 200 }), children: _jsx(Scan, {}) }), _jsx(ToolButton, { label: "Tela cheia", onClick: () => {
                                            const request = document.fullscreenElement
                                                ? document.exitFullscreen()
                                                : shellRef.current?.requestFullscreen();
                                            void request?.catch(() => setStatus('Tela cheia indisponível neste navegador.'));
                                        }, children: _jsx(Maximize, {}) })] }), !graph.nodes.length && (_jsxs("div", { className: "dg-canvas-empty", children: [_jsx(Layers, { size: 28 }), _jsx("h2", { children: "Diagrama vazio" }), _jsxs("button", { className: "dg-button", onClick: () => create('process'), children: [_jsx(Plus, { size: 16 }), "Adicionar processo"] })] }))] })] }), _jsxs("footer", { className: "dg-statusbar", children: [_jsxs("span", { role: "status", children: [_jsx(Check, { size: 13 }), dirty ? 'Alterações no código pendentes' : status] }), _jsxs("span", { children: [graph.nodes.length, " blocos", _jsx("span", { className: "dg-status-dot", children: "\u00B7" }), graph.edges.length, " conex\u00F5es"] }), _jsxs("span", { children: ["Axiom Diagram Kit ", _jsx("span", { className: "dg-status-dot", children: "/" }), " 0.1"] })] })] }));
}

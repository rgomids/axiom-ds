'use client';

import { useState } from 'react';
import { Tooltip } from 'radix-ui';
import { getBezierPath, getSmoothStepPath, getStraightPath, Position } from '@xyflow/react';
import {
  ArrowUpRight,
  Hand,
  Lightbulb,
  LightbulbOff,
  MousePointer2,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { DiagramToggle, NodeBody, ToolButton } from './components';
import { kindLabels, kinds } from './model';
import './styles.css';

export function DiagramKit({ initialTheme = 'light' }: { initialTheme?: 'light' | 'dark' }) {
  const [theme, setTheme] = useState(initialTheme);
  const [grid, setGrid] = useState(true);
  const [snap, setSnap] = useState(false);
  const [tool, setTool] = useState('select');
  const endpoints = {
    sourceX: 5,
    sourceY: 6,
    targetX: 102,
    targetY: 28,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="dg-kit" data-theme={theme}>
        <header className="dg-kit-header">
          <div>
            <div>
              <h1>AXIOM / Diagram Kit</h1>
              <p>Biblioteca de componentes · 0.1</p>
            </div>
          </div>
          <div>
            <ToolButton
              label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Lightbulb /> : <LightbulbOff />}
            </ToolButton>
            <a className="dg-button" href="diagram-editor.html">
              Abrir editor
              <ArrowUpRight size={15} />
            </a>
          </div>
        </header>
        <main className="dg-kit-main">
          <section className="dg-kit-section">
            <h2>01 / Superfícies e papéis semânticos</h2>
            <div className="dg-kit-nodes">
              {[
                ['Canvas', '--dg-canvas'],
                ['Painel', '--dg-panel'],
                ['Borda', '--dg-line'],
                ['Seleção', '--dg-accent'],
                ['Sucesso', '--axion-semantic-status-success'],
              ].map(([name, token]) => (
                <div key={name} className="dg-kit-swatch">
                  <i style={{ background: `var(${token})` }} />
                  <span>
                    {name}
                    <br />
                    <code>{token}</code>
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className="dg-kit-section">
            <h2>02 / Blocos do diagrama</h2>
            <div className="dg-kit-nodes">
              {kinds.map((kind) => (
                <NodeBody
                  key={kind}
                  data={{ kind, label: kindLabels[kind], description: 'Etapa da operação' }}
                />
              ))}
            </div>
          </section>
          <section className="dg-kit-section">
            <h2>03 / Seleção e estados</h2>
            <div className="dg-kit-nodes">
              <NodeBody
                data={{ kind: 'agent', label: 'Agente analista', description: 'Estado padrão' }}
              />
              <NodeBody
                selected
                data={{ kind: 'agent', label: 'Agente analista', description: 'Selecionado' }}
              />
              <NodeBody
                data={{
                  kind: 'decision',
                  label: 'Revisão necessária',
                  description: 'Decisão pendente',
                }}
              />
            </div>
          </section>
          <section className="dg-kit-section">
            <h2>04 / Ferramentas e controles</h2>
            <div className="dg-kit-controls">
              <div>
                <strong>Seleção</strong>
                <div className="dg-row">
                  <ToolButton
                    label="Selecionar"
                    active={tool === 'select'}
                    onClick={() => setTool('select')}
                  >
                    <MousePointer2 />
                  </ToolButton>
                  <ToolButton
                    label="Mover área"
                    active={tool === 'pan'}
                    onClick={() => setTool('pan')}
                  >
                    <Hand />
                  </ToolButton>
                  <ToolButton label="Excluir (indisponível)" disabled>
                    <Trash2 />
                  </ToolButton>
                  <ToolButton label="Desfazer (indisponível)" disabled>
                    <Undo2 />
                  </ToolButton>
                </div>
              </div>
              <div>
                <strong>Preferências</strong>
                <DiagramToggle label="Grade de pontos" checked={grid} onChange={setGrid} />
                <DiagramToggle label="Encaixar na grade" checked={snap} onChange={setSnap} />
                <DiagramToggle label="Indisponível" checked={false} onChange={() => {}} disabled />
              </div>
              <div>
                <strong>Navegação</strong>
                <div className="dg-row">
                  <ToolButton label="Diminuir zoom (amostra)" disabled>
                    <ZoomOut />
                  </ToolButton>
                  <span>100%</span>
                  <ToolButton label="Aumentar zoom (amostra)" disabled>
                    <ZoomIn />
                  </ToolButton>
                </div>
                <a className="dg-button" href="diagram-editor.html">
                  Editor interativo
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </section>
          <section className="dg-kit-section">
            <h2>05 / Conexões</h2>
            <table>
              <thead>
                <tr>
                  <th scope="col">Traçado</th>
                  <th scope="col">Representação</th>
                  <th scope="col">Uso</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Ortogonal', getSmoothStepPath(endpoints)[0], 'Fluxos operacionais'],
                  ['Curvo', getBezierPath(endpoints)[0], 'Ramificações'],
                  ['Reto', getStraightPath(endpoints)[0], 'Relações diretas'],
                ].map(([name, shape, use]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <svg
                        className="dg-connector-sample"
                        viewBox="0 0 110 34"
                        role="img"
                        aria-label={`Conexão ${name.toLowerCase()}`}
                      >
                        <defs>
                          <marker
                            id={`kit-arrow-${name}`}
                            viewBox="0 0 10 10"
                            refX="9"
                            refY="5"
                            markerWidth="5"
                            markerHeight="5"
                            orient="auto"
                          >
                            <path d="M 0 0 L 10 5 L 0 10 Z" fill="currentColor" />
                          </marker>
                        </defs>
                        <path
                          d={shape}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          markerEnd={`url(#kit-arrow-${name})`}
                        />
                      </svg>
                    </td>
                    <td>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="dg-kit-section">
            <h2>06 / Contratos do componente</h2>
            <table>
              <thead>
                <tr>
                  <th scope="col">Recurso</th>
                  <th scope="col">Especificação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Geometria</td>
                  <td>Bordas de 0 px; blocos de 208 × 92 px; controles de 32 px.</td>
                </tr>
                <tr>
                  <td>Viewport</td>
                  <td>Zoom de 5% a 400%; área navegável; enquadramento automático.</td>
                </tr>
                <tr>
                  <td>Conexões</td>
                  <td>Múltiplas entradas e saídas por bloco; rótulos editáveis.</td>
                </tr>
                <tr>
                  <td>Teclado</td>
                  <td>
                    Tab para navegar; setas para mover blocos; Delete para excluir; Ctrl/Cmd + Z
                    para desfazer.
                  </td>
                </tr>
                <tr>
                  <td>Documento</td>
                  <td>JSON versionado; até 1.000 blocos e 4.000 conexões por arquivo.</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </Tooltip.Provider>
  );
}

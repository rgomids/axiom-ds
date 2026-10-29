import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Activity,
  AlertTriangle,
  Check,
  ChevronDown,
  CircleDot,
  Copy,
  FileText,
  Filter,
  GitBranch,
  Info,
  LayoutDashboard,
  Play,
  Search,
  Settings,
  Terminal,
  X,
} from 'lucide-react';
import { DocPage, DocSection, TokenName } from '../support/doc';

const icons = {
  Activity,
  AlertTriangle,
  Check,
  ChevronDown,
  CircleDot,
  Copy,
  FileText,
  Filter,
  GitBranch,
  Info,
  LayoutDashboard,
  Play,
  Search,
  Settings,
  Terminal,
  X,
};

function Icons() {
  return (
    <DocPage
      title="Icons"
      lead="Lucide (ISC) com traço 1.75 e cor herdada (currentColor). Ícones decorativos recebem aria-hidden; botões só com ícone exigem aria-label."
    >
      <DocSection
        title="Tamanhos"
        description="icon.size.sm 14px em badges e metadados, md 16px em controles (padrão), lg 20px em estados vazios e cabeçalhos."
      >
        <div className="flex items-end gap-6 text-fg">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="grid justify-items-center gap-2">
              <Settings
                aria-hidden
                strokeWidth={1.75}
                style={{
                  width: 'var(--axion-icon-size-' + size + ')',
                  height: 'var(--axion-icon-size-' + size + ')',
                }}
              />
              <TokenName>icon.size.{size}</TokenName>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection title="Conjunto recomendado">
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {Object.entries(icons).map(([name, Icon]) => (
            <li
              key={name}
              className="grid justify-items-center gap-2 rounded-control border bg-surface p-3 text-fg-secondary"
            >
              <Icon aria-hidden className="size-4" strokeWidth={1.75} />
              <span className="font-mono text-2xs text-fg-tertiary">{name}</span>
            </li>
          ))}
        </ul>
      </DocSection>
    </DocPage>
  );
}

const meta = { title: 'Foundations/Icons', component: Icons } satisfies Meta<typeof Icons>;
export default meta;
export const Library: StoryObj<typeof meta> = {};

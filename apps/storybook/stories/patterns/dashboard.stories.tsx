import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity, CheckCircle2, Clock, Coins } from 'lucide-react';
import {
  Button,
  DashboardShell,
  EmptyDashboard,
  MetricOverview,
  PageHeader,
} from '../../../../packages/ui/src/react';
import { AppHeader, AppSidebar } from '../support/app';
import { describe } from '../support/doc';

const metrics = [
  {
    id: 'runs',
    label: 'Execuções (24h)',
    value: '128',
    icon: <Activity />,
    trend: { value: '+12%', direction: 'up' as const, positive: true },
  },
  {
    id: 'success',
    label: 'Taxa de sucesso',
    value: '96.1',
    unit: '%',
    icon: <CheckCircle2 />,
    trend: { value: '-0.8pp', direction: 'down' as const, positive: false },
  },
  {
    id: 'duration',
    label: 'Duração p50',
    value: '4m 12s',
    icon: <Clock />,
    trend: { value: '0', direction: 'flat' as const },
  },
  {
    id: 'cost',
    label: 'Custo estimado',
    value: 'US$ 18,40',
    icon: <Coins />,
    footer: 'limite US$ 50',
  },
];
const meta = {
  title: 'Patterns/Dashboard/DashboardShell',
  component: DashboardShell,
  parameters: {
    fullBleed: true,
    docs: {
      description: {
        component: describe({
          purpose:
            'Moldura de aplicação: Sidebar fixa em telas largas e em Sheet abaixo de `lg`; header fixo; link "Pular para o conteúdo"; PageHeader; MetricOverview (com skeleton); EmptyDashboard para primeiro uso.',
          a11y: 'Landmarks nav/header/main; o menu móvel devolve o foco ao fechar.',
        }),
      },
    },
  },
} satisfies Meta<typeof DashboardShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Shell: Story = {
  args: { sidebar: null },
  render: () => (
    <DashboardShell
      sidebar={<AppSidebar active="overview" />}
      header={<AppHeader page="Overview" />}
    >
      <PageHeader
        eyebrow="Workspace / Project"
        title="Overview"
        description="Visão geral simulada do projeto."
        actions={<Button>New execution</Button>}
      />
      <MetricOverview metrics={metrics} />
    </DashboardShell>
  ),
};
export const Loading: Story = {
  args: { sidebar: null },
  render: () => (
    <DashboardShell
      sidebar={<AppSidebar active="overview" />}
      header={<AppHeader page="Overview" />}
    >
      <PageHeader title="Overview" />
      <MetricOverview metrics={metrics} loading />
    </DashboardShell>
  ),
};
export const FirstRun: Story = {
  args: { sidebar: null },
  render: () => (
    <DashboardShell
      sidebar={<AppSidebar active="overview" />}
      header={<AppHeader page="Overview" />}
    >
      <PageHeader title="Overview" />
      <EmptyDashboard
        title="Nenhuma execução ainda"
        description="Conecte um repositório e crie a primeira execução para ver métricas aqui."
        actions={
          <>
            <Button size="sm">Conectar repositório</Button>
            <Button size="sm" variant="outline">
              Ver documentação
            </Button>
          </>
        }
        steps={[
          { title: 'Conectar repositório', description: 'Acesso somente leitura é suficiente.' },
          { title: 'Definir workflow', description: 'Etapas e aprovações.' },
          { title: 'Criar execução', description: 'Acompanhe etapas, logs e evidências.' },
        ]}
      />
    </DashboardShell>
  ),
};

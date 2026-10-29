import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingIndicator,
  SuccessState,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Feedback/States',
  component: EmptyState,
  args: { title: 'Nenhuma execução' },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'EmptyState, ErrorState (`role="alert"`), SuccessState (`role="status"`) e LoadingIndicator (`role="status"`) compartilham a mesma estrutura: ícone, título, descrição e ações.',
          use: 'Áreas sem dados, falhas recuperáveis, conclusão de fluxos e carregamentos.',
        }),
      },
    },
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
export const All: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <EmptyState
        variant="bordered"
        title="Nenhuma execução"
        description="Crie a primeira execução para acompanhar etapas e evidências."
        actions={<Button size="sm">Nova execução</Button>}
      />
      <ErrorState
        variant="bordered"
        title="Não foi possível carregar"
        description="O serviço não respondeu em 30s."
        actions={
          <Button size="sm" variant="outline">
            Tentar novamente
          </Button>
        }
      />
      <SuccessState
        variant="bordered"
        title="Entrega aprovada"
        description="Evidências anexadas ao registro."
      />
      <div className="grid rounded-card border border-dashed bg-surface">
        <LoadingIndicator layout="block" label="Carregando execuções…" />
      </div>
    </div>
  ),
};

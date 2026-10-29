import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Toaster, toast } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Feedback/Toast',
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Notificações temporárias (Sonner). Renderize `<Toaster />` uma vez e chame `toast()`, `toast.success()`, `toast.error()` ou `toast.promise()`.',
          avoid: 'Erros que exigem ação: use Alert ou ErrorState persistentes.',
          a11y: 'Região live anunciada; pausa ao focar/hover; `Alt+T` foca a região.',
          code: "toast.success('Execução criada', { description: 'EX-00272' });",
        }),
      },
    },
  },
} satisfies Meta<typeof Toaster>;
export default meta;
export const Playground: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toaster />
      <Button variant="outline" onClick={() => toast('Workflow salvo')}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success('Execução criada', { description: 'EX-00272' })}
      >
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.warning('Cota em 85%')}>
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error('Falha ao exportar', {
            action: { label: 'Tentar novamente', onClick: () => {} },
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: 'Sincronizando…',
            success: 'Sincronizado',
            error: 'Falhou',
          })
        }
      >
        Promise
      </Button>
    </div>
  ),
};

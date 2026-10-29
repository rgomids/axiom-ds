import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Kbd,
  KbdGroup,
  Progress,
  Separator,
  Skeleton,
  Spinner,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Data Display/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Progress (determinado ou indeterminado), Spinner, Skeleton, Separator e Kbd: primitivas pequenas de exibição.',
          a11y: 'Progress e Spinner precisam de nome acessível (`aria-label` ou `label`); áreas com Skeleton devem ter `aria-busy="true"`.',
        }),
      },
    },
  },
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ProgressStates: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      <Progress aria-label="Workflow" value={50} />
      <Progress aria-label="Testes" value={100} tone="success" />
      <Progress aria-label="Cota" value={85} tone="warning" />
      <Progress aria-label="Falhas" value={20} tone="danger" />
      <Progress aria-label="Sincronizando" value={null} />
    </div>
  ),
};
export const LoadingPrimitives: Story = {
  render: () => (
    <div className="grid max-w-md gap-6">
      <div className="flex items-center gap-4">
        <Spinner label="Carregando" />
        <Spinner label="Carregando" className="size-5" />
      </div>
      <div aria-busy="true" className="grid gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  ),
};
export const SeparatorAndKbd: Story = {
  render: () => (
    <div className="grid max-w-md gap-4 text-sm text-fg-secondary">
      <p>
        Abra a paleta com{' '}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{' '}
        ou busque com <Kbd>/</Kbd>.
      </p>
      <Separator />
      <div className="flex h-5 items-center gap-3">
        <span>Overview</span>
        <Separator orientation="vertical" />
        <span>Activity</span>
        <Separator orientation="vertical" />
        <span>Settings</span>
      </div>
    </div>
  ),
};

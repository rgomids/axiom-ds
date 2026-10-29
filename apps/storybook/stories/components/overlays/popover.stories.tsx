import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Overlays/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Conteúdo interativo ancorado a um gatilho.',
          avoid: 'Texto curto não interativo (Tooltip) ou listas de ações (DropdownMenu).',
          keyboard: '`Esc` fecha e devolve o foco; clicar fora fecha.',
        }),
      },
    },
  },
} satisfies Meta<typeof Popover>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Definir limite</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <p className="font-medium">Limite de custo</p>
            <p className="text-xs text-fg-tertiary">Interrompe execuções acima do valor.</p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="limit">Valor (US$)</Label>
            <Input id="limit" defaultValue="25" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

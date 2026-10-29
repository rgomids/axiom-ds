import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, ButtonGroup, IconButton } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Actions/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Agrupa visualmente botões relacionados com `role="group"`.',
          use: 'Ações irmãs (anterior/próximo, ação + menu).',
          avoid: 'Seleção exclusiva de opções: use ToggleGroup.',
          a11y: 'Nomeie o grupo com `aria-label`.',
        }),
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;
export default meta;
export const Examples: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup aria-label="Navegação de execuções">
        <IconButton label="Anterior" variant="outline">
          <ChevronLeft aria-hidden />
        </IconButton>
        <IconButton label="Próxima" variant="outline">
          <ChevronRight aria-hidden />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup aria-label="Implantar">
        <Button>Implantar</Button>
        <IconButton
          label="Mais opções de implantação"
          variant="default"
          className="border-l border-primary-foreground/20"
        >
          <ChevronDown aria-hidden />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup aria-label="Período">
        <Button variant="outline">24h</Button>
        <Button variant="outline">7d</Button>
        <Button variant="outline">30d</Button>
      </ButtonGroup>
    </div>
  ),
};

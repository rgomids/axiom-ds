import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, LayoutGrid, List, Pin, Rows3 } from 'lucide-react';
import { Toggle, ToggleGroup, ToggleGroupItem } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Actions/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Botão de dois estados (`aria-pressed`). ToggleGroup agrupa opções `single` ou `multiple`.',
          use: 'Alternar visualizações, filtros rápidos e formatação.',
          avoid: 'Configurações persistentes on/off: use Switch.',
          keyboard:
            'Toggle: `Enter`/`Espaço`. ToggleGroup: `Tab` entra no grupo, setas movem entre itens.',
          code: '<ToggleGroup type="single" aria-label="Visualização"><ToggleGroupItem value="list">Lista</ToggleGroupItem></ToggleGroup>',
        }),
      },
    },
  },
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = { args: { 'aria-label': 'Fixar', children: <Pin aria-hidden /> } };
export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleGroup type="single" defaultValue="list" aria-label="Visualização">
        <ToggleGroupItem value="list">
          <List aria-hidden />
          Lista
        </ToggleGroupItem>
        <ToggleGroupItem value="grid">
          <LayoutGrid aria-hidden />
          Grade
        </ToggleGroupItem>
        <ToggleGroupItem value="compact">
          <Rows3 aria-hidden />
          Compacto
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" variant="outline" aria-label="Formatação">
        <ToggleGroupItem value="bold" aria-label="Negrito">
          <Bold aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Itálico">
          <Italic aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
      <Toggle variant="outline" defaultPressed aria-label="Fixar">
        <Pin aria-hidden />
      </Toggle>
      <Toggle disabled aria-label="Fixar (indisponível)">
        <Pin aria-hidden />
      </Toggle>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Lista de opções sem busca (Radix Select).',
          use: 'Até ~15 opções conhecidas.',
          avoid: 'Listas longas ou com busca (Combobox).',
          keyboard:
            '`Enter`/`Espaço`/setas abrem; setas navegam; digitar busca por prefixo; `Esc` fecha.',
        }),
      },
    },
  },
} satisfies Meta<typeof Select>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid max-w-xs gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="runtime">Runtime</Label>
        <Select defaultValue="codex">
          <SelectTrigger id="runtime">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Agentes</SelectLabel>
              <SelectItem value="codex">Codex</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectItem value="local" disabled>
              Local (indisponível)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="region">Região</Label>
        <Select>
          <SelectTrigger id="region" aria-invalid>
            <SelectValue placeholder="Selecione uma região" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sa">South America</SelectItem>
            <SelectItem value="us">US East</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="disabled">Desabilitado</Label>
        <Select disabled>
          <SelectTrigger id="disabled">
            <SelectValue placeholder="Indisponível" />
          </SelectTrigger>
          <SelectContent />
        </Select>
      </div>
    </div>
  ),
};

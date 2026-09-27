import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../../packages/ui/src/react/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Input nativo com label persistente. Associe erros por aria-describedby e aria-invalid. Suporta required, disabled e readOnly; valide no contexto do formulario.',
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const States: Story = {
  render: () => (
    <div className="grid max-w-md gap-5">
      <div>
        <label htmlFor="project">Projeto</label>
        <Input id="project" placeholder="Orion" />
      </div>
      <div>
        <label htmlFor="error">Identificador</label>
        <Input
          id="error"
          aria-invalid="true"
          aria-describedby="error-text"
          defaultValue="meu projeto"
        />
        <p id="error-text" className="text-sm text-destructive">
          Use letras, numeros e hifens.
        </p>
      </div>
      <div>
        <label htmlFor="read">Repositorio</label>
        <Input id="read" readOnly value="axiom/core" />
      </div>
      <div>
        <label htmlFor="disabled">Organizacao</label>
        <Input id="disabled" disabled value="Axiom" />
      </div>
    </div>
  ),
};

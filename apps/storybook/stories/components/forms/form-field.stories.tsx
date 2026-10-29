import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Liga Label, controle, descrição e mensagem: ids, `aria-describedby`, `aria-invalid`, `required` e `disabled` são aplicados por FormControl.',
          use: 'Todo campo de formulário com texto de apoio ou validação.',
          a11y: 'FormMessage é anunciada de forma educada (`aria-live="polite"`) e associada ao controle.',
          code: '<FormField invalid required>\n  <FormLabel>Nome</FormLabel>\n  <FormControl><Input /></FormControl>\n  <FormMessage>Informe o nome.</FormMessage>\n</FormField>',
        }),
      },
    },
  },
} satisfies Meta<typeof FormField>;
export default meta;
export const States: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid max-w-md gap-6">
      <FormField required>
        <FormLabel>Nome do projeto</FormLabel>
        <FormControl>
          <Input placeholder="orion" />
        </FormControl>
        <FormDescription>Letras minúsculas, números e hífens.</FormDescription>
      </FormField>
      <FormField invalid required>
        <FormLabel>Identificador</FormLabel>
        <FormControl>
          <Input defaultValue="Meu Projeto" />
        </FormControl>
        <FormMessage>Use apenas letras minúsculas, números e hífens.</FormMessage>
      </FormField>
      <FormField>
        <FormLabel>Repositório</FormLabel>
        <FormControl>
          <Input defaultValue="axiom/orion" />
        </FormControl>
        <FormMessage tone="success">Repositório acessível.</FormMessage>
      </FormField>
      <FormField disabled>
        <FormLabel>Organização</FormLabel>
        <FormControl>
          <Input defaultValue="axiom" />
        </FormControl>
        <FormDescription>Definida pelo administrador.</FormDescription>
      </FormField>
    </div>
  ),
};

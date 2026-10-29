import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  FileUpload,
  FormField,
  FormLabel,
  FormMessage,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Zona de upload sobre um input nativo: clique, teclado e arrastar e soltar. Valida `accept` e `maxSize` e lista os arquivos.',
          keyboard:
            '`Tab` foca a zona; `Enter`/`Espaço` abre o seletor. Cada arquivo tem botão "Remover".',
          a11y: 'Rejeições devem ser exibidas em FormMessage.',
        }),
      },
    },
  },
} satisfies Meta<typeof FileUpload>;
export default meta;
function Example() {
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <FormField invalid={errors.length > 0} className="max-w-md">
      <FormLabel>Evidências</FormLabel>
      <FileUpload
        multiple
        accept=".json,.log,text/plain"
        maxSize={1048576}
        hint="JSON, LOG ou TXT até 1 MB"
        onReject={setErrors}
        onFilesChange={() => setErrors([])}
        defaultFiles={[new File(['{}'], 'report.json', { type: 'application/json' })]}
      />
      <FormMessage>{errors.join(' · ')}</FormMessage>
    </FormField>
  );
}
export const Default: StoryObj<typeof meta> = { render: () => <Example /> };
export const Disabled: StoryObj<typeof meta> = {
  render: () => (
    <div className="max-w-md">
      <FileUpload disabled label="Upload indisponível" />
    </div>
  ),
};

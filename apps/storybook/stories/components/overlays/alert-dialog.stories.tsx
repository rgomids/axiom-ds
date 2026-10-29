import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Overlays/AlertDialog',
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Confirmação modal que exige resposta explícita (`role="alertdialog"`). Não fecha ao clicar fora.',
          use: 'Ações destrutivas ou irreversíveis.',
          avoid: 'Formulários ou conteúdo extenso (Dialog).',
          keyboard:
            'Foco inicial em "Cancelar"; `Tab` circula; `Esc` cancela e devolve o foco ao gatilho.',
        }),
      },
    },
  },
} satisfies Meta<typeof AlertDialog>;
export default meta;
function Example() {
  const [result, setResult] = useState('');
  return (
    <div className="grid justify-items-start gap-3">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Cancelar execução</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar EX-00271?</AlertDialogTitle>
            <AlertDialogDescription>
              As etapas em andamento serão interrompidas. Evidências já coletadas são mantidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => setResult('Execução cancelada (simulado)')}
            >
              Cancelar execução
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p role="status" className="text-sm text-fg-secondary">
        {result}
      </p>
    </div>
  );
}
export const Destructive: StoryObj<typeof meta> = { render: () => <Example /> };

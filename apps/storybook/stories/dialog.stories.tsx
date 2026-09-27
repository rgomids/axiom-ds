import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../../packages/ui/src/react/dialog';
import { Button } from '../../../packages/ui/src/react/button';
import { Input } from '../../../packages/ui/src/react/input';

function ProjectDialog() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState('');
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Novo projeto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar projeto</DialogTitle>
            <DialogDescription>Defina o nome do projeto.</DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              setSaved(String(data.get('project')));
              setOpen(false);
            }}
          >
            <div>
              <label htmlFor="new-project">Nome</label>
              <Input id="new-project" name="project" required />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <p role="status" className="mt-4">
        {saved ? 'Projeto criado: ' + saved : ''}
      </p>
    </>
  );
}
const meta = {
  title: 'Components/Dialog',
  component: ProjectDialog,
  parameters: {
    docs: {
      description: {
        component:
          'Radix gerencia foco inicial, focus trap, Escape, portal e restauracao de foco. Sempre forneca DialogTitle e DialogDescription. O formulario de exemplo e local, sem backend.',
      },
    },
  },
} satisfies Meta<typeof ProjectDialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

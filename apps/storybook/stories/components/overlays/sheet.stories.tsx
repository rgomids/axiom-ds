import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Overlays/Sheet',
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Drawer lateral ou inferior (Radix Dialog): detalhes, filtros e edição rápida sem sair da página.',
          keyboard: 'Foco preso no painel; `Esc` fecha e devolve o foco.',
        }),
      },
    },
  },
} satisfies Meta<typeof Sheet>;
export default meta;
export const Sides: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['right', 'left', 'bottom'] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Abrir ({side})</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Refine a lista de execuções.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-1.5">
              <Label htmlFor={'owner-' + side}>Responsável</Label>
              <Input id={'owner-' + side} placeholder="rgomids" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button>Aplicar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

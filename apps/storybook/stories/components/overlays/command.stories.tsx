import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { FileText, LayoutDashboard, Play, Settings } from 'lucide-react';
import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Kbd,
  KbdGroup,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Overlays/Command',
  component: Command,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Lista filtrável de comandos (cmdk). CommandDialog é a paleta modal.',
          keyboard:
            'Digite para filtrar; ↑/↓ navegam; `Enter` executa; `Esc` fecha. O atalho `⌘K`/`Ctrl+K` é ligado pela aplicação.',
        }),
      },
    },
  },
} satisfies Meta<typeof Command>;
export default meta;
function Items({ onRun }: { onRun?: () => void }) {
  return (
    <>
      <CommandInput placeholder="Buscar comando…" />
      <CommandList>
        <CommandEmpty>Nenhum comando encontrado.</CommandEmpty>
        <CommandGroup heading="Navegar">
          <CommandItem onSelect={onRun}>
            <LayoutDashboard aria-hidden />
            Overview
          </CommandItem>
          <CommandItem onSelect={onRun}>
            <FileText aria-hidden />
            Evidências
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ações">
          <CommandItem onSelect={onRun}>
            <Play aria-hidden />
            Nova execução<CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={onRun}>
            <Settings aria-hidden />
            Configurações<CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}
export const Inline: StoryObj<typeof meta> = {
  render: () => (
    <Command label="Comandos" className="max-w-md border">
      <Items />
    </Command>
  ),
};
function Palette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Abrir paleta{' '}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Items onRun={() => setOpen(false)} />
      </CommandDialog>
    </>
  );
}
export const Palette_: StoryObj<typeof meta> = { name: 'Palette', render: () => <Palette /> };

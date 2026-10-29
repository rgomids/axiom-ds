import type { Meta, StoryObj } from '@storybook/react-vite';
import { Copy, MoreHorizontal, Play, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  IconButton,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Overlays/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Menus de ações (DropdownMenu) e de contexto (ContextMenu, clique direito ou `Shift+F10`). Suportam grupos, checkbox, radio, submenus, atalhos e itens destrutivos.',
          keyboard:
            'Setas navegam; `Enter` ativa; →/← abrem e fecham submenus; digitar busca por prefixo; `Esc` fecha.',
        }),
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Actions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton label="Ações da execução" variant="outline">
          <MoreHorizontal aria-hidden />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>EX-00271</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Play aria-hidden />
            Reexecutar<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy aria-hidden />
            Copiar ID<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Exportar</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>JSON</DropdownMenuItem>
              <DropdownMenuItem>Markdown</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Seguir execução</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Densidade</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="default">
          <DropdownMenuRadioItem value="compact">Compacta</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="default">Padrão</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Arquivar (indisponível)</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 aria-hidden />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
export const Context: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="grid h-32 max-w-sm place-items-center rounded-card border border-dashed text-sm text-fg-tertiary">
        Clique com o botão direito
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          Abrir<ContextMenuShortcut>↵</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Copiar link</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Remover</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

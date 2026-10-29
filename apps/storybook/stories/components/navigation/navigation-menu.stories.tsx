import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Navegação horizontal com painéis (Radix NavigationMenu).',
          keyboard: '`Enter`/`Espaço` abrem; setas movem entre itens; `Esc` fecha.',
        }),
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="min-h-64">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[min(90vw,28rem)] gap-1 sm:grid-cols-2">
                {[
                  ['Executions', 'Histórico e estado'],
                  ['Workflows', 'Etapas e aprovações'],
                  ['Evidence', 'Artefatos verificáveis'],
                  ['Runtimes', 'Agentes configurados'],
                ].map(([t, d]) => (
                  <li key={t}>
                    <NavigationMenuLink href="#">
                      <span className="font-medium text-fg">{t}</span>
                      <span className="text-xs text-fg-tertiary">{d}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle}>
              Documentação
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

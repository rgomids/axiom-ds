import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity, FileCheck2, LayoutDashboard, Settings, Workflow } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Navegação vertical composta (header, grupos, itens, rodapé). Item ativo com `aria-current="page"`.',
          use: 'Navegação principal de aplicações. O comportamento de recolher/mobile pertence ao DashboardShell.',
        }),
      },
    },
  },
} satisfies Meta<typeof Sidebar>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="h-[28rem] overflow-hidden rounded-card border">
      <Sidebar>
        <SidebarHeader>
          <span className="font-semibold tracking-[0.2em]">AXIOM</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-brand-gold" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projeto</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <LayoutDashboard aria-hidden />
                  Overview
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" active>
                  <Activity aria-hidden />
                  Executions<SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Workflow aria-hidden />
                  Workflows
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <FileCheck2 aria-hidden />
                  Evidence
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton href="#">
            <Settings aria-hidden />
            Settings
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </div>
  ),
};

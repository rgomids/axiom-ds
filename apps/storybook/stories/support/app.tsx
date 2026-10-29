import { Activity, FileCheck2, LayoutDashboard, Settings, Table2, Workflow } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Kbd,
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
} from '../../../../packages/ui/src/react';

const items = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'executions', label: 'Executions', icon: Activity, badge: '12' },
  { id: 'workflows', label: 'Workflows', icon: Workflow },
  { id: 'evidence', label: 'Evidence', icon: FileCheck2 },
  { id: 'data', label: 'Data', icon: Table2 },
];

/** Brand lockup used by the example applications (text + gold diamond). */
export function AxiomMark() {
  return (
    <span className="flex items-center gap-2">
      <span className="text-sm font-semibold tracking-[0.24em] text-fg">AXIOM</span>
      <span aria-hidden className="size-1.5 rotate-45 bg-brand-gold" />
    </span>
  );
}

export function AppSidebar({ active }: { active: string }) {
  return (
    <Sidebar className="h-svh lg:sticky lg:top-0">
      <SidebarHeader>
        <AxiomMark />
        <span className="ml-auto font-mono text-2xs tracking-wide text-fg-tertiary uppercase">
          Control plane
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Orion</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton href="#" active={item.id === active}>
                  <item.icon aria-hidden />
                  {item.label}
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="grid gap-1">
        <SidebarMenuButton href="#" active={active === 'settings'}>
          <Settings aria-hidden />
          Settings
        </SidebarMenuButton>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar size="sm">
            <AvatarFallback>RG</AvatarFallback>
          </Avatar>
          <span className="text-xs text-fg-secondary">rgomids</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppHeader({ page }: { page: string }) {
  return (
    <>
      <Breadcrumb className="min-w-0">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden sm:inline-flex">
            <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Orion</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <span className="ml-auto hidden items-center gap-1.5 text-xs text-fg-tertiary sm:flex">
        Buscar <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </>
  );
}

/** Footnote shown in every example: data is simulated, not product functionality. */
export function SimulatedNote() {
  return (
    <p className="mt-10 flex items-center gap-2 text-xs text-fg-tertiary">
      <span aria-hidden className="size-1.5 rotate-45 bg-brand-gold" />
      Exemplo com dados locais simulados; não representa funcionalidade disponível no produto.
    </p>
  );
}

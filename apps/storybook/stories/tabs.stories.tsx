import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../packages/ui/src/react/tabs';
function Example() {
  return (
    <Tabs defaultValue="overview" className="max-w-xl">
      <TabsList aria-label="Projeto">
        <TabsTrigger value="overview">Resumo</TabsTrigger>
        <TabsTrigger value="activity">Atividade</TabsTrigger>
        <TabsTrigger value="locked" disabled>
          Configuracao
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="py-4">
        12 execucoes ativas
      </TabsContent>
      <TabsContent value="activity" className="py-4">
        Ultima execucao concluida
      </TabsContent>
    </Tabs>
  );
}
const meta = {
  title: 'Components/Tabs',
  component: Example,
  parameters: {
    docs: {
      description: {
        component:
          'Setas, Home e End navegam entre tabs; Radix sincroniza selecao, tabIndex e relacao com o painel. Tabs alternam conteudo local, nao substituem links de navegacao.',
      },
    },
  },
} satisfies Meta<typeof Example>;
export default meta;
type Story = StoryObj<typeof meta>;
export const KeyboardNavigation: Story = {};

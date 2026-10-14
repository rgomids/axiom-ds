import type { Meta, StoryObj } from '@storybook/react-vite';

function LandingPreview({
  section = '',
  label = 'Landing completa',
  height = 760,
}: {
  section?: string;
  label?: string;
  height?: number;
}) {
  return (
    <iframe
      title={label}
      src={'./landing/index.html' + (section ? '?preview=' + section : '')}
      style={{ width: '100%', height, border: 0 }}
    />
  );
}

const meta = {
  title: 'Marketing/Immersive landing',
  component: LandingPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Padrões da landing aprovada. Fonte: packages/landing/src/sections. Cada preview usa o mesmo build estático que o produto, isolado por iframe; amarelo/preto são a direção de arte de marketing em ambos os temas do aplicativo. As prévias por seção exibem o estado completo sem movimento. A página completa permite validar o scroll, PT/EN e o controle de movimento. Consulte packages/landing/README.md para anatomia, integração e estados.',
      },
    },
  },
} satisfies Meta<typeof LandingPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const FullPage: Story = {};
export const Navigation: Story = {
  args: { section: 'navigation', label: 'Navegação, controles e progresso', height: 160 },
};
export const Hero: Story = { args: { section: 'hero', label: 'Revelação do mascote original' } };
export const Manifesto: Story = {
  args: { section: 'manifesto', label: 'Tipografia editorial e proposta' },
};
export const OrganicControlPlane: Story = {
  args: { section: 'workflow', label: 'Control plane orgânico e seis caminhos', height: 1100 },
};
export const Transcript: Story = {
  args: {
    section: 'workflow-transcript',
    label: 'Transcrição permanente do workflow',
    height: 450,
  },
};
export const Authority: Story = {
  args: { section: 'human-authority', label: 'Autoridade humana', height: 650 },
};
export const Installation: Story = {
  args: { section: 'installation', label: 'Instalação e cópia individual', height: 1100 },
};
export const ProductStatus: Story = {
  args: { section: 'product-status', label: 'Estados de disponibilidade do produto', height: 900 },
};
export const Closing: Story = {
  args: { section: 'closing', label: 'Fechamento e chamadas para ação', height: 800 },
};
export const Footer: Story = { args: { section: 'footer', label: 'Rodapé e marca', height: 300 } };

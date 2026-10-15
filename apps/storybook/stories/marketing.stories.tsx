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
      src={
        './landing/index.html' +
        (section.startsWith('scene-')
          ? '?scene=' + section.slice(-1)
          : section
            ? '?preview=' + section
            : '')
      }
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
          'Padrões da landing aprovada. Fonte: packages/landing/src/sections. As cinco cenas seguem a ideia, a fragmentação, a entrada do Axiom, o workflow e a entrega verificável. Cada preview usa o mesmo build estático que o produto, isolado por iframe; amarelo/preto são a direção de arte de marketing em ambos os temas do aplicativo. As prévias por seção exibem o estado completo sem movimento. A página completa permite validar o scroll, PT/EN e o controle de movimento. Consulte packages/landing/README.md para anatomia, integração e estados.',
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
export const BirthOfIdea: Story = {
  args: { section: 'scene-1', label: '01: nascimento da ideia' },
};
export const Complexity: Story = {
  args: { section: 'scene-2', label: '02: complexidade e fragmentação' },
};
export const EnterAxiom: Story = {
  args: { section: 'scene-3', label: '03: Axiom organiza os mesmos elementos' },
};
export const OrganicControlPlane: Story = {
  args: { section: 'scene-4', label: '04: seis etapas e controle humano' },
};
export const VerifiableDelivery: Story = {
  args: { section: 'scene-5', label: '05: evidências e decisão humana' },
};
export const StaticSequence: Story = {
  args: { section: 'story', label: 'Cinco cenas completas sem movimento', height: 1100 },
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

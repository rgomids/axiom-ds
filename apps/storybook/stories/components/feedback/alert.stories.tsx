import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Banner,
  Button,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Alert: mensagem contextual dentro do conteúdo. Banner: aviso de página inteira, com ação e dispensa.',
          a11y: '`danger`/`warning` usam `role="alert"`; demais `role="status"`. Não use cor como único sinal: título e ícone acompanham.',
        }),
      },
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Variants: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-3">
      <Alert>
        <AlertTitle>Workflow atualizado</AlertTitle>
        <AlertDescription>As novas etapas valem para as próximas execuções.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Modo somente leitura</AlertTitle>
        <AlertDescription>Você está vendo um snapshot.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Evidências verificadas</AlertTitle>
        <AlertDescription>12 artefatos com hash válido.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Aprovação pendente</AlertTitle>
        <AlertDescription>A entrega final aguarda uma pessoa revisora.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Falha na etapa 3</AlertTitle>
        <AlertDescription>Os testes de integração falharam. Veja os logs.</AlertDescription>
      </Alert>
    </div>
  ),
};
function BannerExample() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="grid gap-3 overflow-hidden rounded-card border">
      {visible ? (
        <Banner
          variant="brand"
          action={
            <Button size="sm" variant="outline">
              Ver novidades
            </Button>
          }
          onDismiss={() => setVisible(false)}
        >
          Axiom Design System v0.4 com tema Geist.
        </Banner>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="m-3 justify-self-start"
          onClick={() => setVisible(true)}
        >
          Mostrar banner
        </Button>
      )}
      <Banner variant="warning">Manutenção programada em 30/10 às 02:00 UTC.</Banner>
      <Banner variant="danger">Integração com o provedor indisponível.</Banner>
    </div>
  );
}
export const Banners: Story = { render: () => <BannerExample /> };

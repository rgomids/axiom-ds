import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Data Display/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Seções expansíveis (`single` ou `multiple`).',
          avoid: 'Conteúdo essencial que todos precisam ler.',
          keyboard: '`Enter`/`Espaço` alternam; setas ↑/↓ movem entre cabeçalhos; `Home/End`.',
        }),
      },
    },
  },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a" className="max-w-xl">
      <AccordionItem value="a">
        <AccordionTrigger>O que é uma execução?</AccordionTrigger>
        <AccordionContent>
          Uma execução é um exemplo de unidade de trabalho rastreável neste catálogo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Quem aprova a entrega?</AccordionTrigger>
        <AccordionContent>
          Nos exemplos, uma pessoa revisora aprova a entrega final.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c" disabled>
        <AccordionTrigger>Item desabilitado</AccordionTrigger>
        <AccordionContent>—</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

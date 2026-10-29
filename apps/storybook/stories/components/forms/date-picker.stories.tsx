import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar, DatePicker, Label } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const fixed = new Date(2026, 9, 28);
const meta = {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Calendar (react-day-picker, pt-BR) e DatePicker (Calendar em Popover).',
          keyboard:
            'Setas movem entre dias; `PageUp/PageDown` mudam o mês; `Home/End` início/fim da semana; `Enter` seleciona; `Esc` fecha.',
          a11y: 'Dias desabilitados não são selecionáveis; o mês tem rótulo e a grade é navegável por leitor de tela.',
        }),
      },
    },
  },
} satisfies Meta<typeof DatePicker>;
export default meta;
function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(fixed);
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={fixed}
      className="rounded-card border bg-surface"
    />
  );
}
export const CalendarGrid: StoryObj<typeof meta> = {
  name: 'Calendar',
  render: () => <CalendarExample />,
};
export const Picker: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid max-w-xs gap-1.5">
      <Label htmlFor="due">Prazo</Label>
      <DatePicker id="due" defaultValue={fixed} />
    </div>
  ),
};

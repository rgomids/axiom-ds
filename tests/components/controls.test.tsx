import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  Button,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../../packages/ui/src/react';

test('disabled buttons cannot trigger actions', async () => {
  const click = vi.fn();
  render(
    <Button disabled onClick={click}>
      Salvar
    </Button>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
  expect(click).not.toHaveBeenCalled();
});

test.each(['icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const)(
  '%s buttons use the square icon token',
  (size) => {
    render(<Button size={size} aria-label="Pausar" />);
    const button = screen.getByRole('button', { name: 'Pausar' });
    expect(button).toHaveClass('rounded-[var(--axion-component-icon-radius)]');
    expect(button).not.toHaveClass('rounded-md');
  },
);

test('input preserves label, error relation and native state', () => {
  render(
    <>
      <label htmlFor="name">Nome</label>
      <Input id="name" aria-invalid aria-describedby="error" />
      <p id="error">Informe o nome</p>
    </>,
  );
  expect(screen.getByLabelText('Nome')).toHaveAttribute('aria-describedby', 'error');
  expect(screen.getByLabelText('Nome')).toBeInvalid();
});

test('tabs expose the selected panel', async () => {
  render(
    <Tabs defaultValue="one">
      <TabsList aria-label="Dados">
        <TabsTrigger value="one">Resumo</TabsTrigger>
        <TabsTrigger value="two">Atividade</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Primeiro painel</TabsContent>
      <TabsContent value="two">Segundo painel</TabsContent>
    </Tabs>,
  );
  await userEvent.click(screen.getByRole('tab', { name: 'Atividade' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Segundo painel');
  expect(screen.getByRole('tab', { name: 'Atividade' })).toHaveAttribute('aria-selected', 'true');
});

test('dialog closes on Escape and restores focus', async () => {
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Projeto</DialogTitle>
        <DialogDescription>Confirme os dados.</DialogDescription>
      </DialogContent>
    </Dialog>,
  );
  const trigger = screen.getByRole('button', { name: 'Abrir' });
  await userEvent.click(trigger);
  expect(screen.getByRole('dialog', { name: 'Projeto' })).toBeVisible();
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import {
  Alert,
  Button,
  Checkbox,
  Combobox,
  CopyButton,
  FileUpload,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  NumberField,
  SearchField,
  Stepper,
  Switch,
  Toggle,
  paginationRange,
  useDataTable,
  type DataTableColumn,
} from '../../packages/ui/src/react';

describe('actions', () => {
  test('loading buttons keep the label, are busy and block clicks', async () => {
    const click = vi.fn();
    render(
      <Button loading onClick={click}>
        Salvar
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Salvar' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(click).not.toHaveBeenCalled();
  });
  test('toggle exposes aria-pressed and responds to keyboard', async () => {
    render(<Toggle aria-label="Fixar" />);
    const toggle = screen.getByRole('button', { name: 'Fixar' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    toggle.focus();
    await userEvent.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
  test('copy button copies the value and announces success in its name', async () => {
    const copy = vi.fn().mockResolvedValue(undefined);
    render(<CopyButton value="EX-1" label="Copiar ID" copy={copy} />);
    await userEvent.click(screen.getByRole('button', { name: 'Copiar ID' }));
    expect(copy).toHaveBeenCalledWith('EX-1');
    expect(screen.getByRole('button', { name: 'Copiado' })).toBeInTheDocument();
  });
});

describe('forms', () => {
  test('FormField wires label, description, message and invalid state', () => {
    render(
      <FormField invalid required>
        <FormLabel>Nome</FormLabel>
        <FormControl>
          <Input />
        </FormControl>
        <FormDescription>Apoio</FormDescription>
        <FormMessage>Obrigatório</FormMessage>
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: /Nome/ });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAccessibleDescription('Apoio Obrigatório');
    expect(screen.getByText('Obrigatório')).toHaveAttribute('aria-live', 'polite');
  });
  test('disabled FormField disables its control', () => {
    render(
      <FormField disabled>
        <FormLabel>Org</FormLabel>
        <FormControl>
          <Input />
        </FormControl>
      </FormField>,
    );
    expect(screen.getByRole('textbox', { name: 'Org' })).toBeDisabled();
  });
  test('checkbox and switch toggle with Space', async () => {
    render(
      <>
        <Checkbox aria-label="Aceito" />
        <Switch aria-label="Evidências" />
      </>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito' });
    const control = screen.getByRole('switch', { name: 'Evidências' });
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    control.focus();
    await userEvent.keyboard(' ');
    expect(control).toBeChecked();
  });
  test('NumberField steps with arrows and clamps to min/max', async () => {
    const change = vi.fn();
    render(
      <NumberField
        aria-label="Paralelismo"
        defaultValue={7}
        min={1}
        max={8}
        onValueChange={change}
      />,
    );
    const field = screen.getByRole('spinbutton', { name: 'Paralelismo' });
    field.focus();
    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    expect(field).toHaveValue('8');
    expect(change).toHaveBeenLastCalledWith(8);
    await userEvent.clear(field);
    expect(change).toHaveBeenLastCalledWith(null);
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar' }));
    expect(field).toHaveValue('1');
  });
  test('SearchField clears with Escape and with the clear button', async () => {
    function Controlled() {
      const [value, setValue] = useState('orion');
      return <SearchField aria-label="Buscar" value={value} onValueChange={setValue} />;
    }
    render(<Controlled />);
    const field = screen.getByRole('searchbox', { name: 'Buscar' });
    field.focus();
    await userEvent.keyboard('{Escape}');
    expect(field).toHaveValue('');
    await userEvent.type(field, 'vega');
    await userEvent.click(screen.getByRole('button', { name: 'Limpar busca' }));
    expect(field).toHaveValue('');
    expect(field).toHaveFocus();
  });
  test('Combobox filters and selects by keyboard', async () => {
    const change = vi.fn();
    render(
      <Combobox
        aria-label="Projeto"
        onValueChange={change}
        options={[
          { value: 'orion', label: 'Orion' },
          { value: 'vega', label: 'Vega' },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole('combobox', { name: 'Projeto' }));
    await userEvent.keyboard('veg');
    expect(screen.queryByRole('option', { name: 'Orion' })).not.toBeInTheDocument();
    await userEvent.keyboard('{Enter}');
    expect(change).toHaveBeenCalledWith('vega');
    expect(screen.getByRole('combobox', { name: 'Projeto' })).toHaveTextContent('Vega');
  });
  test('FileUpload rejects files by type and size', async () => {
    const reject = vi.fn();
    const change = vi.fn();
    const { container } = render(
      <FileUpload accept=".json" maxSize={10} onReject={reject} onFilesChange={change} />,
    );
    const input = container.querySelector('input[type=file]') as HTMLInputElement;
    await userEvent.upload(input, [
      new File(['{}'], 'ok.json', { type: 'application/json' }),
      new File(['x'.repeat(20)], 'big.json', { type: 'application/json' }),
    ]);
    await userEvent.upload(input, new File(['a'], 'notes.txt', { type: 'text/plain' }), {
      applyAccept: false,
    });
    expect(change).toHaveBeenCalledWith([expect.objectContaining({ name: 'ok.json' })]);
    expect(reject.mock.calls.flat(2).join(' ')).toMatch(/big\.json.*maior|notes\.txt: tipo/s);
    expect(screen.getByRole('button', { name: 'Remover ok.json' })).toBeInTheDocument();
  });
});

describe('data', () => {
  type Row = { id: string; name: string; size: number };
  const rows: Row[] = Array.from({ length: 12 }, (_, i) => ({
    id: 'r' + i,
    name: ['beta', 'Alpha', 'gamma'][i % 3] + i,
    size: (i * 7) % 5,
  }));
  const columns: DataTableColumn<Row, 'name' | 'size'>[] = [
    { key: 'name', header: 'Nome', value: (r) => r.name, sortable: true },
    { key: 'size', header: 'Tamanho', value: (r) => r.size, sortable: true },
  ];
  test('useDataTable filters, sorts, paginates and selects', () => {
    const { result } = renderHook(() =>
      useDataTable({ data: rows, columns, getRowId: (r) => r.id, pageSize: 5 }),
    );
    expect(result.current.pageCount).toBe(3);
    act(() => result.current.setQuery('alpha'));
    expect(result.current.total).toBe(4);
    expect(result.current.page).toBe(0);
    act(() => result.current.toggleSort('name'));
    expect(result.current.rows.map((r) => r.name)).toEqual([
      'Alpha1',
      'Alpha4',
      'Alpha7',
      'Alpha10',
    ]);
    act(() => result.current.toggleSort('name'));
    expect(result.current.sort).toEqual({ key: 'name', direction: 'desc' });
    act(() => result.current.toggleSort('name'));
    expect(result.current.sort).toBeNull();
    act(() => result.current.togglePage());
    expect(result.current.pageSelection).toBe(true);
    act(() => result.current.toggleRow('r1'));
    expect(result.current.pageSelection).toBe('indeterminate');
    act(() => result.current.setPage(99));
    expect(result.current.page).toBe(0);
  });
  test('paginationRange keeps first, last and neighbours with gaps', () => {
    expect(paginationRange(5, 12)).toEqual([0, null, 4, 5, 6, null, 11]);
    expect(paginationRange(0, 3)).toEqual([0, 1, 2]);
  });
});

describe('feedback and navigation', () => {
  test('alert roles follow severity', () => {
    render(
      <>
        <Alert variant="danger">Falhou</Alert>
        <Alert variant="success">Ok</Alert>
      </>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Falhou');
    expect(screen.getByRole('status')).toHaveTextContent('Ok');
  });
  test('stepper marks the current step and states status in text', () => {
    render(
      <Stepper
        steps={[
          { id: 'a', title: 'Intake', status: 'complete' },
          { id: 'b', title: 'Review', status: 'current' },
        ]}
      />,
    );
    const current = screen.getByText(/Review/).closest('li');
    expect(current).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText(/Intake/)).toHaveTextContent('Intake (concluída)');
  });
});

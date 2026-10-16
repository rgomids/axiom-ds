import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { CommandSnippet } from '../../packages/ui/src/react';

test('copies only the selected command and announces success', async () => {
  const copy = vi.fn().mockResolvedValue(undefined);
  render(
    <>
      <CommandSnippet command="axiom version" copy={copy} />
      <CommandSnippet command="axiom help" copy={copy} />
    </>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Copiar: axiom help' }));
  expect(copy).toHaveBeenCalledExactlyOnceWith('axiom help');
  expect(screen.getAllByRole('status')[1]).toHaveTextContent('Copiado');
  expect(screen.getAllByRole('status')[0]).toBeEmptyDOMElement();
});

test('clipboard failure keeps manual copy available, and disabled never copies', async () => {
  const copy = vi.fn().mockRejectedValue(new Error('denied'));
  render(
    <>
      <CommandSnippet command="axiom help" copy={copy} />
      <CommandSnippet command="axiom version" copy={copy} disabled />
    </>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Copiar: axiom help' }));
  expect(screen.getAllByRole('status')[0]).toHaveTextContent('Ctrl+C');
  expect(window.getSelection()?.toString()).toBe('axiom help');
  await userEvent.click(screen.getByRole('button', { name: 'Copiar: axiom version' }));
  expect(copy).toHaveBeenCalledTimes(1);
});

test('changed commands reset copied feedback and stale promises cannot mark new commands copied', async () => {
  let resolve: () => void = () => {};
  const copy = () =>
    new Promise<void>((done) => {
      resolve = done;
    });
  const view = render(<CommandSnippet command="axiom version" copy={copy} />);
  await userEvent.click(screen.getByRole('button', { name: 'Copiar: axiom version' }));
  view.rerender(<CommandSnippet command="axiom help" copy={copy} />);
  resolve();
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
  expect(screen.getByRole('button', { name: 'Copiar: axiom help' })).toBeEnabled();
});

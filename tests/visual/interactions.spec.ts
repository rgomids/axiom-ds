import { test, expect, type Page } from '@playwright/test';

async function open(page: Page, id: string, theme = 'light') {
  await page.goto('/iframe.html?id=' + id + '&viewMode=story&globals=theme:' + theme);
  await expect(page.getByTestId('story-surface')).toBeVisible();
}

test('select opens, navigates and selects with the keyboard', async ({ page }) => {
  await open(page, 'components-forms-select--default');
  const trigger = page.getByRole('combobox', { name: 'Runtime' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('option', { name: 'Codex' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('option', { name: 'Claude' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveText('Claude');
  await expect(trigger).toBeFocused();
});

test('dropdown menu: arrows, submenu, escape returns focus', async ({ page }) => {
  await open(page, 'components-overlays-dropdownmenu--actions');
  const trigger = page.getByRole('button', { name: 'Ações da execução' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  // Keyboard-opened menus focus the first item.
  await expect(page.getByRole('menuitem', { name: /Reexecutar/ })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: /Exportar/ })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('menuitem', { name: 'JSON' })).toBeFocused();
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('combobox filters by typing and selects with Enter', async ({ page }) => {
  await open(page, 'components-forms-combobox--default');
  const trigger = page.getByRole('combobox', { name: 'Projeto' });
  await trigger.click();
  await page.keyboard.type('vega');
  await expect(page.getByRole('option')).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveText(/Vega/);
});

test('command palette opens with Ctrl+K and closes with Escape', async ({ page }) => {
  await open(page, 'components-overlays-command--palette');
  await page.locator('body').click();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('combobox')).toBeFocused();
  await page.keyboard.type('config');
  await expect(page.getByRole('option')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('alert dialog focuses cancel, traps focus and returns focus', async ({ page }) => {
  await open(page, 'components-overlays-alertdialog--destructive');
  const trigger = page.getByRole('button', { name: 'Cancelar execução' });
  await trigger.click();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Voltar' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Cancelar execução' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Voltar' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('sheet closes with Escape and restores focus', async ({ page }) => {
  await open(page, 'components-overlays-sheet--sides');
  const trigger = page.getByRole('button', { name: 'Abrir (right)' });
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Filtros' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('data table sorts with aria-sort and paginates', async ({ page }) => {
  await open(page, 'components-data-display-datatable--complete');
  const header = page.getByRole('columnheader', { name: /Duração/ });
  await header.getByRole('button').click();
  await expect(header).toHaveAttribute('aria-sort', 'ascending');
  await page.getByRole('button', { name: 'Página 2' }).click();
  await expect(page.getByRole('button', { name: 'Página 2' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await page.getByRole('searchbox', { name: 'Buscar execuções' }).fill('zzz');
  await expect(page.getByText('Nenhum resultado')).toBeVisible();
});

test('calendar moves by keyboard', async ({ page }) => {
  await open(page, 'components-forms-datepicker--calendar-grid');
  await page.getByRole('button', { name: /28 de outubro/ }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: /29 de outubro/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: /29 de outubro/ })).toHaveAttribute(
    'aria-label',
    /selecionado|selected/i,
  );
});

test('reduced motion disables animations', async ({ page }) => {
  await open(page, 'components-data-display-statusbadge--states');
  const animation = await page
    .locator('.animate-ping')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
});

test('complete form reports errors, focuses the first invalid field and submits', async ({
  page,
}) => {
  await open(page, 'examples-complete-form--default');
  await page.getByRole('button', { name: 'Criar projeto' }).click();
  await expect(page.getByRole('alert')).toContainText('Revise 5 campo(s)');
  await expect(page.getByRole('textbox', { name: /Identificador/ })).toBeFocused();
  await expect(page.getByRole('textbox', { name: /Identificador/ })).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await page.getByRole('textbox', { name: /Identificador/ }).fill('orion');
  await page.getByRole('textbox', { name: /E-mail/ }).fill('dev@example.com');
  await page.getByRole('combobox', { name: /Repositório/ }).click();
  await page.getByRole('option', { name: 'axiom/lyra' }).click();
  await page.getByRole('combobox', { name: /Runtime/ }).click();
  await page.getByRole('option', { name: 'Claude' }).click();
  await page.getByRole('checkbox', { name: /aprovação humana/ }).click();
  await page.getByRole('button', { name: 'Criar projeto' }).click();
  await expect(page.getByRole('status')).toContainText('Projeto criado');
});

test('dashboard shell opens mobile navigation in a sheet', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await open(page, 'examples-dashboard-overview--default');
  await page.getByRole('button', { name: 'Abrir navegação' }).click();
  await expect(page.getByRole('dialog', { name: 'Navegação' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir navegação' })).toBeFocused();
});

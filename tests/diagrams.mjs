import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const url = (name, theme = 'light') =>
  pathToFileURL(resolve('examples/' + name + '.html')).href + '?theme=' + theme;
const browser = await chromium.launch();
await mkdir('test-results/diagrams', { recursive: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  for (const theme of ['light', 'dark']) {
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url('diagram-editor', theme));
      await expect(page.locator('.dg-node')).toHaveCount(7);
      await page.evaluate(() => document.fonts.ready);
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'Editor overflow ' + width,
      );
      assert.ok((await page.locator('.react-flow__edge-path').count()) > 0, 'Graph edges render');
      await page.screenshot({ path: `test-results/diagrams/editor-${theme}-${width}.png` });
      if (width === 1440) {
        const audit = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
          [],
          'Editor accessibility ' + theme,
        );
      } else {
        await page.getByRole('button', { name: 'Abrir painel', exact: true }).click();
        await expect(page.getByLabel('Código JSON do diagrama')).toBeVisible();
        await page.getByRole('button', { name: 'Recolher painel' }).click();
        await expect(page.getByLabel('Código JSON do diagrama')).toHaveCount(0);
      }
      await page.goto(url('diagram-kit', theme));
      await expect(page.getByRole('heading', { name: 'AXIOM / Diagram Kit' })).toBeVisible();
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'Kit overflow ' + width,
      );
      if (width === 1440) {
        const audit = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
          [],
          'Kit accessibility ' + theme,
        );
        await page.screenshot({ path: `test-results/diagrams/kit-${theme}.png`, fullPage: true });
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url('diagram-editor'));
  await expect(page.locator('.dg-node')).toHaveCount(7);
  const nodeBefore = JSON.parse(
    await page.getByLabel('Código JSON do diagrama').inputValue(),
  ).nodes.find((n) => n.id === 'input').position;
  const nodeBox = await page.locator('.react-flow__node[data-id="input"]').boundingBox();
  await page.mouse.move(nodeBox.x + nodeBox.width / 2, nodeBox.y + nodeBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(nodeBox.x + nodeBox.width / 2 + 60, nodeBox.y + nodeBox.height / 2 + 30, {
    steps: 10,
  });
  await page.mouse.up();
  await expect
    .poll(
      async () =>
        JSON.parse(await page.getByLabel('Código JSON do diagrama').inputValue()).nodes.find(
          (n) => n.id === 'input',
        ).position.x,
    )
    .not.toBe(nodeBefore.x);
  await page.getByRole('button', { name: 'Desfazer', exact: true }).click();
  await expect
    .poll(
      async () =>
        JSON.parse(await page.getByLabel('Código JSON do diagrama').inputValue()).nodes.find(
          (n) => n.id === 'input',
        ).position.x,
    )
    .toBe(nodeBefore.x);
  await page.getByRole('button', { name: 'Adicionar processo', exact: true }).click();
  await expect(page.locator('.dg-node')).toHaveCount(8);
  await page.getByLabel('Título', { exact: true }).fill('Novo processo de auditoria');
  await expect(
    page.locator('.dg-node').filter({ hasText: 'Novo processo de auditoria' }),
  ).toHaveCount(1);
  await page.getByRole('button', { name: 'Excluir seleção', exact: true }).click();
  await expect(page.locator('.dg-node')).toHaveCount(7);
  await page.getByRole('button', { name: 'Desfazer', exact: true }).click();
  await expect(page.locator('.dg-node')).toHaveCount(8);
  await page.getByRole('button', { name: 'Refazer', exact: true }).click();
  await expect(page.locator('.dg-node')).toHaveCount(7);
  const source = page.locator('[data-id="input"] .react-flow__handle[data-handleid="right"]');
  const target = page.locator('[data-id="reviewer"] .react-flow__handle[data-handleid="left"]');
  const start = await source.boundingBox();
  const end = await target.boundingBox();
  await page.mouse.move(start.x + start.width / 2, start.y + start.height / 2);
  await page.mouse.down();
  await page.mouse.move(end.x + end.width / 2, end.y + end.height / 2, { steps: 20 });
  await page.mouse.up();
  await expect(page.locator('.react-flow__edge')).toHaveCount(8);
  const code = page.getByLabel('Código JSON do diagrama');
  const valid = await code.inputValue();
  await code.fill('{invalid');
  await expect(page.getByRole('alert')).toContainText('JSON inválido');
  await expect(page.locator('.dg-node')).toHaveCount(7);
  await code.fill(valid);
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByRole('switch', { name: 'Auto', exact: true }).click();
  const imported = JSON.parse(valid);
  imported.nodes[0].label = 'Solicitação revisada';
  await code.fill(JSON.stringify(imported, null, 2));
  await expect(page.locator('.dg-node').filter({ hasText: 'Solicitação revisada' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Aplicar', exact: true }).click();
  await expect(page.locator('.dg-node').filter({ hasText: 'Solicitação revisada' })).toHaveCount(1);
  await page.getByLabel('Direção do fluxo').selectOption('LR');
  await expect
    .poll(async () => {
      const doc = JSON.parse(await code.inputValue());
      return (
        doc.nodes.find((n) => n.id === 'report').position.x >
        doc.nodes.find((n) => n.id === 'input').position.x
      );
    })
    .toBe(true);
  for (
    let i = 0;
    i < 18 && (await page.getByRole('button', { name: 'Diminuir zoom', exact: true }).isEnabled());
    i++
  ) {
    await page.getByRole('button', { name: 'Diminuir zoom', exact: true }).click();
  }
  await expect(page.getByRole('button', { name: 'Restaurar zoom para 100%' })).toHaveText('5%');
  await page.getByRole('button', { name: 'Enquadrar diagrama', exact: true }).click();
  await expect(page.locator('.dg-node')).toHaveCount(7);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar', exact: true }).click();
  const download = await downloadPromise;
  const exported = JSON.parse(await readFile(await download.path(), 'utf8'));
  assert.equal(exported.edges.length, 8);
  await page.reload();
  await expect(page.locator('.dg-node').filter({ hasText: 'Solicitação revisada' })).toHaveCount(1);
  await page.getByRole('tab', { name: 'Código', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Camadas', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await expect(page.locator('.dg-app')).toHaveAttribute('data-theme', 'dark');
  await page
    .getByRole('tabpanel')
    .getByRole('button')
    .filter({ hasText: 'Solicitação revisada' })
    .click();
  await page.getByLabel('Conectar a', { exact: true }).selectOption('report');
  await page.getByRole('button', { name: 'Criar conexão', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.dg-statusbar')).toContainText('9 conexões');
  await page.getByLabel('Arquivo de diagrama').setInputFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{bad'),
  });
  await expect(page.getByRole('alert')).toContainText('JSON inválido');
  await expect(page.locator('.dg-statusbar')).toContainText('9 conexões');
  const large = {
    version: 1,
    nodes: Array.from({ length: 120 }, (_, i) => ({
      id: 'large-' + i,
      label: 'Etapa ' + i,
      description: 'Fluxo de validação',
      kind: 'process',
      position: { x: (i % 10) * 280, y: Math.floor(i / 10) * 160 },
    })),
    edges: Array.from({ length: 119 }, (_, i) => ({
      id: 'link-' + i,
      source: 'large-' + i,
      target: 'large-' + (i + 1),
      label: '',
    })),
  };
  await page.getByLabel('Arquivo de diagrama').setInputFiles({
    name: 'large.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(large)),
  });
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(page.locator('.dg-statusbar')).toContainText('120 blocos');
  await expect(page.locator('.dg-statusbar')).toContainText('119 conexões');
  await page.getByRole('button', { name: 'Enquadrar diagrama', exact: true }).click();
  await expect(page.locator('.dg-node')).toHaveCount(120);
  await page.screenshot({ path: 'test-results/diagrams/large-graph.png' });
  assert.deepEqual(errors, [], 'No browser errors');
  console.log(
    'Diagram checks passed: themes, three widths, accessibility, create/delete/undo/redo, connections, code validation, layout, 5% zoom, export and persistence.',
  );
} finally {
  await context.close();
  await browser.close();
}

import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const url = (file) => pathToFileURL(resolve(file)).href;
const registry = JSON.parse(await readFile('registry.json', 'utf8'));
await mkdir('test-results', { recursive: true });
try {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url('resources.html'));
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      'Resource index overflow at ' + width,
    );
    for (const resource of registry.resources.filter((r) => r.kind === 'components')) {
      await page.goto(url(resource.example));
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        resource.id + ' overflow at ' + width,
      );
      if (width === 1440) {
        const audit = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
          [],
          resource.id + ' accessibility',
        );
      }
    }
    await page.goto(url('index.html'));
    for (const selector of ['.icon-btn', '.icon-soft', '.icon-grid div']) {
      const radii = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) => getComputedStyle(element).borderRadius),
        );
      assert.ok(radii.length > 0, 'Icon examples exist: ' + selector);
      assert.ok(
        radii.every((radius) => radius === '0px'),
        'Square icons: ' + selector,
      );
    }
    await page.locator('#brand-system').scrollIntoViewIfNeeded();
    const issues = await page.locator('#brand-system').evaluate((section) => {
      const errors = [];
      for (const img of section.querySelectorAll('img'))
        if (!img.complete || !img.naturalWidth) errors.push('Missing image');
      for (const sheet of section.querySelectorAll('.brand-sheet')) {
        const bounds = sheet.getBoundingClientRect();
        let bottom = bounds.top;
        for (const child of sheet.children) {
          const rect = child.getBoundingClientRect();
          if (rect.top < bottom - 1 || rect.left < bounds.left || rect.right > bounds.right + 1)
            errors.push(child.className);
          bottom = rect.bottom;
        }
      }
      return errors;
    });
    assert.deepEqual(issues, [], 'Brand layout at ' + width);
    if ([1440, 390].includes(width)) {
      await page
        .locator('#brand-system')
        .screenshot({ path: 'test-results/brand-' + width + '.png' });
      await page.goto(url('resources.html'));
      await page.screenshot({ path: 'test-results/resources-' + width + '.png', fullPage: true });
    }
  }
  await page.goto(url('examples/search.html'));
  await page.getByRole('searchbox').fill('core');
  assert.equal(await page.locator('[data-search-results] li:visible').count(), 1);
  await page.getByRole('searchbox').fill('inexistente');
  assert.equal(await page.locator('[data-search-status]').textContent(), '0 resultados');
  await page.goto(url('examples/field.html'));
  await page.getByLabel('Nome do projeto', { exact: true }).fill('Orion');
  await page.getByLabel('E-mail', { exact: true }).fill('test@example.com');
  await page.getByRole('button', { name: 'Validar formulario' }).click();
  assert.match(await page.getByRole('status').textContent(), /validados/);
  await page.goto(url('examples/button.html'));
  await page.getByRole('button', { name: 'Salvar', exact: true }).focus();
  assert.notEqual(
    await page
      .getByRole('button', { name: 'Salvar', exact: true })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
    'none',
  );
  assert.ok(await page.getByRole('button', { name: 'Indisponivel' }).isDisabled());
  console.log(
    'Browser checks passed: 4 viewports, 9 component audits, brand layout, search, form and keyboard focus.',
  );
} finally {
  await browser.close();
}

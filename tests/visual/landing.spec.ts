import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('native scroll storytelling', () => {
  test.use({ reducedMotion: 'no-preference' });
  test('yellow opening, black navigation, organic growth and explicit pause', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/landing/index.html');
    await expect(page.locator('body')).toHaveClass(/gold-start/);
    await expect(page.locator('.header .brand')).toHaveText('');
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'instant' }));
    await expect(page.locator('body')).not.toHaveClass(/gold-start/);
    const start = await page
      .locator('#fluxo')
      .evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), start + 1800);
    await expect
      .poll(async () =>
        Number(
          await page
            .locator('.organic-map')
            .evaluate((el) => (el as HTMLElement).style.getPropertyValue('--growth')),
        ),
      )
      .toBeGreaterThan(0.1);
    await expect
      .poll(async () =>
        Number(
          await page
            .locator('[data-path="0"]')
            .evaluate((el) => (el as SVGElement).style.getPropertyValue('--draw')),
        ),
      )
      .toBeGreaterThan(0.9);
    await page.locator('#motion').click();
    await expect(page.locator('body')).toHaveClass(/static-motion/);
    await expect(page.locator('.organic-workflow .intro-line')).toHaveText(
      'Mapa completo, sem animação.',
    );
  });
});

for (const width of [1280, 390, 320]) {
  test(
    'landing keyboard, translation, clipboard and reduced motion ' + width,
    async ({ page, context }) => {
      await page.setViewportSize({ width, height: 900 });
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.goto('/landing/index.html#instalar');
      await expect(page.locator('body')).toHaveClass(/static-motion/);
      await expect(page.locator('.organic-workflow .intro-line')).toHaveText(
        'Mapa completo, sem animação.',
      );
      await expect(page.getByRole('button', { name: 'Windows', exact: true })).toHaveCount(0);
      for (const index of [0, 1, 2, 3]) {
        await page.locator('#setup-' + index).click();
        const rows = page.locator('.command-row');
        await expect(rows).toHaveCount(index === 0 ? 1 : 3);
        for (const row of await rows.all()) {
          const command = await row.locator('code').innerText();
          await row.getByRole('button').click();
          expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(command);
          await expect(row.getByRole('button')).toHaveText('Copiado ✓');
        }
      }
      await page.locator('#setup-0').focus();
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('#setup-1')).toBeFocused();
      await expect(page.locator('#setup-1')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('End');
      await expect(page.locator('#setup-3')).toBeFocused();
      await page.locator('#language').click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('.copy-command').first()).toHaveText('Copy ⧉');
      await page.locator('#setup-0').click();
      await expect(page.locator('.terminal-platform')).toContainText('Supported hosts:');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
    },
  );
}

test('clipboard failure selects only the requested command', async ({ page }) => {
  await page.goto('/landing/index.html#instalar');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
      configurable: true,
    });
  });
  await page.locator('#setup-1').click();
  await page.locator('.copy-command').nth(1).click();
  await expect(page.locator('#copy-status')).toContainText('Ctrl+C');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('axiom help');
});

test('translation treats dynamic translation values as text', async ({ page }) => {
  await page.goto('/landing/index.html');
  await page
    .locator('[data-en]')
    .first()
    .evaluate((el) => {
      (el as HTMLElement).dataset.en = '<img src=x onerror=alert(1)>';
    });
  await page.locator('#language').click();
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
});

for (const theme of ['light', 'dark']) {
  for (const width of [1280, 390]) {
    test('command snippet visual ' + theme + ' ' + width, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(
        '/iframe.html?id=components-commandsnippet--individual-commands&viewMode=story&globals=theme:' +
          theme,
      );
      await expect(page.getByTestId('story-surface')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(audit.violations).toEqual([]);
      await expect(page).toHaveScreenshot('command-snippet-' + theme + '-' + width + '.png');
    });
  }
}

for (const width of [1280, 390]) {
  test('organic landing visual ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto('/landing/index.html?preview=workflow');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.workflow-node')).toHaveCount(6);
    const snapshot =
      width === 390 ? `landing-workflow-390-${process.platform}.png` : 'landing-workflow-1280.png';
    await expect(page).toHaveScreenshot(snapshot, { fullPage: true });
  });
}

import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function progress(page: Page, p: number) {
  const y = await page
    .locator('.storytelling')
    .evaluate(
      (el, value) =>
        el.getBoundingClientRect().top + scrollY + ((el.clientHeight - innerHeight) * value) / 4,
      p,
    );
  await page.evaluate((value) => window.scrollTo({ top: value, behavior: 'instant' }), y);
  await expect
    .poll(async () =>
      Number(await page.locator('.storytelling').getAttribute('data-story-progress')),
    )
    .toBeCloseTo(p, 3);
}

test.describe('native scroll storytelling', () => {
  test.use({ reducedMotion: 'no-preference' });
  for (const width of [1280, 390, 320])
    test(
      'persistent identities, reversible transitions and keyframes ' + width,
      async ({ page }) => {
        await page.setViewportSize({ width, height: width === 1280 ? 900 : 844 });
        await page.goto('/landing/index.html');
        await expect(page.locator('body')).toHaveClass(/story-motion/);
        await expect(page.locator('body')).toHaveClass(/gold-start/);
        await expect(page.locator('.header .brand')).toHaveText('');
        const handles = await page.locator('[data-story-idea], [data-story-work]').elementHandles();
        await progress(page, 1);
        await expect(page.locator('[data-story-axiom]')).toHaveCSS('opacity', '0');
        await progress(page, 2);
        await expect(page.locator('[data-story-axiom]')).toHaveCSS('opacity', '1');
        await expect(page.locator('body')).not.toHaveClass(/gold-start/);
        const snapshots = [];
        for (let transition = 0; transition < 4; transition++)
          for (const q of [0, 0.25, 0.5, 0.75, 1]) {
            const p = transition + q;
            await progress(page, p);
            const state = await page
              .locator(
                '[data-story-idea], [data-story-work], [data-story-axiom], [data-story-path]',
              )
              .evaluateAll((elements) =>
                elements.map((el) => [el.getAttribute('style'), el.getAttribute('d')]),
              );
            snapshots.push({ p, state });
            await page.screenshot({
              path: `test-results/storytelling/${width}-T${transition + 1}${transition + 2}-${q}.png`,
            });
          }
        for (const sample of snapshots.reverse()) {
          await progress(page, sample.p);
          expect(
            await page
              .locator(
                '[data-story-idea], [data-story-work], [data-story-axiom], [data-story-path]',
              )
              .evaluateAll((elements) =>
                elements.map((el) => [el.getAttribute('style'), el.getAttribute('d')]),
              ),
          ).toEqual(sample.state);
        }
        for (const handle of handles)
          expect(await handle.evaluate((el) => el.isConnected)).toBe(true);
        await progress(page, 4);
        await expect(page.locator('[data-story-idea]')).toHaveCSS('opacity', '1');
        await expect(page.locator('[data-story-decision]')).toHaveCSS('opacity', '1');
        await expect(page.locator('[data-story-decision]')).toContainText('Solicitar retrabalho');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        await page.locator('#motion').click();
        await expect(page.locator('body')).toHaveClass(/static-motion/);
        for (const scene of await page.locator('article[data-story-scene]').all())
          await expect(scene).toBeVisible();
      },
    );
});

for (const width of [1280, 390, 320])
  test(
    'static sequence, keyboard, translation and individual clipboard ' + width,
    async ({ page, context }) => {
      await page.setViewportSize({ width, height: 900 });
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.goto('/landing/index.html#instalar');
      await expect(page.locator('body')).toHaveClass(/static-motion/);
      await expect(page.locator('.story-stage')).toBeHidden();
      await expect(page.locator('article[data-story-scene]')).toHaveCount(5);
      for (const scene of await page.locator('article[data-story-scene]').all()) {
        await expect(scene).toBeVisible();
        await scene.screenshot({
          path: `test-results/storytelling/static-${width}-${await scene.getAttribute('data-story-scene')}.png`,
        });
      }
      for (const index of [0, 1, 2, 3]) {
        await page.locator('#setup-' + index).click();
        const rows = page.locator('.command-row');
        await expect(rows).toHaveCount(index === 0 ? 1 : 3);
        for (const row of await rows.all()) {
          const command = await row.locator('code').innerText();
          await row.getByRole('button').click();
          expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(command);
        }
      }
      await page.locator('#setup-0').focus();
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('#setup-1')).toBeFocused();
      await page.keyboard.press('End');
      await expect(page.locator('#setup-3')).toBeFocused();
      await page.locator('#language').click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('.copy-command').first()).toHaveText('Copy ⧉');
      await page.locator('#setup-0').click();
      await expect(page.locator('.terminal-platform')).toContainText('Supported hosts:');
      await expect(page.locator('article[data-story-scene="5"]')).toContainText('request rework');
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

test('no JavaScript retains all five illustrated scenes and installation command', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/landing/index.html');
  await expect(page.locator('article[data-story-scene]')).toHaveCount(5);
  await expect(page.locator('.story-stage')).toBeHidden();
  for (const scene of await page.locator('article[data-story-scene]').all()) {
    await expect(scene).toBeVisible();
    await expect(scene.locator('svg').first()).toBeVisible();
  }
  await expect(page.locator('#commands code')).toContainText('install.sh');
  await expect(page.locator('a[href="#instalar"]').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

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

test('translations treat dynamic values as text', async ({ page }) => {
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

for (const width of [1280, 390])
  for (const scene of [1, 2, 3, 4, 5])
    test(`scene ${scene} visual ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 1280 ? 900 : 844 });
      await page.goto('/landing/index.html?scene=' + scene);
      await expect(page.locator('body')).toHaveClass(/story-motion/);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('.storytelling')).toHaveAttribute(
        'data-story-progress',
        String(scene - 1) + '.000000',
      );
      // Mobile text rasterization differs between Chromium's Linux and Windows builds.
      const platform = width === 390 && scene > 1 ? `-${process.platform}` : '';
      await expect(page).toHaveScreenshot(`story-scene-${scene}-${width}${platform}.png`);
    });

for (const width of [1280, 390])
  test.describe('continuous story video ' + width, () => {
    const height = width === 1280 ? 900 : 844;
    test.use({
      reducedMotion: 'no-preference',
      viewport: { width, height },
    });
    test('native wheel forward and back', async ({ browser }) => {
      const context = await browser.newContext({
        reducedMotion: 'no-preference',
        viewport: { width, height },
        recordVideo: { dir: 'test-results/storytelling/video', size: { width, height } },
      });
      const page = await context.newPage();
      await page.goto('/landing/index.html');
      await expect(page.locator('body')).toHaveClass(/story-motion/);
      const range = await page
        .locator('.storytelling')
        .evaluate((el) => el.clientHeight - innerHeight);
      for (let i = 0; i < 80; i++) {
        await page.mouse.wheel(0, range / 72);
        await page.waitForTimeout(60);
      }
      for (let i = 0; i < 36; i++) {
        await page.mouse.wheel(0, -range / 36);
        await page.waitForTimeout(60);
      }
      await expect(page.locator('article[data-story-scene]')).toHaveCount(5);
      const video = page.video();
      await context.close();
      if (video) await video.saveAs(`test-results/storytelling/continuous-${width}.webm`);
    });
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

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('reviewed marketing patterns', () => {
  test.use({ reducedMotion: 'no-preference' });

  for (const width of [1280, 390]) {
    test(`stationary triangle hover stays open without moving captions ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/landing/index.html?frame=5');
      const toggle = page.locator('.story-dock-toggle');
      const copy = page.locator('[data-story-copy="4"]');
      const before = await copy.boundingBox();
      for (const bottom of [5, 25, 40]) {
        await page.mouse.move(2, 2);
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await page.mouse.move(width / 2, 844 - bottom);
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        // This used to alternate open/closed every animation frame.
        const stable = await toggle.evaluate(
          (button) =>
            new Promise<boolean>((resolve) => {
              const end = performance.now() + 800;
              const sample = () => {
                if (button.getAttribute('aria-expanded') !== 'true') resolve(false);
                else if (performance.now() >= end) resolve(true);
                else requestAnimationFrame(sample);
              };
              sample();
            }),
        );
        expect(stable).toBe(true);
        const frame = await page.locator('.story-dock-frame').boundingBox();
        expect(frame!.y - before!.y - before!.height).toBeGreaterThanOrEqual(20);
        expect(await copy.boundingBox()).toEqual(before);
        await expect(page.locator('.story-dock-frame')).toHaveCSS('border-width', '0px');
      }
      await page.mouse.move(2, 2);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await toggle.focus();
      await page.keyboard.press('Tab');
      await expect(page.locator('.story-navigation a').first()).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    test(`footer links, language and accessibility ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/landing/index.html?preview=footer');
      const footer = page.locator('.site-footer');
      await expect(footer.locator('.footer-column h2')).toHaveText([
        'Produto',
        'Soluções',
        'Recursos',
      ]);
      await expect(footer.locator('.footer-social')).toHaveCount(1);
      await expect(footer.locator('.footer-social')).toHaveAttribute(
        'href',
        'https://github.com/rgomids/axiom',
      );
      await expect(footer.locator('.footer-unavailable')).toHaveAttribute('aria-disabled', 'true');
      await page.locator('#footer-language').selectOption('en');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(footer.locator('.footer-column h2')).toHaveText([
        'Product',
        'Solutions',
        'Resources',
      ]);
      await page.locator('#footer-language').selectOption('pt');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const audit = await new AxeBuilder({ page })
        .include('.site-footer')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(audit.violations).toEqual([]);
      await expect(footer).toHaveScreenshot(`marketing-footer-${width}-${process.platform}.png`);
    });

    test(`continuity has equal centered cards ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/landing/index.html?frame=18');
      const idea = await page.locator('[data-story-idea]').boundingBox();
      const next = await page.locator('.live-world .story-continuity').boundingBox();
      expect(idea!.width).toBeCloseTo(next!.width, 1);
      expect(idea!.height).toBeCloseTo(next!.height, 1);
      expect((idea!.x + next!.x + next!.width) / 2).toBeCloseTo(width / 2, 1);
      await expect(page.locator('.live-world .story-wave')).toHaveCSS('opacity', '0');
    });
  }

  test('touch opens the drawer and selects a native chapter anchor', async ({ browser }) => {
    const context = await browser.newContext({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 },
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    await page.goto('/landing/index.html');
    await page.locator('.story-dock-toggle').tap();
    await expect(page.locator('.story-dock-toggle')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('.story-navigation a').last().tap();
    await expect(page).toHaveURL(/#cena-5/);
    await expect(page.locator('.story-dock-toggle')).toHaveAttribute('aria-expanded', 'false');
    await context.close();
  });

  test('architecture and execution graph keep explicit human and external boundaries', async ({
    page,
  }) => {
    await page.goto('/landing/index.html?frame=10&detail=5');
    await expect(page.locator('[data-orchestration="architecture"]')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
    await expect(page.locator('.orch-c4-desktop .orch-node')).toHaveCount(12);
    await page.goto('/landing/index.html?frame=11&detail=3');
    await expect(page.locator('[data-orchestration="workflow"]')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
    await expect(page.locator('.orch-phase-rail > span')).toHaveCount(6);
    await expect(page.locator('.orch-agent')).toHaveCount(4);
    await expect(page.locator('.orch-disclosure').last()).toContainText('ilustrativos');
  });

  test('orchestration titles fade separately at the diagram handoff', async ({ page }) => {
    await page.goto('/landing/index.html');
    for (const beat of [9.9, 10, 10.1]) {
      await page.locator('.storytelling').evaluate(async (story, target) => {
        const url = '/landing/orchestration-timeline.mjs';
        const { orchestrationFraction } = await import(url);
        scrollTo({
          top:
            story.getBoundingClientRect().top +
            scrollY +
            (story.clientHeight - innerHeight) * orchestrationFraction(target),
          behavior: 'instant',
        });
      }, beat);
      await page.waitForFunction((target) => {
        const story = document.querySelector<HTMLElement>('.storytelling')!;
        return (
          story.dataset.storySettled === 'true' &&
          Math.abs(Number(story.dataset.storyProgress) - (target * 4) / 17) < 0.001
        );
      }, beat);
      const visible = await page
        .locator('.orch-scene-copy')
        .evaluateAll(
          (captions) =>
            captions.filter(
              (caption) =>
                Number(getComputedStyle(caption).opacity) > 0.001 &&
                Number(getComputedStyle(caption.parentElement!).opacity) > 0.001,
            ).length,
        );
      expect(visible).toBeLessThanOrEqual(1);
    }
  });
});

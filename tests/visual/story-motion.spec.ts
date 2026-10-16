import { expect, test } from '@playwright/test';

for (const width of [1280, 390]) {
  test('reading dwell, traveling signals, ambient motion and pause ' + width, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/landing/index.html');
    const story = page.locator('.storytelling');
    const seek = async (q: number) => {
      await story.evaluate((el, beat) => {
        const top = el.getBoundingClientRect().top + scrollY;
        scrollTo({ top: top + ((el.clientHeight - innerHeight) * beat) / 24, behavior: 'instant' });
      }, q);
      await expect
        .poll(async () => Number(await story.getAttribute('data-story-progress')))
        .toBeCloseTo(q / 6, 3);
      await expect(story).toHaveAttribute('data-story-settled', 'true');
    };
    expect(await story.evaluate((el) => (el.clientHeight - innerHeight) / innerHeight)).toBeCloseTo(
      48,
      1,
    );
    await seek(3.2);
    await expect(story).toHaveAttribute('data-story-frame', '4');
    await expect(page.locator('[data-story-copy="3"]')).toHaveCSS('opacity', '1');
    await expect(page.locator('.live-world .orb-surface i')).toHaveCSS(
      'animation-name',
      'idea-rotation',
    );
    await expect(page.locator('.live-world .ghost-light').first()).toHaveCSS(
      'animation-name',
      'thought-drift',
    );
    await expect(page.locator('.live-world .story-energy path').first()).toHaveCSS(
      'animation-name',
      'idea-wave',
    );
    await expect(page.locator('.live-world .energy-impulse').first()).toHaveCSS(
      'animation-name',
      'idea-wave, energy-flow',
    );
    await seek(3 + 0.28 + 0.72 * 0.35);
    expect(
      await page
        .locator('.connection-signal')
        .first()
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    ).toBeGreaterThan(0.1);
    await expect(page.locator('[data-story-work="0"]')).toHaveCSS('opacity', '0');
    await seek(3 + 0.28 + 0.72 * 0.8);
    expect(
      await page
        .locator('[data-story-work="0"]')
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    ).toBeGreaterThan(0.5);
    expect(
      await page
        .locator('[data-story-work="0"]')
        .evaluate((el) => Number((el as HTMLElement).style.getPropertyValue('--card-bloom'))),
    ).toBeGreaterThan(0.1);
    await seek(4);
    await page.screenshot({ path: `test-results/storytelling/fluid-${width}.png` });
    await seek(15);
    await expect(page.locator('.live-world .idea-link')).toHaveCSS('opacity', '1');
    await page.screenshot({ path: `test-results/storytelling/connected-map-${width}.png` });
    await seek(15.64);
    await expect(page.locator('[data-story-idea]')).toHaveCSS('opacity', '0');
    await seek(15.9);
    const delta = await page.locator('.live-world').evaluate((world) => {
      const orb = world.querySelector('[data-story-idea]')!.getBoundingClientRect();
      const port = world.querySelector('.flow-port')!.getBoundingClientRect();
      return [
        Math.abs(orb.x + orb.width / 2 - port.x - port.width / 2),
        Math.abs(orb.y + orb.height / 2 - port.y - port.height / 2),
      ];
    });
    expect(Math.max(...delta)).toBeLessThan(1);
    await seek(16);
    await page.screenshot({ path: `test-results/storytelling/connected-lanes-${width}.png` });
    await seek(18);
    const gap = await page.locator('.live-world').evaluate((world) => {
      const path = world.querySelector('[data-story-path="5"]') as SVGPathElement;
      const svg = path.ownerSVGElement!.getBoundingClientRect();
      return [0, 1].map((end, i) => {
        const point = path.getPointAtLength(end * path.getTotalLength());
        const card = world
          .querySelector(`[data-story-work="${i ? 5 : 4}"]`)!
          .getBoundingClientRect();
        return Math.hypot(
          svg.x + (point.x / 100) * svg.width - card.x,
          svg.y + (point.y / 100) * svg.height - card.y - card.height / 2,
        );
      });
    });
    expect(Math.max(...gap)).toBeLessThan(1);
    await page.screenshot({ path: `test-results/storytelling/connected-gate-${width}.png` });
    await seek(23.63);
    const beforeWidth = await page
      .locator('.live-world .orb-surface')
      .evaluate((el) => el.getBoundingClientRect().width);
    await seek(23.65);
    const afterWidth = await page
      .locator('.live-world .orb-surface')
      .evaluate((el) => el.getBoundingClientRect().width);
    expect(Math.abs(beforeWidth - afterWidth)).toBeLessThan(12);
    const morph = await page
      .locator('[data-story-idea]')
      .evaluate((el) => Number((el as HTMLElement).style.getPropertyValue('--idea-card')));
    expect(morph).toBeGreaterThan(0.45);
    expect(morph).toBeLessThan(0.6);
    await page.locator('#motion').click();
    await expect(page.locator('body')).toHaveClass(/static-motion/);
    await expect(page.locator('.live-world')).toHaveAttribute('data-ambient', 'false');
    await expect(page.locator('.live-world .orb-surface i')).toHaveCSS('animation-name', 'none');
    await expect(page.locator('.scene-static .ghost-light').first()).toHaveCSS('display', 'none');
  });
}

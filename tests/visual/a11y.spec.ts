import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

// Every story in the built catalog is audited in both themes; docs pages are skipped.
const index = JSON.parse(readFileSync('storybook-static/index.json', 'utf8')) as {
  entries: Record<string, { id: string; type: string }>;
};
const stories = Object.values(index.entries)
  .filter((entry) => entry.type === 'story')
  .map((entry) => entry.id);

test('catalog has no landing or marketing entries', () => {
  expect(stories.filter((id) => /landing|marketing/.test(id))).toEqual([]);
});

for (const theme of ['light', 'dark']) {
  for (const id of stories) {
    test(`a11y ${id} ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto('/iframe.html?id=' + id + '&viewMode=story&globals=theme:' + theme);
      await expect(page.getByTestId('story-surface')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'no horizontal page scroll at 390px',
      ).toBe(true);
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(
        audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
    });
  }
}

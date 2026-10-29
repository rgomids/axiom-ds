import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const stories = [
  'foundations-colors--palette',
  'foundations-typography--scale',
  'components-actions-button--variants',
  'components-actions-button--states',
  'components-forms-input--states',
  'components-data-display-badge--variants',
  'components-data-display-card--project',
  'components-overlays-dialog--playground',
  'components-data-display-tooltip--keyboard-and-pointer',
  'components-navigation-tabs--keyboard-navigation',
  'patterns-logs-commandsnippet--individual-commands',
  'components-actions-toggle--group',
  'components-forms-formfield--states',
  'components-forms-checkbox--states',
  'components-forms-switch--states',
  'components-forms-fileupload--default',
  'components-data-display-statusbadge--states',
  'components-data-display-metriccard--grid',
  'components-data-display-datatable--complete',
  'components-navigation-stepper--horizontal',
  'components-feedback-alert--variants',
  'components-feedback-states--all',
  'patterns-workflow-executiontimeline--stepper',
  'patterns-logs-logviewer--default',
  'patterns-evidence-evidencepanel--panel',
  'patterns-evidence-evidencepanel--details',
  'examples-dashboard-overview--default',
  'examples-execution-details--default',
  'examples-project-settings--default',
  'examples-data-management--default',
  'examples-complete-form--default',
];

async function openStory(page: Page, story: string, theme: string) {
  await page.goto('/iframe.html?id=' + story + '&viewMode=story&globals=theme:' + theme);
  await expect(page.getByTestId('story-surface')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  await page.evaluate(() => document.fonts.ready);
}

for (const theme of ['light', 'dark']) {
  for (const width of [1280, 390]) {
    for (const story of stories) {
      test(story + ' ' + theme + ' ' + width, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await openStory(page, story, theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        const audit = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(
          audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
        ).toEqual([]);
        await expect(page).toHaveScreenshot(story + '-' + theme + '-' + width + '.png', {
          fullPage: true,
        });
      });
    }
  }
  test('dialog keyboard and submission ' + theme, async ({ page }) => {
    await openStory(page, 'components-overlays-dialog--playground', theme);
    const trigger = page.getByRole('button', { name: 'Novo projeto' });
    await trigger.click();
    await expect(page.getByRole('dialog', { name: 'Criar projeto' })).toBeVisible();
    await expect(page.getByLabel('Nome', { exact: true })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Nome', { exact: true })).toBeFocused();
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(audit.violations).toEqual([]);
    await expect(page).toHaveScreenshot('dialog-open-' + theme + '.png');
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.getByLabel('Nome', { exact: true }).fill('Orion');
    await page.getByRole('button', { name: 'Criar', exact: true }).click();
    await expect(page.getByRole('status')).toHaveText('Projeto criado: Orion');
    await expect(trigger).toBeFocused();
  });
  test('tabs and tooltip keyboard ' + theme, async ({ page }) => {
    await openStory(page, 'components-navigation-tabs--keyboard-navigation', theme);
    await page.getByRole('tab', { name: 'Resumo' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Atividade' })).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveText('Ultima execucao concluida');
    await page.keyboard.press('Home');
    await expect(page.getByRole('tab', { name: 'Resumo' })).toBeFocused();
    await openStory(page, 'components-data-display-tooltip--keyboard-and-pointer', theme);
    await page.getByRole('button').focus();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await expect(page).toHaveScreenshot('tooltip-open-' + theme + '.png');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toBeHidden();
  });
}

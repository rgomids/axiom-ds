import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/visual',
  outputDir: 'test-results/visual',
  snapshotPathTemplate: '{testDir}/baselines/{arg}{ext}',
  fullyParallel: true,
  workers: 2,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:6108',
    browserName: 'chromium',
    reducedMotion: 'reduce',
    locale: 'pt-BR',
    timezoneId: 'UTC',
    trace: 'retain-on-failure',
  },
  expect: { toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0.01 } },
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'npm run serve:storybook',
    url: 'http://127.0.0.1:6108',
    reuseExistingServer: false,
    timeout: 30000,
  },
});

# Codex and Cloud

Both environments read AGENTS.md, use Node 22.16+ and npm ci, and run exactly
the validation commands in that shared file. CI is the executable reference.
No machine-specific runtime file contains a second policy.

Local Windows: install the Playwright Chromium binary with
npx playwright install chromium.
Cloud Linux: npx playwright install --with-deps chromium installs browser OS
dependencies where permitted by the runner.

Network access is needed for dependency installation, not for the built
Storybook preview. Credentials are only needed for explicitly authorized
remote work; tests use fixture data and no production secrets.

For headless validation, run npm run validate, npm run test:browser and
npm run test:visual. Baselines use pinned Chromium and bundled Inter.
Inspect changed images; never update baselines merely to hide a failure.

# Public documentation delivery

The canonical Pages target is rgomids/axiom-ds. After maintainer review and merge
to main, enable Settings > Pages > Source: GitHub Actions if not already enabled.
The Pages workflow builds and validates Storybook before uploading the static
artifact. No backend, paid service, repository secret or Chromatic subscription
is required.

PRs, including fork PRs, only run checks. They never deploy public documentation.
The publication workflow is restricted to the canonical repository. A maintainer
may run it manually. Environment protection remains under maintainer control.

For local production preview: npm run build:storybook then npm run serve:storybook.
The server binds to 127.0.0.1:6108. A different port can be passed directly to
node scripts/serve-storybook.mjs PORT.

The contributor account may require a fork. Preserve the upstream main history;
push only a feature branch and target the PR at rgomids/axiom-ds:main.

# Public documentation delivery

The canonical Pages target is rgomids/axiom-ds. After maintainer review and merge
to main, enable Settings > Pages > Source: GitHub Actions if not already enabled.
The Pages workflow builds and validates Storybook before uploading the static
artifact. No backend, paid service, repository secret or Chromatic subscription
is required.

PRs, including fork PRs, only run checks. They never deploy public documentation.
The publication workflow is restricted to the canonical repository. A maintainer
may run it manually. Environment protection remains under maintainer control.

## First deployment and recovery

The workflow verifies Pages configuration before installing dependencies or
building Storybook. This check has read-only Pages permission and explicitly
disables automatic enablement. Repository settings are not changed by a PR or
by this check; a passing build alone does not enable the site.

After approval, a maintainer must:

1. Open [Settings > Pages](https://github.com/rgomids/axiom-ds/settings/pages).
2. Under Build and deployment, select **GitHub Actions** as the source. Do not
   select a branch-based publishing source for this workflow.
3. Merge the reviewed workflow change into main, or, if already merged, run
   **Actions > Publish Storybook > Run workflow** with main selected.
4. Verify that both build and deploy succeed, then open the URL reported by the
   github-pages environment. A successful artifact upload is not proof of a
   published site.

On 2026-09-28, [run 36367720426](https://github.com/rgomids/axiom-ds/actions/runs/36367720426)
passed build, validation, visual tests and artifact upload, but deploy-pages
failed with HTTP 404 while creating the deployment. On 2026-09-29, the Pages
configuration API also returned 404. The missing site configuration must be
resolved through the setup above; rebuilding the same artifact cannot fix it.

A separate [branch check](https://github.com/rgomids/axiom-ds/actions/runs/36517520545)
failed on README formatting before building Storybook. That failure is unrelated
to the Pages 404. Run `npx prettier --write README.md` on the affected branch and
rerun validation before pushing its changes.

Reference: [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
and [configure-pages](https://github.com/actions/configure-pages).

For local production preview: npm run build:storybook then npm run serve:storybook.
The server binds to 127.0.0.1:6108. A different port can be passed directly to
node scripts/serve-storybook.mjs PORT.

The contributor account may require a fork. Preserve the upstream main history;
push only a feature branch and target the PR at rgomids/axiom-ds:main.

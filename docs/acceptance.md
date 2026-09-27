# Acceptance evidence: issues 1 and 2

Implementation date: 2026-09-27. This record supersedes the earlier gap audit
for implemented code, but never substitutes for external verification.

## Issue 1

- Public canonical repository and main branch: verified via GitHub.
- Apache-2.0, repository purpose and relation to Axiom: LICENSE, README and ADR 0001.
- Governance, dependencies and security: docs/governance.md, docs/dependencies.md,
  SECURITY.md and Dependabot configuration.
- Codex and Cloud: one shared AGENTS.md, docs/cloud.md and common npm commands.
- Portable workspace and CI: package-lock.json, npm workspaces and quality workflow.
- Notion discovery: pending external URL/access and verified update; see docs/discovery.md.
- Remote CI result: to be recorded after publication to the authorized branch.

## Issue 2

- Source-of-truth model and stack: ADR 0002, docs/penpot.md and owned component source.
- DTCG primitives, semantic/component roles and dark override: packages/tokens/src.
- CSS variables and Tailwind mapping: generated tokens and packages/ui/src/react/theme.css.
- Seven components: Button, Input, Badge, Card, Dialog, Tooltip, Tabs.
- Storybook foundations, variants, states and usage: apps/storybook.
- Formatting, lint and types: Prettier, ESLint and strict TypeScript.
- Unit/component checks: Node tests and Vitest/Testing Library.
- Browser/accessibility: Playwright + axe, keyboard behavior and modal focus.
- Regression: checked-in Playwright baselines, reviewed on desktop/mobile in both themes.
- Static hosting: Pages workflow restricted to canonical main; maintainer enables
  GitHub Actions as the Pages source when deploying.
- No paid runtime or test SaaS required.

## External boundaries

Do not claim both issues closed while Notion or remote CI remains unverified.
Do not publish via a fork: the user explicitly requested direct access to the
canonical repository and is arranging contributor permissions.
Opening a PR is separate from merging it, enabling repository settings or
closing issues; those remain under maintainer control.

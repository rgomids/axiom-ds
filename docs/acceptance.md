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
- Notion discovery: VERIFIED on 2026-09-27 by following the Discovery index
  to the existing Design System subpage. It links rgomids/axiom-ds and records
  the repository boundary and independent lifecycle. Source and observations
  are recorded in docs/discovery.md; no Notion edit was required.
- Independent bootstrap: [PR #4](https://github.com/rgomids/axiom-ds/pull/4),
  with its own manifests, lockfile, contribution baseline, workspace skeleton,
  quality workflow and repository-contract tests. Technical and external
  evidence are verified; maintainer review and merge remain pending.
- Implementation CI at commit 012f1da:
  [quality passed](https://github.com/rgomids/axiom-ds/actions/runs/36294384463)
  and [bootstrap rules passed](https://github.com/rgomids/axiom-ds/actions/runs/36294384466).
  These runs establish technical evidence for that commit, not completion of #1.
  Subsequent review-fix checks are recorded in the PR checks, by commit.

## Issue 2

- Blocked by acceptance and merge of the independent bootstrap; see
  [delivery-sequence.md](delivery-sequence.md). The original implementation
  started before that acceptance; splitting PRs does not erase this fact.
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
Both branches are published directly to the canonical repository using the
contributor access granted by the maintainer, not through a fork.
Opening a PR is separate from merging it, enabling repository settings or
closing issues; those remain under maintainer control.

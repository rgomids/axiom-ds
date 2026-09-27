# Axiom Design System: repository bootstrap

Dedicated public repository for the Axiom Design System, part of the
[Axiom Project](https://github.com/rgomids/axiom).
The product remains in rgomids/axiom; this repository owns the future tokens,
components, brand and Storybook with an independent delivery lifecycle.
License: Apache-2.0. Git is the technical source of truth.

## Scope

This branch delivers issue #1 only: governance, shared agent rules, npm
workspace skeleton and bootstrap validation. It contains no UI implementation.
Issue #2 remains blocked until #1 is accepted, including the Notion evidence.
See [delivery sequence](docs/delivery-sequence.md) and
[bootstrap acceptance](docs/bootstrap-acceptance.md).

## Local Codex and Cloud

Use Node 22.16+ and npm in either environment:

```sh
npm ci
npm run validate
```

The validation command runs formatting, lint and Node repository-contract tests.
No component build or browser checks are claimed at this stage.

## Structure

- packages/tokens: reserved token workspace.
- packages/ui: reserved component workspace.
- apps/storybook: reserved executable-documentation workspace.
- tests/visual: reserved future visual validation.
- docs: governance, discovery and decisions.
- .github: CI and dependency-update policy.

Read [AGENTS.md](AGENTS.md), [CONTRIBUTING.md](CONTRIBUTING.md),
[governance](docs/governance.md), [dependencies](docs/dependencies.md),
[security](SECURITY.md) and [Cloud setup](docs/cloud.md).
The [Notion evidence](docs/discovery.md) is an external acceptance requirement,
not a consequence of passing CI.

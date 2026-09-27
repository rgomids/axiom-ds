# Contributing

Read AGENTS.md, docs/governance.md and the issue before changing code.
Codex and Cloud use the same shared rules and commands.

## Bootstrap validation

Use Node 22.16+ and npm:

```sh
npm ci
npm run validate
```

Validation checks formatting, JavaScript lint and repository contracts.
Commit package-lock.json with dependency changes. Never commit secrets.
Use focused branches and PRs with scope, checks and remaining acceptance evidence.
Maintainers approve remote changes, releases and merges; green CI is not acceptance.

## Delivery boundary

Issue #1 owns repository bootstrap only. Empty workspace manifests reserve
packages/tokens, packages/ui and apps/storybook; no token taxonomy or UI is included.
Issue #2 stays blocked until #1, including its Notion evidence, is accepted.
See docs/delivery-sequence.md. No stable package publication is part of bootstrap.

Type checking, component tests, Storybook, visual tests and Pages will be
introduced with source code in the separate implementation delivery. They are
not represented as no-op checks in this bootstrap pipeline.

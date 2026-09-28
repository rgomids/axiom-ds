# Shared agent rules

These rules apply equally to local Codex and Cloud execution. Read this file,
README.md and the issue before changing code. Runtime-specific instructions
may link here; do not duplicate or weaken these rules.

## Boundaries

- This repository owns the Axiom design system. rgomids/axiom owns product integration.
- Git is the technical source of truth. Penpot is visual exploration; Storybook is executable documentation.
- Keep Apache-2.0, zero mandatory recurring cost and small reviewed changes.
- Preserve existing brand assets and user changes. Never reset or clean their work.
- Remote publication, credentials, deletion and merges must remain within the user's authorization.
- Never commit secrets or print credentials. Do not close issues or claim external acceptance without evidence.

## Shared workflow

Issue #2 remains blocked by acceptance of #1. See docs/delivery-sequence.md
before publishing or merging either delivery; passing CI does not waive that gate.

Use Node 22.16+ and npm. On Windows, Linux and Cloud run the same commands:

1. npm ci
2. npx playwright install chromium (Linux CI may use --with-deps)
3. npm run validate
4. npm run test:browser
5. npm run test:visual

For component development run npm run storybook. For production docs run
npm run build:storybook. Visual baseline updates use npm run test:visual:update;
inspect images and commit the reviewed baselines with the change.

## Engineering

- Tokens before new visual literals; semantic roles before raw palette names.
- Owned React/TypeScript component code follows shadcn/ui conventions. Radix owns complex accessible behavior.
- Test keyboard, focus, light/dark, narrow widths and disabled/invalid states.
- Do not edit generated dist/, examples/, resources.html or styles.css by hand.
- Keep source and generated outputs together. Record durable decisions in docs/adr.
- Cloud setup must not depend on this machine's absolute paths, paid SaaS or cached credentials.
- Report completed checks, remaining failures and unverifiable external requirements honestly.

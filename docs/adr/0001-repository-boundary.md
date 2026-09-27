# ADR 0001: independent design system repository

Status: accepted for this implementation. Related: axiom-ds#1.

rgomids/axiom-ds owns durable tokens, component code, brand resources, tests and
Storybook. rgomids/axiom consumes them and owns application business logic.
Git is canonical; Penpot explores visual decisions; Storybook demonstrates code.

Use npm workspaces packages/tokens, packages/ui and packages/brand, plus
apps/storybook. This keeps existing assets while adding a typed consumption
surface. Local Codex and Cloud share AGENTS.md and scripts.

The discovery entry must link the repository and this decision in Axiom Notion.
Its external update is tracked separately in docs/discovery.md; a local record
alone does not prove the Notion acceptance criterion.

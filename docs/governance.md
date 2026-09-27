# Governance and repository boundary

Axiom is one logical project across rgomids/axiom (product) and rgomids/axiom-ds
(tokens, UI, brand, Storybook and validation). This repository has its own
version and review lifecycle. The repository owner and authorized maintainers
decide merges and releases; contributors do not self-approve acceptance.

Changes require a focused PR, issue context, reproducible validation and review
of affected accessibility and visual states. Changes to public APIs or token
roles require a migration note and ADR. Apply SemVer with explicit 0.x changes.

Codex and Cloud both consume AGENTS.md. No runtime-specific policy fork is
necessary. Local and hosted CI use the same npm scripts and lockfile.
Static Pages hosting and open-source tools keep the baseline at R$ 0 recurring
cost. Paid services require a recorded project decision before adoption.

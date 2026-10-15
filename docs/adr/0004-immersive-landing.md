# ADR 0004: portable immersive landing and marketing patterns

Status: proposed for maintainer review.

The approved landing adds native-scroll storytelling, an organic control-plane
diagram and per-command copying. The design system must own its visual sources
and executable documentation; the product must own publication and product claims.

Keep one canonical standalone implementation in `packages/landing/src`, assembled
from section templates by `scripts/build-landing.mjs`. Generate a static
distribution plus an identical Storybook preview. This preserves the approved
experience without requiring React, a Site account, a server or paid hosting in
the product. Embedding previews in iframes isolates the intentionally document-wide
CSS/controllers from application components and the Storybook theme toolbar.

Add semantic marketing tokens without changing the existing application theme.
Retain the exact original PNG alongside the existing vectors; use viewports and
a color-preserving filter to show the mascot alone. Bundle Manrope with its OFL.
The product integration records the design-system commit and asset hashes.

For application surfaces, expose a composable React `CommandSnippet` using the
existing Button and semantic application tokens. It is separate from the
dependency-free terminal renderer; both enforce one-copy-action per command.

Do not replace the legacy landing example or publish either repository on a
feature branch. Existing bootstrap acceptance is evidenced by approved and merged
PR #4; issue #2 remains open and this change does not assert its acceptance.

Consequences: portable deployment and faithful previews, but consumers must host
the full document or intentionally adapt a pattern. Translations, commands and
browser behavior need regression checks alongside visual baselines. Full-page
marketing claims must follow current product documentation, not prototype text.

## Storytelling refinement

The maintainer requested the five-scene narrative documented in
[landing-storytelling](../landing-storytelling.md). The active composition now
uses a single persistent stage and a pure scroll/viewport state model. Its HTML
contains all five static illustrated articles for reduced motion and no-JS use.
This replaces the former logo camera followed by an independent workflow reveal;
it does not change product-domain contracts or establish human visual acceptance.

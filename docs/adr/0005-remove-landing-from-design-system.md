# ADR 0005: remove the landing from the design system

Status: accepted by maintainer instruction (Geist redesign brief, 2026-10-28).
Supersedes: [ADR 0004](0004-immersive-landing.md).

## Context

ADR 0004 placed the immersive landing, its marketing tokens, Manrope and seven
iframe-only marketing patterns in this repository. The Storybook therefore opened
partly as a marketing site. The maintainer's redesign brief states that
rgomids/axiom owns the landing and the application, and rgomids/axiom-ds owns
only the visual system.

## Decision

Remove from this repository everything that existed only for the landing:

- `packages/landing` (sources, assets, generated `dist`) and `scripts/build-landing.mjs`;
- `apps/storybook/public/landing` and the `Marketing/*` stories;
- `semantic.marketing.*` tokens (`marketing.tokens.json`) and Manrope;
- the iframe-only patterns `immersive-landing`, `solar-idea`, `chapter-navigation`,
  `site-footer`, `workflow-architecture`, `execution-graph`, and the legacy
  `landing` prototype (registry entries, examples and CSS);
- landing-only tests and visual baselines, and the `axiom-landing` CI artifact.

Kept because they are reusable: brand SVG/raster assets (including the original
mascot), application tokens, `CommandSnippet`, the Diagram Kit and the legacy
HTML component catalog.

## Consumers

rgomids/axiom PR #317 vendors the full bundle under `site/` with a manifest
pinning revision `d5c3dc4c21c47a6338f989dc3a05fae20e76cc61` and per-file SHA-256
hashes. The vendored copy does not need this repository at runtime or build time.

Its `scripts/sync-landing-page.py` re-imports from a local checkout's
`packages/landing/dist`. That still works against any pre-removal revision
(`54eff8a` on main, or the pinned `d5c3dc4`), but not against later revisions.
Migrating the landing sources into rgomids/axiom is that repository's decision
and is not performed here.

## Consequences

- GitHub Pages publishes only the Storybook catalog.
- Future landing changes happen in rgomids/axiom; brand assets can still be
  consumed from `@axion/brand`.
- The pinned revision must stay reachable: `54eff8a` is on main; `d5c3dc4`
  lives on the `feat/immersive-landing-page` branch, which should not be deleted
  until the product re-pins to a main revision or owns the sources.

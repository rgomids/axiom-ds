# Axiom immersive landing

Status: beta, awaiting team approval. This is the canonical implementation of
the approved landing prototype, separate from the older HTML landing catalog.
The full composition and every section are documented under **Marketing** in
Storybook. Git owns the sources; no Site account is required to build or host.

## Build and consume

```sh
npm ci
npm run build:landing
```

`packages/landing/dist/` is a complete static site. Copy its contents to the
product's static site directory, preserving relative paths. Serve it over HTTPS
for Clipboard API support. There is no runtime dependency, backend, CDN, build
service, framework requirement or recurring service cost.

`npm run build` also builds this distribution and the Storybook static copy.
The product repository `rgomids/axiom` owns the integration, production routing
and publication. A design-system PR is not permission to publish the product.

## Sources and inventory

| Source                                                    | Pattern / contract                                                                |
| --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/sections/navigation.html`                            | Fixed navigation, progress, language and motion controls                          |
| `src/sections/storytelling.html`, `src/story-markup.mjs`  | Five scenes with all 18 illustrated storyboard beats, generated from owned source |
| `src/sections/installation.html`                          | Keyboard tabs, terminal shell and individual command copying                      |
| `src/sections/product-status.html`                        | Available / in delivery / discovery cards                                         |
| `src/sections/closing.html`                               | Closing statement and primary/secondary calls to action                           |
| `src/sections/footer.html`                                | Mascot, links and back-to-top navigation                                          |
| `src/style.css`, `src/storytelling.css`                   | Presentation and responsive geometry                                              |
| `src/app.js`, `src/storytelling.js`, `src/story-state.js` | Native scroll, settings, narration and terminal behavior                          |
| `src/story-frames.js`, `src/storyboard-state.js`          | 18 bilingual beats, object inventories and pure reversible geometry               |

The templates compose once per document, with stable section IDs. The CSS and
controllers target a standalone document: do not inject them into an existing
application root. Use an iframe for embedded previews, or adapt individual
patterns in the product. The React `CommandSnippet` export in `@axion/ui`
provides the standalone copy interaction for application surfaces.

## Brand, tokens and motion

The PNG in `@axion/brand/raster/axiom-mascot-source.png` is the exact approved
original. SVG viewports show only the mascot and preserve its gold center.
Existing vectors are unchanged. On yellow the silhouette is black; on black
it is white. Neither the AXIOM wordmark nor its slogan is part of this pattern.

`packages/tokens/src/marketing.tokens.json` contains the semantic presentation
roles: immersive surfaces, text, action, decorative colors, typography, radius
and motion. These roles intentionally keep the approved yellow/black art
direction in both application themes; they do not override application tokens.
Percentages, viewport breakpoints and Bezier points express layout/geometry.

Manrope is bundled locally with its OFL notice. Native scrolling drives the
hero and the organic paths. Reduced motion and the explicit pause control
show all 18 illustrated beats in five scenes without the scroll sequence. Narration also has a
permanent transcript. Beats use 200svh with a reading hold and continuous transitions.
Optional ambient globe rotation, light pulses and waves never advance the story;
pause/reduced motion disable them. No narrative autoplay or scroll interception.

## States and review

Review desktop/narrow widths, PT/EN, yellow/black brand, all installation tabs,
clipboard success/unavailable, focus/keyboard, motion enabled/paused and system
reduced motion. Copy buttons copy only their command, never the whole terminal;
clipboard failures select the command and announce the manual-copy instruction.
No commands run in the browser. Installation commands and support claims must
be reconciled with the product documentation when integrating a newer release.

Source origin: approved prototype commit
`79d766196ae7982d8647a3f6da579bf0ae7f6691`, imported into versioned sources,
tokenized and reconciled with the current product documentation. The prototype
host is a visual reference, not a production dependency.

## Five-scene storytelling revision

The implementation follows [the review and five illustrated storyboards](https://github.com/rgomids/axiom/pull/317#issuecomment-6159957944) and the [motion handoff](https://github.com/rgomids/axiom/pull/317#issuecomment-6160104548).
See [the implementation contract](../../docs/landing-storytelling.md) for scene boundaries, persistent objects, fallbacks, motion, evidence and pending human acceptance.

One idea and six work nodes persist through fragmentation, organization, workflow
and inspectable results. The large mascot appears only in S3. Ordinary scene
anchors, the installation CTAs and all 18 static beats remain available.
`?scene=1` through `?scene=5` are isolated fixed-frame documentation views, not
production controls. `?preview=story` shows the full static sequence in Storybook.
`?frame=1` through `?frame=18` isolate each storyboard beat for visual comparison.
Legacy hero/workflow/editorial templates remain as prior references, but are no
longer composed into the active landing. Original brand assets are unchanged.

## Reviewed refinement — 2026-10-21

The gold remains the primary accent over almost-black navy surfaces. Marketing tokens own the palette; application theme tokens stay independent. Generated SVG supplies the translucent solar orb, luminous corona, filaments, bloom and particles without video or remote assets. Pause/reduced motion stop ambient loops. The original mascot bytes are unchanged.

Scene 3 introduces Axiom with the revised intention/decisions/agents/code/Evidence copy. Scene 4 now presents the seven-component C4 view and a six-phase workflow (Intake, Specification, Planning, Implementation, Review, Completion), four distinct specialist roles, dependency-aware tests, explicit human authority and reconciliation. The diagrams remain conceptual target architecture. Only these two intervals receive extra reading time; all 18 beats and static equivalents remain.

The final idea/possibilities cards are equal, centered squares with one direct connection and no stacked backdrop. A fixed 64×44px activation region prevents hover flicker in the chapter drawer. It expands as neutral acrylic without a decorative border; measured reserved space keeps captions and orchestration disclosures above it. Mobile chapters scroll horizontally. Keyboard, touch, Escape, PT/EN and static fallback remain supported.

The footer has Product, Solutions and Resources, real repository/documentation links, synchronized PT/EN, copyright and GitHub only. Terms explicitly link to Apache-2.0. Privacy policy is disabled because no confirmed policy URL was found; configure privacyUrl in src/footer.links.json when one exists. Do not substitute SECURITY.md for privacy or imply terms of service.

Registry patterns and Marketing stories expose the orb, C4, Execution Graph, chapter drawer, continuity and footer. Product integration must import a committed, pinned DS distribution; visual review, merge and production deployment remain separate decisions.

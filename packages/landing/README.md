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

| Source                                                    | Pattern / contract                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/sections/navigation.html`                            | Fixed navigation, progress, language and motion controls                                   |
| `src/sections/storytelling.html`                          | Five scenes: persistent idea/work, fragmentation, control plane, workflow and human choice |
| `src/sections/installation.html`                          | Keyboard tabs, terminal shell and individual command copying                               |
| `src/sections/product-status.html`                        | Available / in delivery / discovery cards                                                  |
| `src/sections/closing.html`                               | Closing statement and primary/secondary calls to action                                    |
| `src/sections/footer.html`                                | Mascot, links and back-to-top navigation                                                   |
| `src/style.css`, `src/storytelling.css`                   | Presentation and responsive geometry                                                       |
| `src/app.js`, `src/storytelling.js`, `src/story-state.js` | Native scroll, settings, narration and terminal behavior                                   |

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
show all five complete illustrated scenes without the scroll sequence. Narration also has a
permanent transcript. No autoplay, scroll interception or mandatory animation.

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
anchors, the installation CTAs and all five static articles remain available.
`?scene=1` through `?scene=5` are isolated fixed-frame documentation views, not
production controls. `?preview=story` shows the full static sequence in Storybook.
Legacy hero/workflow/editorial templates remain as prior references, but are no
longer composed into the active landing. Original brand assets are unchanged.

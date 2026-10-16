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

The subsequent storyboard comparison retains all five beats within each scene,
for 25 compositions in total. A bilingual beat inventory and pure geometry module
drive the live stage and build-time static illustrations. The accessible fallback
contains the same complete sequence. Configuration, dependencies, human gates,
execution, artifacts, review, delivery and continuity remain distinct compositions.
Sample metrics and model assignments are explicitly illustrative. This refinement
supersedes earlier compressed five-frame staging, without accepting a product GUI.

### Pacing refinement

Preserve all 25 storyboard compositions while doubling the native scroll distance
per beat to 200svh. Hold each complete composition for reading, then interpolate
geometry with quintic easing and a short scroll follower. Connection curves morph
continuously; signals reach the cards before their staggered bloom. Slow ambient
globe rotation, light pulses, energy waves and staggered decorative square zooms
are explicitly authorized in this review. The two radial connections called out
as too straight use perpendicular cubic bends; diagonal lines carry light pulses. They are independent of narrative progress and disabled by pause/reduced
motion and fixed-frame previews. No timed scene advancement or scroll capture.

Connector endpoints follow card edges and the measured viewport. Static and live
figures share the routing model. The returning idea fades during relocation and
reappears on the first workflow port; routing auxiliaries cross-fade, and the
idea-to-card silhouette and perspective interpolate numerically. This preserves
continuity without exposing disconnected intermediate geometry.

### Consolidation and orthogonal flow refinement

The latest maintainer instruction supersedes the earlier requirement to repeat
all 25 compositions. Consolidate seven redundant views into eighteen beats with
chapter lengths 4/3/2/4/5. Keep cards and titles visible as complexity accumulates,
and introduce connections only after the original octopus is fully present.
Use orthogonal segments and directional dependencies following the supplied
flowchart reference. Remove the central wordmark/subtitle; preserve the mascot.

Replace the old ray/particle/grid background with inward-moving wave fronts.
Include Claude and OpenAI marks in agent cards, identifying the actual Claude
and Codex integrations rather than claiming a separate ChatGPT adapter. Bundle
provenance/attribution and use local assets. Content-derived JS/CSS revisions
prevent cached modules from mixing versions during preview or publication.
The full five-chapter journey and all evidence/human-control beats remain.

The subsequent clutter review groups secondary tools beneath their owning fronts
and replaces nine additional tool wires with two shared lateral spines. All six
main fronts stay in focus. Grouping coordinates, badge dimensions/type and wave
intensity interpolate numerically; the tools remain part of the story rather
than disappearing when Axiom organizes them.

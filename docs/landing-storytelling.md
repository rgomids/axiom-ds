# Storytelling: five chapters, eighteen distinct beats

The five supplied storyboards establish the journey. The latest maintainer review
consolidates seven repeated compositions, retains the full concept-to-delivery
story, and replaces radial connections with an orthogonal flowchart. Source:
`packages/landing/src/story-frames.js`. Chapter lengths are 4, 3, 2, 4 and 5.

| Beat | Composition                                                          | Narrative                                             |
| ---- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| 1.1  | Gold opening                                                         | Uma ideia. Infinitas possibilidades.                  |
| 1.2  | One rotating luminous nucleus                                        | Uma intenção.                                         |
| 1.3  | Eight emerging panels                                                | Cada ideia se desdobra em muitas partes.              |
| 1.4  | Six work fronts, no connections                                      | Mais elementos. Mais decisões. Mais contextos.        |
| 2.1  | Same six fronts plus four tool/context tiles                         | Múltiplas ferramentas. Múltiplos agentes.             |
| 2.2  | Persistent cards at different depths, seven tool tiles               | O trabalho se dispersa.                               |
| 2.3  | Dense field with nine tool tiles, still disconnected                 | Agentes aceleram tarefas. Quem mantém tudo conectado? |
| 3.1  | Original octopus emerges; cards remain                               | O Axiom emerge.                                       |
| 3.2  | Straight connections organize the existing cards                     | O Axiom conecta o que estava disperso.                |
| 4.1  | Five configurable stages, with Claude/Codex example assignments      | Um processo configurável.                             |
| 4.2  | Five main stages, tests, documentation and integrations              | Dependências e contexto.                              |
| 4.3  | Two completed stages, review gate with four checks, pending delivery | Com controle humano.                                  |
| 4.4  | Six execution rows, progress 3/6 and two Runtime activity rows       | Uma visão da execução.                                |
| 5.1  | Five contributors converge into one result                           | O fluxo converge.                                     |
| 5.2  | Code/PR, tests, diff, artifacts and Evidence                         | Trabalho verificável.                                 |
| 5.3  | Five review checks and two human choices                             | Aceitar e seguir / solicitar retrabalho.              |
| 5.4  | Delivered result and five artifact icons                             | Entregue. Com evidências.                             |
| 5.5  | Idea linked to next possibilities                                    | O contexto permanece. Você segue em frente.           |

## Geometry and motion

Scroll is native, deterministic and reversible. Public progress remains 0–4;
beat anchors use `index * 4 / (frames.length - 1)`. Scene anchors derive from the
actual chapter boundaries, including variable chapter lengths. Every beat has
an anchor `#quadro-<scene>-<beat>`. Each transition spans 200svh, with the first
28% reserved for reading, quintic easing and a short scroll follower.

The six fronts retain their titles, identity and visibility through complexity
and Axiom's arrival. Tool tiles accumulate in groups of four, seven and nine before Axiom appears. Scale, rotation and
position give depth without hiding the work fronts. No card connections appear
before the mascot is fully present. Only then do straight segments grow into an
orthogonal graph with two shared lateral spines and six short branches. The nine tool tiles converge into subordinate badges beneath their owning fronts, preserving identity while keeping the six main components in focus. Secondary badges have no separate wires; the wave dims during this organization. Routing changes cross-fade through an invisible midpoint;
coordinates are never interpolated into temporary curves or diagonal edges.

The dependency graph follows the maintainer's reference: Specification to
Architecture and directly to Implementation; Architecture to Implementation;
reference docs and integrations into Implementation; Implementation to Tests and
Review; Review to Delivery. Arrowheads end at card edges. Stage cards use a
horizontal icon/title layout, and Tests uses a flask icon.

Only the original octopus is visible in the central Axiom card. Its gold detail
and original asset bytes are preserved; no wordmark or Control Plane subtitle
appears below it. Claude and OpenAI marks identify the Claude and Codex Runtime
examples. The OpenAI mark is not a claim of a separate ChatGPT integration.
Asset provenance and trademark attribution are included in the bundle NOTICE.

Broad wave fronts replace the old rays, particles and grid background. They
move inward toward the center on staggered 16-second cycles. Globe rotation,
light breathing and decorative panel zoom are independent of story progress.
Gold-to-black supernova remains in the opening. The globe reappears already
attached to the first workflow port after the mascot fades. Shape changes and
captions use continuous fades. Ambient motion never advances a scene.

## Accessibility and evidence

Pause, reduced motion and no JavaScript show all eighteen illustrated beats,
grouped into five chapters. The animated duplicate is decorative; captions and
full descriptions remain in HTML. PT/EN, keyboard navigation, individual command
copy, original mascot and local font licenses remain available. Fixed-frame
previews are deterministic. Build revisions invalidate stale JS/CSS imports.

Model assignments, PR #123, diff counts, test totals, progress and review outcomes
are conceptual examples, explicitly labeled. The illustration never executes a
Work Item, approves, merges or deploys. Tests cover desktop, 390px and 320px,
ordered compositions, persistent objects, reverse scroll, orthogonal routing,
no premature connections, accessible fallbacks, translations and clipboard.
Human review remains necessary for pacing and comprehension; Chromium checks do
not establish Safari or real-device acceptance. Product imports pin the source
Git revision and per-file hashes.

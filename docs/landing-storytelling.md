# Storyboard fidelity: five scenes, twenty-five beats

The five supplied storyboards are the composition and narrative contract. Read
frames left to right. This implementation retains all 25 beats instead of
compressing each scene into one generic diagram. Primary objects are counted
below; the small particles, energy filaments and background outlines are scenery.
The original mascot remains unchanged. Source: `packages/landing/src/story-frames.js`.

| Beat | Composition and primary objects                                                  | Narrative / caption                                   |
| ---- | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 1.1  | Gold canvas; centered headline; original navigation                              | Uma ideia. Infinitas possibilidades.                  |
| 1.2  | One luminous nucleus; horizontal energy filaments                                | Uma intenção. O ponto de partida de tudo.             |
| 1.3  | Same nucleus, orbit and particles                                                | Uma ideia. Uma necessidade, problema ou oportunidade. |
| 1.4  | Nucleus with eight emerging outline panels                                       | Cada ideia se desdobra em muitas partes.              |
| 1.5  | Nucleus with six named work fronts                                               | Mais elementos. Mais decisões. Mais contextos.        |
| 2.1  | Return focus to the same idea and energy                                         | Tudo começa com uma intenção.                         |
| 2.2  | Six fronts: requisitos, arquitetura, código, testes, revisão, entrega            | Rapidamente surgem várias frentes.                    |
| 2.3  | Nine tool/context tiles around the nucleus                                       | Múltiplas ferramentas. Múltiplos agentes.             |
| 2.4  | Six artifact surfaces; tool/context tiles recede behind them                     | O trabalho se dispersa.                               |
| 2.5  | Dense, rotated artifacts and tool/context tiles; smaller nucleus                 | Agentes aceleram tarefas. Quem mantém tudo conectado? |
| 3.1  | Same six fronts and nucleus, still dispersed                                     | O que estava disperso começa a se conectar.           |
| 3.2  | Axiom emerges at the center; six fronts converge                                 | O Axiom emerge.                                       |
| 3.3  | Central control plane with six connected fronts                                  | O Axiom conecta o que estava disperso.                |
| 3.4  | Connections stabilize against a shared grid                                      | Um fluxo coerente, com controle humano.               |
| 3.5  | Six connected fronts, luminous pedestal, vertical energy                         | Pronto para orquestração.                             |
| 4.1  | Idea, Axiom and six workflow fronts                                              | Da intenção ao fluxo.                                 |
| 4.2  | Five ordered stage cards; three Claude and two Codex example assignments         | Você define agentes, modelos e responsabilidades.     |
| 4.3  | Five main dependency stages, plus docs, integrations and tests (eight nodes)     | O resultado de cada etapa alimenta a próxima.         |
| 4.4  | Two completed-stage cards, one human gate with four checks, one pending delivery | Você revisa e decide quando avançar.                  |
| 4.5  | Six execution rows, progress 3/6, two Runtime activity rows                      | Uma visão da execução.                                |
| 5.1  | Five contributors converge into one result cube                                  | O fluxo converge.                                     |
| 5.2  | Five artifact rows: código/PR, testes, diff, artefatos, Evidence                 | Trabalho verificável.                                 |
| 5.3  | Review panel with five checks and two human alternatives                         | Aceitar e seguir / solicitar retrabalho.              |
| 5.4  | One delivered result, layered plates, pedestal and five artifact icons           | Entregue. Com evidências.                             |
| 5.5  | Idea linked to a layered next-possibilities card                                 | O contexto permanece. Você segue em frente.           |

## Motion, accessibility and meaning

Scroll is native, deterministic and reversible. The public progress range remains
0–4, with the 25 beats at `index / 6`. Every beat has a native anchor
`#quadro-<scene>-<beat>`. The five scene anchors, installation links, keyboard,
PT/EN and individual command copy remain available. Each beat now spans 200svh
(twice the previous scroll distance), with the first 28% reserved for reading and
a quintic transition over the remaining 72%. A short, time-based scroll follower
softens wheel input without intercepting it. Captions and object roles follow the
same eased transition. Cubic connectors interpolate across layouts instead of
switching their geometry at the midpoint.

A signal extends along each connection before a new card opens, with staggered
arrival and a local halo bloom. Existing connections carry a fresh impulse as the
story evolves. The idea texture rotates slowly; energy waves, lights and particles
breathe independently of narrative progress, as requested in the pacing review.
The eight decorative squares appear, enlarge and recede on staggered cycles;
this ambient zoom does not move or interrupt readable content cards.
Diagonal energy lines carry staggered light pulses. The upper-left and lower-right
connections use a perpendicular bend so their curves cannot flatten into straight
segments.
Ambient motion never advances a scene. Pause and reduced motion stop these loops;
fixed-frame previews remain deterministic. No automatic execution or approval is
added.

The previously requested gold-to-black supernova remains in the opening. The
control plane contracts into the workflow's luminous origin as the staged flow
forms. The delivery closes with the original idea connected to what comes next.
The latest storyboard takes precedence over previous simplified staging.

Reduced motion, pause and no JavaScript show **all 25 illustrated beats**, grouped
into the five scenes. The animated duplicate is decorative. Full descriptions
and captions remain in HTML. Original mascot pixels and local font licenses are
preserved. Illustrations use owned HTML/CSS/SVG rather than flattened screenshots.

Model assignments, PR #123, +247/−12, 12/12 tests, progress 3/6, statuses and
review outcomes reproduce the storyboard's examples. A visible conceptual/sample
label distinguishes them from actual capabilities, CI evidence or approval. The
illustration never changes a Work Item, accepts a delivery, merges or deploys.

## Evidence and remaining review

Tests check all 25 beats at desktop, 390px and 320px, primary-object counts,
identity continuity, reverse scroll, complete static/no-JS content, keyboard,
localization, clipboard/storage failures and XSS. QA captures every beat; ten
representative regression views cover the five scenes in desktop/mobile.
Human comparison of the compositions, pacing and visitor comprehension remains
necessary. Technical checks do not establish editorial acceptance or real-device
Safari behavior. The product imports an exact Git revision and per-file hashes.

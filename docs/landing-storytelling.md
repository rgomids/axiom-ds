# Landing storytelling: implementation candidate

Status: implemented prototype for visual review; no narrative acceptance, product
capability acceptance, merge or publication is claimed.

The maintainer's current request authorizes implementing the complete experience
described in the [review](https://github.com/rgomids/axiom/pull/317#pullrequestreview-5512493953),
[five illustrated storyboards](https://github.com/rgomids/axiom/pull/317#issuecomment-6159957944)
and [four motion documents](https://github.com/rgomids/axiom/pull/317#issuecomment-6160104548).
Those comments remain design references; suggested percentages and conceptual
screens are not product contracts or evidence of delivered functionality.

## Scene and continuity contract

| Scene            | Entry → exit                                                | Persistent elements                                        | Static fallback                                    |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| S1: idea         | Gold typography → gold core on dark                         | One idea identity                                          | Title, nucleus illustration and intent description |
| S2: complexity   | Core → scattered work and incomplete links                  | Same idea; six work cards; context/Runtime distinctions    | Fragmented composition and explanation             |
| S3: Axiom        | Existing scattered cards → connected structure              | Same cards and idea; control plane emerges separately      | Connected composition with original mascot         |
| S4: coordination | Connected structure → six-stage workflow                    | Same six cards and curved links; Runtime/agent/human roles | Full six-stage map and textual sequence            |
| S5: verification | Workflow → scope, ADRs, PR, tests, diff/Evidence and choice | Same work identities, origin and human gate                | Inspectable results and accept/rework alternatives |

All motion uses one sticky stage. One DOM nucleus persists throughout, six card
nodes retain identity, and connections follow their interpolated coordinates.
The idea is never replaced by the mascot. Axiom is absent from the large scene
until fragmentation is established. S5 connects the original idea to results;
the gate presents two alternatives and never acquires an accepted state by scroll.

## Scroll and render model

`story-state.js` is a pure function of normalized progress 0–4 and viewport mode.
T12, T23, T34 and T45 each occupy one unit. Endpoints coincide; sampling a point
does not depend on playback history. Positions are interpolated with bounded
smoothstep. These are adjustable prototype choices, not fixed timings inferred
from the reference images.

`storytelling.js` schedules one RAF on scroll, resize, fonts-ready, settings or
geometry changes. It animates transforms/opacity, derives curved path endpoints
from the same coordinates and has no perpetual timer, scroll interception,
automatic execution, fake test results or fabricated approval. The existing
gold/black palette, Manrope, original brand pixels and per-command terminal remain.

Desktop uses a wide composition. Mobile reorders the same six nodes into paired
rows, limits auxiliary context and arranges results above the human choice.
No horizontal panorama is required. Navigation is centered independently from
brand and tools. Five ordinary anchor links allow native keyboard/hash navigation.

## Accessibility and resilience

HTML always contains five complete scene articles with illustrations and prose.
Without JS, with system reduced motion or with the pause control, the articles
remain a readable sequence rather than skipping to the last frame. The animated
duplicate is decorative (`aria-hidden`); essential content is in the articles.
The installer has an HTML command available for manual copying without JS.
The installation/documentation CTAs do not require completion of the narrative.

PT-BR and EN share structure and translations use `textContent`; no HTML parsing
sink was introduced. Header focus remains visible on gold and dark backgrounds.
Motion and language controls remain accessible while the stage is sticky.

## Evidence and pending human review

Tests sample all four transitions at p={0,.25,.5,.75,1}, including reverse/fast
scroll and identity/geometry assertions. Generated QA images and desktop/mobile
videos are uploaded with CI artifacts rather than committed as dozens of binaries.
Scene baselines cover desktop/mobile, while static fallback checks include 320px,
keyboard, localization, clipboard/storage failure and no-JS rendering.

Automated evidence does not establish visitor comprehension, real-device Safari
behavior or human approval. The maintainer still reviews the composition, timing,
storyboard interpretation and conceptual/available distinction. The design system
owns these sources; the product PR imports a pinned snapshot with hashes.

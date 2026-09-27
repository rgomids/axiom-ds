# Axiom discovery evidence

Status: VERIFIED on 2026-09-27. The Notion criterion of issue #1 is satisfied;
maintainer acceptance and merge of the bootstrap are separate gates.

## Source and method

- Discovery index supplied by the user:
  https://mrgomides.notion.site/3-Discovery-Research-3dee01f2262681b6b247ff55baa0b463.
- Followed its visible link to the existing page titled
  "Design System - direcao, repository boundary e bootstrap":
  https://mrgomides.notion.site/Design-System-dire-o-repository-boundary-e-bootstrap-3e7e01f226268132be8cfa46fe7b104a.
- Read the rendered public page in the browser. No Notion content was edited;
  no authenticated or write access was needed to verify the existing record.

## Observed acceptance evidence

- Under "Estado atual - 26/09/2026", the dedicated repository link resolves
  to https://github.com/rgomids/axiom-ds. Issues #1 and #2 are linked separately.
- "Decisao de repository boundary" places rgomids/axiom and rgomids/axiom-ds
  under the same Axiom Project, with the Design System outside the product repo.
- The rationale assigns tokens, components, Storybook, visual tests and releases
  an independent lifecycle, avoiding a second build ecosystem in Go/Lingo.
- "Fases iniciais" separates repository bootstrap from Design System foundations.
- "Ownership documental" retains technical decisions, implementation, backlog
  and Evidence in GitHub; the Notion entry records direction and rationale.

This verifies both required facts: a discovery link to the dedicated repository
and a recorded repository-boundary decision. The corresponding versioned
decision remains [ADR 0001](adr/0001-repository-boundary.md).

## Previous access limitation

Earlier attempts on 2026-09-27 remained on a loading screen. A subsequent
browser session loaded Engineering and Discovery successfully, exposing the
specific Design System subpage above. That successful read supersedes the
earlier access-blocked observation; it does not assert we created the entry.

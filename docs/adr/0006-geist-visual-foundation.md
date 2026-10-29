# ADR 0006: Axiom × Geist v0.2 visual foundation

Status: accepted by maintainer brief (2026-10-28); human visual approval pending.

## Decision

- Visual direction: Geist-inspired technical minimalism. Surfaces separated by
  small luminance steps, 1px subtle borders, shadows only on floating layers,
  120–200ms motion. No proprietary Geist/Vercel code or assets are copied.
- Typography: Geist Sans (interface) and Geist Mono (code, IDs, logs, metadata),
  SIL OFL 1.1, self-hosted via `@fontsource-variable/geist{,-mono}` and exported
  as `@axion/ui/fonts.css`. No CDN dependency.
- Palette: dark canvas `#0D1117`, surface `#161B22`, border `#262E38`; light
  canvas `#FAFAFA`, surface `#FFFFFF`, border `#E9E9E9`. Actions are Deep Blue
  `#284574` (light) and `#91BCFF` (dark); Navy `#1C2E5D` is brand structure;
  gold `#EDB351` is brand-only (a test forbids it in action/status/focus roles).
- Status colors (success, warning, danger, info) own fg/subtle/border roles in
  both themes.
- Token layers stay `primitives → semantic → component → CSS → Tailwind`.
  Added: neutral/graphite/navy/sky/status primitives, typography (sans, mono,
  sizes 11–48, weights, leading, tracking), motion durations and easing
  (`cubicBezier` type), elevation, z-index, breakpoints, icon sizes, control
  heights. Existing names (`semantic.surface.*`, `text.*`, `action.*`, ...) keep
  their meaning; legacy aliases still resolve.
- Accessibility: `tests/contrast.test.mjs` proves WCAG 2.2 AA for text (4.5:1)
  and non-text/focus (3:1) pairs in both themes.

## Trade-offs

- `border.control` must reach 3:1 (WCAG 1.4.11), so field borders
  (`#868B94` light, `#6E7785` dark) are stronger than Geist's decorative
  borders. Structural borders (`border.default`) stay subtle.
- `font.tracking.*` are unitless numbers multiplied by `1em` in Tailwind,
  because DTCG dimensions allow only px/rem.

## Pending human decision

Icon buttons keep `component.icon.radius = 0` (square), approved in PR #9,
while v0.2 sets 6px for controls. Changing the single token to `{radius.sm}`
aligns them; the legacy catalog test that enforces square icons would change too.

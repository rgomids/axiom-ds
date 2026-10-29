# Theme contract

Primitives describe values. semantic.* describes stable roles; component.*
references roles when a concrete component requires a token.

The default is light. Put data-theme="dark" or data-theme="light" on html.
This also themes Radix portals. Both themes expose the same token names.
The dark override lives in packages/tokens/src/themes/dark.tokens.json.
The compiler checks existing names, matching types and alias resolution.

CSS emitted on each theme root redeclares token aliases so semantic references
resolve in that theme, including component tokens. Tailwind maps roles through
@theme inline in packages/ui/src/react/theme.css.

For React consumers import @axion/ui/theme.css once. For the old HTML catalog,
@axion/ui/css preserves compatibility; it is not the acceptance surface for the
new fully themed component slice.

## Geist v0.2 roles

See [ADR 0006](adr/0006-geist-visual-foundation.md). Semantic groups:
`surface` (canvas, default, subtle, muted, raised, selected, inverse), `text`
(primary, secondary, tertiary, disabled, link, inverse), `border` (subtle,
default, strong, control, interactive), `action` (primary, hover, active,
onPrimary, subtle, subtleHover, onSubtle), `brand` (navy, deepBlue, gold,
onGold), `status` (success/warning/danger/info + Subtle, Border, on*),
`focus.ring`, `selection.background`, `overlay` and `elevation`
(raised, floating, modal). Tailwind names: `bg-surface-subtle`,
`text-fg-tertiary`, `border-input`, `bg-primary-subtle`, `text-success`, ...

Load fonts once with `import '@axion/ui/fonts.css'`.

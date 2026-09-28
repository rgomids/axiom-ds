# ADR 0002: typed component foundation

Status: accepted for implementation. Related: axiom-ds#2.

Adopt React 19 + TypeScript, Tailwind 4, owned shadcn/ui source and Radix
Primitives for Dialog, Tabs, Tooltip and slot composition. The first slice
contains Button, Input, Badge, Card, Dialog, Tooltip and Tabs.
Upstream registry: https://ui.shadcn.com/r/styles/new-york-v4/
Retrieved 2026-09-27; MIT notice retained in packages/ui/SHADCN-LICENSE.
Local changes map colors and dimensions to Axiom tokens and fix themed contrast.

Storybook 10/Vite documents foundations, variants, states and usage. Tailwind
maps semantic DTCG tokens to CSS utilities; no Style Dictionary is needed.
Portals inherit the theme on the document root. Consumers use data-theme on
html; nested independent theme islands are not supported in this first slice.

The earlier HTML catalog and nine HTML examples remain compatibility references,
not the new component acceptance surface. This preserves the approved brand
without mistaking static page mockups for interactive product components.

GitHub Pages hosts the static Storybook. No SaaS test service is required.
Playwright compares checked-in baselines and runs axe against both themes.
Inter is bundled locally for Storybook so builds do not depend on Google Fonts.

# Changelog

## Unreleased

### Added

- 40+ React components across Actions, Forms, Data Display, Navigation,
  Overlays and Feedback (see docs/redesign-geist.md), with documented stories.
- `useDataTable` headless model; dependencies cmdk, sonner, react-day-picker.
- Accessibility sweep (axe, WCAG 2.2 AA tags) over every story in both themes,
  browser keyboard tests for overlays, and new visual baselines.

### Changed

- Geist v0.2 foundation (ADR 0006): Geist Sans/Mono, expanded light/dark
  semantic roles, status palettes, typography, motion, elevation, z-index,
  breakpoints and control heights; WCAG AA contrast proven by tests.
- Button gains `loading`; Badge gains status, subtle, brand and `mono` variants;
  all existing components restyled with tokens.
- Storybook Foundations: Colors, Typography, Spacing, Radius, Shadows, Motion, Icons.

### Removed

- Landing imersiva (`packages/landing`), padrões de marketing, tokens
  `semantic.marketing.*`, Manrope e stories Marketing. A landing continua em
  rgomids/axiom, fixada na revisão `d5c3dc4` (ADR 0005).

## 0.3.0 - em revisão

- Landing imersiva beta em pacote estático, com dez padrões documentados no Storybook.
- Tokens semânticos de marketing, Manrope local e mascote original com dourado preservado.
- CommandSnippet React: copiar por comando, estados de sucesso, erro e desabilitado.
- Build reproduzível para integração separada no produto, sem publicação nesta branch.

## 0.2.0 - 2026-09-27

- Git local dedicado e tres pacotes npm workspaces.
- Tokens DTCG em camadas, geracao CSS/JSON e validacao de referencias.
- Estilos por recurso, escopo .axion e estados de controles.
- SVGs aprovados em packages/brand/svg.
- Exemplos individuais, indice de recursos, contratos e workflow CI.

### Migracao

Use class="axion" no container que consome a biblioteca.
Os SVGs passaram de assets/brand para packages/brand/svg.
styles.css agora e gerado. Edite packages/ui/src e execute npm run build.

## 0.1.0

- Catalogo inicial com dashboard, landing e marca vetorial.

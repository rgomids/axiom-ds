# Axiom × Geist v0.2 redesign

Plan, inventory and traceability for the maintainer brief of 2026-10-28
("Axiom Design System — Redesign Geist-Inspired + Complete Component Library").
Status values: `done` (implemented, story, tests), `partial`, `planned`.

## Inventory (main @ 54eff8a)

- npm workspaces: `@axion/tokens` (DTCG → CSS/JSON via `scripts/tokens.mjs`),
  `@axion/ui` (React + Tailwind 4 + Radix + owned shadcn/ui, Diagram Kit, legacy
  HTML catalog), `@axion/brand` (SVG/raster), `@axion/landing` (removed, ADR 0005),
  `apps/storybook` (Storybook 10/Vite).
- React components: Button, Input, Badge, Card, Dialog, Tooltip, Tabs,
  CommandSnippet; Diagram Kit (`@axion/ui/diagrams`).
- Tokens: 17 semantic roles, light + dark override, Inter, radius sm/md,
  two shadows, two motion durations.
- Validation: `npm run validate` (format, lint, tsc, build, node tests, vitest,
  Storybook build), `test:browser` (legacy catalog + diagrams), `test:visual`
  (Playwright baselines light/dark × 1280/390 + axe). Baselines are rendered on
  Linux (CI); regenerate them in the `mcr.microsoft.com/playwright` image.
- Consumers: rgomids/axiom vendors the landing bundle (ADR 0005) and references
  token values in `site/styles.css`; no package consumer of `@axion/ui` exists yet.
- Namespace `@axion/*` is kept; renaming is a separate decision.

## Phases and PRs

| Phase | Delivery                                                             | Branch / PR                             |
| ----- | -------------------------------------------------------------------- | --------------------------------------- |
| 0–1   | Inventory, plan, landing removal, Storybook information architecture | `claude/axiom-ds-geist-redesign-2d8f95` |
| 2     | Geist tokens, fonts, themes, foundations docs                        | stacked on 0–1                          |
| 3–4   | Actions, Forms, Data Display, Navigation, Overlays, Feedback         | stacked on 2                            |
| 5     | Patterns and complete examples                                       | stacked on 3–4                          |
| 6     | Final tests, a11y, docs reconciliation                               | within each PR                          |

## Dependencies (decisions)

| Need                 | Choice                                             | Why                                                  |
| -------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| Geist Sans / Mono    | `@fontsource-variable/geist`, `…/geist-mono`       | OFL-1.1, local woff2, same pattern as existing Inter |
| Accessible behaviour | `radix-ui` (already adopted)                       | Select, Popover, Menu, Slider, Accordion, etc.       |
| Command palette      | `cmdk`                                             | MIT, Radix-based, shadcn reference                   |
| Toast                | `sonner`                                           | MIT, shadcn reference, accessible live region        |
| Calendar             | `react-day-picker`                                 | MIT, keyboard grid, shadcn reference                 |
| DataTable            | `@tanstack/react-table` (if headless model needed) | MIT, sorting/filter/pagination/selection model       |
| Drawer / Sheet       | Radix Dialog (no `vaul`)                           | Avoid a dependency for a side panel                  |

## Component matrix

`Component → Implementation → Story → Tests → Status`. Updated per phase.

| Category     | Component                                                                                                                                                              | Implementation              | Story                           | Tests                        | Status                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------- | ---------------------------- | ------------------------------ |
| Actions      | Button                                                                                                                                                                 | `react/button.tsx`          | Components/Actions/Button       | unit, visual, axe            | partial (restyle in phase 2–3) |
| Actions      | IconButton, ButtonGroup, Toggle, ToggleGroup, CopyButton                                                                                                               | —                           | —                               | —                            | planned                        |
| Forms        | Input                                                                                                                                                                  | `react/input.tsx`           | Components/Forms/Input          | unit, visual, axe            | partial                        |
| Forms        | Label, Textarea, Checkbox, RadioGroup, Switch, Select, Combobox, SearchField, NumberField, Slider, FormField, FormMessage, FileUpload, Calendar, DatePicker            | —                           | —                               | —                            | planned                        |
| Data Display | Badge                                                                                                                                                                  | `react/badge.tsx`           | Components/Data Display/Badge   | visual, axe                  | partial                        |
| Data Display | Card                                                                                                                                                                   | `react/card.tsx`            | Components/Data Display/Card    | visual, axe                  | partial                        |
| Data Display | StatusBadge, Avatar, AvatarGroup, MetricCard, Separator, Table, DataTable, Progress, Skeleton, Spinner, EmptyState, Accordion, CodeBlock, Kbd, Statistic               | —                           | —                               | —                            | planned                        |
| Data Display | Tooltip                                                                                                                                                                | `react/tooltip.tsx`         | Components/Data Display/Tooltip | keyboard, visual, axe        | partial                        |
| Navigation   | Tabs                                                                                                                                                                   | `react/tabs.tsx`            | Components/Navigation/Tabs      | keyboard, visual, axe        | partial                        |
| Navigation   | Breadcrumb, Pagination, Sidebar, NavigationMenu, Stepper                                                                                                               | —                           | —                               | —                            | planned                        |
| Overlays     | Dialog                                                                                                                                                                 | `react/dialog.tsx`          | Components/Overlays/Dialog      | focus, keyboard, visual, axe | partial                        |
| Overlays     | AlertDialog, Sheet, Popover, DropdownMenu, ContextMenu, Command                                                                                                        | —                           | —                               | —                            | planned                        |
| Feedback     | Alert, Toast, Banner, LoadingIndicator, ErrorState, SuccessState                                                                                                       | —                           | —                               | —                            | planned                        |
| Patterns     | CommandSnippet                                                                                                                                                         | `react/command-snippet.tsx` | Patterns/Terminal               | unit, visual, axe            | partial                        |
| Patterns     | Diagram Kit                                                                                                                                                            | `diagrams/*`                | Patterns/Execution Graph        | browser, unit                | done (pre-existing)            |
| Patterns     | DashboardShell, Toolbar, ExecutionTimeline, WorkflowStepper, LogViewer, EvidencePanel, ResourceDetails, SettingsForm, MetricOverview, EmptyDashboard, DataTableToolbar | —                           | —                               | —                            | planned                        |

## Risks

- Visual approval is human; green CI does not imply it.
- Restyling every component rewrites all visual baselines; diffs are reviewed
  per phase before committing.

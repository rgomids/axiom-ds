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

`Component → Implementation → Story → Tests → Status`. Implementations live in `packages/ui/src/react/`. "a11y" means the axe sweep over every story in both themes at 390px (`tests/visual/a11y.spec.ts`).

| Category     | Component                                                                                                                                                              | Implementation                                                  | Story                                | Tests                                | Status              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------ | ------------------------------------ | ------------------- |
| Actions      | Button (+loading, sizes, variants)                                                                                                                                     | button.tsx                                                      | Components/Actions/Button            | unit, visual, a11y                   | done                |
| Actions      | IconButton                                                                                                                                                             | icon-button.tsx                                                 | Components/Actions/IconButton        | a11y                                 | done                |
| Actions      | ButtonGroup                                                                                                                                                            | button-group.tsx                                                | Components/Actions/ButtonGroup       | a11y                                 | done                |
| Actions      | Toggle, ToggleGroup                                                                                                                                                    | toggle.tsx, toggle-group.tsx                                    | Components/Actions/Toggle            | unit (keyboard), visual, a11y        | done                |
| Actions      | CopyButton                                                                                                                                                             | copy-button.tsx                                                 | Components/Actions/CopyButton        | unit, a11y                           | done                |
| Forms        | Label, Input, Textarea                                                                                                                                                 | label.tsx, input.tsx, textarea.tsx                              | Components/Forms/*                   | unit, visual, a11y                   | done                |
| Forms        | Checkbox, RadioGroup, Switch                                                                                                                                           | checkbox.tsx, radio-group.tsx, switch.tsx                       | Components/Forms/*                   | unit (keyboard), visual, a11y        | done                |
| Forms        | Select                                                                                                                                                                 | select.tsx                                                      | Components/Forms/Select              | browser keyboard, a11y               | done                |
| Forms        | Combobox                                                                                                                                                               | combobox.tsx                                                    | Components/Forms/Combobox            | unit + browser keyboard, a11y        | done                |
| Forms        | SearchField, NumberField, Slider                                                                                                                                       | search-field.tsx, number-field.tsx, slider.tsx                  | Components/Forms/*                   | unit (keyboard), a11y                | done                |
| Forms        | FormField, FormMessage                                                                                                                                                 | form-field.tsx                                                  | Components/Forms/FormField           | unit, visual, a11y                   | done                |
| Forms        | FileUpload                                                                                                                                                             | file-upload.tsx                                                 | Components/Forms/FileUpload          | unit, visual, a11y                   | done                |
| Forms        | Calendar, DatePicker                                                                                                                                                   | calendar.tsx, date-picker.tsx                                   | Components/Forms/DatePicker          | browser keyboard, a11y               | done                |
| Data Display | Badge, StatusBadge                                                                                                                                                     | badge.tsx, status-badge.tsx                                     | Components/Data Display/*            | visual, a11y, reduced motion         | done                |
| Data Display | Avatar, AvatarGroup                                                                                                                                                    | avatar.tsx                                                      | Components/Data Display/Avatar       | a11y                                 | done                |
| Data Display | Card, MetricCard, Statistic                                                                                                                                            | card.tsx, metric-card.tsx                                       | Components/Data Display/*            | visual, a11y                         | done                |
| Data Display | Separator, Kbd, Progress, Skeleton, Spinner                                                                                                                            | separator.tsx, kbd.tsx, progress.tsx, skeleton.tsx, spinner.tsx | Components/Data Display/Progress     | a11y                                 | done                |
| Data Display | Table, DataTable (+useDataTable)                                                                                                                                       | table.tsx, data-table.tsx, use-data-table.ts                    | Components/Data Display/*            | unit, browser, visual, a11y          | done                |
| Data Display | Tooltip, Accordion, CodeBlock                                                                                                                                          | tooltip.tsx, accordion.tsx, code-block.tsx                      | Components/Data Display/*            | keyboard, visual, a11y               | done                |
| Data Display | EmptyState                                                                                                                                                             | empty-state.tsx                                                 | Components/Feedback/States           | visual, a11y                         | done                |
| Navigation   | Tabs, Breadcrumb, Pagination                                                                                                                                           | tabs.tsx, breadcrumb.tsx, pagination.tsx                        | Components/Navigation/*              | unit, keyboard, visual, a11y         | done                |
| Navigation   | Sidebar, NavigationMenu, Stepper                                                                                                                                       | sidebar.tsx, navigation-menu.tsx, stepper.tsx                   | Components/Navigation/*              | unit, visual, a11y                   | done                |
| Overlays     | Dialog, AlertDialog, Sheet                                                                                                                                             | dialog.tsx, alert-dialog.tsx, sheet.tsx                         | Components/Overlays/*                | browser focus/keyboard, visual, a11y | done                |
| Overlays     | Popover, DropdownMenu, ContextMenu                                                                                                                                     | popover.tsx, dropdown-menu.tsx, context-menu.tsx                | Components/Overlays/*                | browser keyboard, a11y               | done                |
| Overlays     | Command / CommandPalette                                                                                                                                               | command.tsx                                                     | Components/Overlays/Command          | browser keyboard, a11y               | done                |
| Feedback     | Alert, Banner                                                                                                                                                          | alert.tsx                                                       | Components/Feedback/Alert            | unit, visual, a11y                   | done                |
| Feedback     | Toast                                                                                                                                                                  | toast.tsx                                                       | Components/Feedback/Toast            | a11y                                 | done                |
| Feedback     | LoadingIndicator, ErrorState, SuccessState                                                                                                                             | empty-state.tsx                                                 | Components/Feedback/States           | visual, a11y                         | done                |
| Patterns     | CommandSnippet                                                                                                                                                         | command-snippet.tsx                                             | Patterns/Logs/CommandSnippet         | unit, visual, a11y                   | done                |
| Patterns     | Diagram Kit                                                                                                                                                            | diagrams/*                                                      | Patterns/Execution Graph/Diagram Kit | browser, unit, a11y                  | done (pre-existing) |
| Patterns     | DashboardShell, Toolbar, ExecutionTimeline, WorkflowStepper, LogViewer, EvidencePanel, ResourceDetails, SettingsForm, MetricOverview, EmptyDashboard, DataTableToolbar | —                                                               | —                                    | —                                    | planned (phase 5)   |

## Risks

- Visual approval is human; green CI does not imply it.
- Restyling every component rewrites all visual baselines; diffs are reviewed
  per phase before committing.

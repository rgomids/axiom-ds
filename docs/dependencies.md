# Dependency policy

Commit package-lock.json and use npm ci. Pin direct dependencies. Review npm
and GitHub Actions updates weekly with Dependabot. Inspect release notes,
transitive changes, licenses and bundle impact; major versions require explicit
review. Never auto-merge an update solely because it is green.

Run validation, browser/accessibility checks and visual comparisons for updates.
Use npm audit as triage evidence; do not blindly run npm audit fix --force.
Security fixes take precedence according to impact. Document accepted risks.
Do not add Style Dictionary until token transformation complexity warrants an ADR.

## Runtime dependencies of @axion/ui (2026-10-28)

| Package                                    | Version | License | Why                                                    |
| ------------------------------------------ | ------- | ------- | ------------------------------------------------------ |
| `@fontsource-variable/geist`, `geist-mono` | 5.3.0   | OFL-1.1 | Self-hosted Geist Sans/Mono (ADR 0006)                 |
| `cmdk`                                     | 1.1.1   | MIT     | Command palette and Combobox filtering                 |
| `sonner`                                   | 2.0.8   | MIT     | Accessible toast region                                |
| `react-day-picker`                         | 10.0.2  | MIT     | Calendar grid with keyboard support (pulls `date-fns`) |

Not adopted: `@tanstack/react-table` 9.x (new major with a reworked API).
`useDataTable` covers filter/sort/pagination/selection in ~120 lines; adopting a
table engine is a separate decision when virtualization, grouping or column
pinning are required. `vaul` is not used; Sheet is built on Radix Dialog.

Lockfile changes must be produced with the CI npm (Node 22 / npm 10), e.g.
`docker run --rm -v "$PWD":/w -w /w node:22 npm install --package-lock-only`;
newer npm versions drop optional `@emnapi/*` entries and break `npm ci` on Linux.

# Dependency policy

Commit package-lock.json and use npm ci. Pin direct dependencies. Review npm
and GitHub Actions updates weekly with Dependabot. Inspect release notes,
transitive changes, licenses and bundle impact; major versions require explicit
review. Never auto-merge an update solely because it is green.

Run validation, browser/accessibility checks and visual comparisons for updates.
Use npm audit as triage evidence; do not blindly run npm audit fix --force.
Security fixes take precedence according to impact. Document accepted risks.
Do not add Style Dictionary until token transformation complexity warrants an ADR.

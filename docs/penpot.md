# Penpot workflow

Penpot is optional, open-source visual exploration. Its absence never prevents
a build, test run or consumption of this repository.

1. Import the SVGs from packages/brand/svg into the project design file.
2. Use packages/tokens/src/*.tokens.json and the dark override as the named
   foundation reference. Penpot import tooling may vary; there is no claimed
   automatic bidirectional synchronization.
3. Explore a small component slice, including focus, disabled, invalid and dark states.
4. Link the design revision in the PR and reconcile accepted decisions into
   tokens, component code, Storybook and ADRs.
5. Review code and visual baselines in Git. A design-only change is not a release.

No hosted Penpot account or recurring subscription is required to maintain the
baseline; self-hosting is available for teams that need private design files.

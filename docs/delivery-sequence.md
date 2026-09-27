# Delivery sequence: issue 1 before issue 2

## Recovery of the delivery boundary

The original design-system branch implemented issue #2 before all acceptance
criteria of #1 were verified. Splitting delivery does not rewrite that fact
or waive the dependency. The earlier commits remain in history.

- issue-1-bootstrap targets main and contains only repository governance,
  npm workspace skeleton, contribution instructions and meaningful bootstrap CI.
- design-system is reviewed against issue-1-bootstrap, separating the UI,
  tokens, brand, Storybook and browser/visual validation from bootstrap.
- Both deliveries remain draft until their own acceptance gates are met.

## Acceptance and merge order

1. Verify bootstrap CI and the Notion repository-boundary record described in
   docs/discovery.md. A supplied URL alone is not evidence of its content.
2. Obtain maintainer acceptance of #1 and merge the bootstrap PR into main.
3. Retarget the implementation PR to main, incorporating the merged bootstrap
   if necessary. Recheck its diff and rerun all required CI before review.
4. Only then approve and merge the implementation for #2.

Never merge the implementation into the bootstrap branch: that would mix scopes
again. Do not close issues or change this dependency automatically. Stacking PRs
is a review arrangement, not permission to bypass #1's Definition of Done.

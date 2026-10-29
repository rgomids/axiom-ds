import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { flatten, resolve, loadTokens } from '../scripts/tokens.mjs';

const luminance = (color) =>
  color.components
    .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4))
    .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (tokens, a, b) => {
  const x = luminance(resolve(tokens, 'semantic.' + a));
  const y = luminance(resolve(tokens, 'semantic.' + b));
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const surfaces = ['surface.canvas', 'surface.default', 'surface.subtle', 'surface.muted'];
// WCAG 2.2 AA: 1.4.3 text 4.5:1, 1.4.11 non-text UI and focus indicators 3:1.
const pairs = [
  ...['text.primary', 'text.secondary', 'text.tertiary', 'text.link', 'action.primary'].flatMap(
    (fg) => surfaces.map((bg) => [fg, bg, 4.5]),
  ),
  ...['status.success', 'status.warning', 'status.danger', 'status.info'].flatMap((fg) => [
    [fg, 'surface.default', 4.5],
    [fg, 'surface.canvas', 4.5],
    [fg, fg + 'Subtle', 4.5],
  ]),
  ...['success', 'warning', 'danger', 'info']
    .map((s) => ['on' + s[0].toUpperCase() + s.slice(1), s])
    .map(([on, s]) => ['status.' + on, 'status.' + s, 4.5]),
  ['action.onPrimary', 'action.primary', 4.5],
  ['action.onPrimary', 'action.hover', 4.5],
  ['action.onPrimary', 'action.active', 4.5],
  ['action.onSubtle', 'action.subtle', 4.5],
  ['action.onSubtle', 'action.subtleHover', 4.5],
  ['text.primary', 'surface.selected', 4.5],
  ['text.inverse', 'surface.inverse', 4.5],
  ['brand.onGold', 'brand.gold', 4.5],
  ...surfaces.map((bg) => ['border.control', bg, 3]),
  ...surfaces.map((bg) => ['focus.ring', bg, 3]),
  ['focus.ring', 'surface.selected', 3],
];

test('semantic color pairs meet WCAG 2.2 AA in light and dark', async () => {
  const light = await loadTokens();
  const dark = {
    ...light,
    ...flatten(JSON.parse(await readFile('packages/tokens/src/themes/dark.tokens.json', 'utf8'))),
  };
  const failures = [];
  for (const [theme, tokens] of [
    ['light', light],
    ['dark', dark],
  ])
    for (const [fg, bg, min] of pairs) {
      const value = ratio(tokens, fg, bg);
      if (value < min) failures.push(theme + ' ' + fg + '/' + bg + ' ' + value.toFixed(2));
    }
  assert.deepEqual(failures, []);
});

test('gold is a brand accent, never an action or status role', async () => {
  const tokens = await loadTokens();
  const gold = JSON.stringify(resolve(tokens, 'semantic.brand.gold'));
  for (const name of Object.keys(tokens).filter((n) =>
    /^semantic\.(action|status|focus)\./.test(n),
  ))
    assert.notEqual(JSON.stringify(resolve(tokens, name)), gold, name);
});

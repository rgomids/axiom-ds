import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { flatten, resolve, loadTokens } from '../scripts/tokens.mjs';

test('light and dark expose identical roles and accessible text pairs', async () => {
  const light = await loadTokens();
  const override = flatten(
    JSON.parse(await readFile('packages/tokens/src/themes/dark.tokens.json', 'utf8')),
  );
  for (const [name, token] of Object.entries(override)) {
    assert.ok(light[name], name);
    assert.equal(token.$type, light[name].$type);
  }
  const luminance = (color) =>
    color.components
      .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4))
      .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
  for (const tokens of [light, { ...light, ...override }]) {
    for (const [foreground, background] of [
      ['text.primary', 'surface.default'],
      ['text.muted', 'surface.default'],
      ['action.onPrimary', 'action.primary'],
      ['status.onDanger', 'status.danger'],
    ]) {
      const a = luminance(resolve(tokens, 'semantic.' + foreground));
      const b = luminance(resolve(tokens, 'semantic.' + background));
      assert.ok(
        (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5,
        foreground + '/' + background,
      );
    }
    assert.deepEqual(
      resolve(tokens, 'component.button.background'),
      resolve(tokens, 'semantic.action.primary'),
    );
  }
});

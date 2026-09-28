import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import postcss from 'postcss';
import { parse } from 'parse5';
import { resolve, loadTokens, cssValue } from '../scripts/tokens.mjs';

test('all token aliases resolve and values can be emitted as CSS', async () => {
  const tokens = await loadTokens();
  for (const [name, token] of Object.entries(tokens))
    assert.ok(cssValue(token.$type, resolve(tokens, name)), name);
});
test('invalid, cyclic and type-mismatched references fail the build', () => {
  assert.throws(() => resolve({}, 'missing'), /Unknown/);
  assert.throws(
    () =>
      resolve({ a: { $type: 'color', $value: '{b}' }, b: { $type: 'color', $value: '{a}' } }, 'a'),
    /Circular/,
  );
  assert.throws(
    () => resolve({ a: { $type: 'color', $value: '{b}' }, b: { $type: 'number', $value: 1 } }, 'a'),
    /mismatch/,
  );
});
test('generated CSS has no unresolved variables or unscoped component rules', async () => {
  const root = postcss.parse(await readFile('packages/ui/dist/axion.css', 'utf8'));
  const defined = new Set();
  root.walkDecls((decl) => {
    if (decl.prop.startsWith('--')) defined.add(decl.prop);
  });
  root.walkDecls((decl) => {
    for (const match of decl.value.matchAll(/var\((--[\w-]+)/g))
      assert.ok(defined.has(match[1]), match[1]);
  });
  root.walkRules((rule) => {
    const onlyVariables = rule.nodes.every(
      (node) => node.type === 'decl' && node.prop.startsWith('--'),
    );
    for (const selector of rule.selectors)
      assert.ok(onlyVariables || selector.includes('.axion'), selector);
  });
});
test('primary and hover button contrast meet 4.5:1 for normal text', async () => {
  const tokens = await loadTokens();
  const luminance = (color) =>
    color.components
      .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4))
      .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
  const text = luminance(resolve(tokens, 'semantic.action.onPrimary'));
  for (const name of ['semantic.action.primary', 'semantic.action.hover']) {
    const background = luminance(resolve(tokens, name));
    assert.ok(
      (Math.max(text, background) + 0.05) / (Math.min(text, background) + 0.05) >= 4.5,
      name,
    );
  }
});
test('registry entries, generated examples and brand assets exist', async () => {
  const registry = JSON.parse(await readFile('registry.json', 'utf8'));
  assert.equal(new Set(registry.resources.map((r) => r.id)).size, registry.resources.length);
  for (const r of registry.resources)
    for (const path of [r.source, r.documentation, r.example]) await access(path);
  const brand = JSON.parse(await readFile('packages/brand/manifest.json', 'utf8'));
  for (const asset of brand.assets) await access('packages/brand/' + asset.file);
});
test('generated component examples contain no duplicate IDs', async () => {
  const registry = JSON.parse(await readFile('registry.json', 'utf8'));
  for (const resource of registry.resources) {
    const ids = new Set();
    const visit = (node) => {
      const id = node.attrs?.find((a) => a.name === 'id')?.value;
      if (id) {
        assert.ok(!ids.has(id), resource.id + ': ' + id);
        ids.add(id);
      }
      node.childNodes?.forEach(visit);
    };
    visit(parse(await readFile(resource.example, 'utf8')));
  }
});

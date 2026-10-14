import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';

test('landing is assembled, portable and preserves the exact approved mascot', async () => {
  const html = await readFile('packages/landing/dist/index.html', 'utf8');
  assert.ok(!html.includes('{{'));
  assert.ok(!html.includes('chatgpt.site'));
  assert.ok(!html.includes('install.ps1'));
  const seen = new Set();
  async function visit(node) {
    for (const attr of node.attrs ?? []) {
      if (attr.name === 'id') {
        assert.ok(!seen.has(attr.value), attr.value);
        seen.add(attr.value);
      }
      if (['src', 'href'].includes(attr.name) && !/^(#|https:|mailto:)/.test(attr.value)) {
        await readFile('packages/landing/dist/' + attr.value);
      }
    }
    for (const child of node.childNodes ?? []) await visit(child);
  }
  await visit(parse(html));
  const hash = createHash('sha256')
    .update(await readFile('packages/landing/dist/assets/axiom-logo.png'))
    .digest('hex');
  assert.equal(hash, 'c58970cd0bfda80a8c46e22bfdb0218eba9d75ff4c41b80f4d476b2492cf812f');
  assert.equal(html, await readFile('apps/storybook/public/landing/index.html', 'utf8'));
});

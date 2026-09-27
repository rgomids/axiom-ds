import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const json = async (path) => JSON.parse(await readFile(path, 'utf8'));

test('repository policies and delivery boundaries are versioned', async () => {
  for (const path of [
    'LICENSE',
    'README.md',
    'AGENTS.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    'docs/governance.md',
    'docs/dependencies.md',
    'docs/cloud.md',
    'docs/adr/0001-repository-boundary.md',
    'docs/discovery.md',
    'docs/delivery-sequence.md',
    '.github/workflows/quality.yml',
  ])
    assert.ok((await readFile(path, 'utf8')).trim().length > 20, path);
});

test('workspace boundaries remain private and consistently named', async () => {
  const root = await json('package.json');
  assert.equal(root.private, true);
  assert.equal(root.license, 'Apache-2.0');
  assert.deepEqual(root.workspaces, ['packages/*', 'apps/*']);
  for (const [path, name] of [
    ['packages/tokens', '@axion/tokens'],
    ['packages/ui', '@axion/ui'],
    ['apps/storybook', '@axion/storybook'],
  ]) {
    const manifest = await json(path + '/package.json');
    assert.equal(manifest.name, name);
    assert.equal(manifest.private, true);
  }
});

test('lockfile agrees with root manifest and includes reserved workspaces', async () => {
  const root = await json('package.json');
  const lock = await json('package-lock.json');
  assert.equal(lock.lockfileVersion, 3);
  assert.equal(lock.packages[''].name, root.name);
  assert.deepEqual(lock.packages[''].devDependencies, root.devDependencies);
  for (const path of ['packages/tokens', 'packages/ui', 'apps/storybook'])
    assert.ok(lock.packages[path], path);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { frames, workContent } from '../packages/landing/src/story-frames.js';
import { storyState, frameState, connectionPath } from '../packages/landing/src/story-state.js';
test('all 25 storyboard beats remain ordered in five complete scenes', () => {
  assert.equal(frames.length, 25);
  for (let scene = 1; scene <= 5; scene++) {
    const group = frames.filter((f) => f.scene === scene);
    assert.equal(group.length, 5);
    assert.deepEqual(
      group.map((f) => f.beat),
      [1, 2, 3, 4, 5],
    );
  }
  assert.equal(frames[24].layout, 'continuity');
});
test('idea expands into eight outlines, six fronts, nine tools and scattered artifacts before Axiom', () => {
  assert.equal(frameState(3).ghosts.filter((n) => n.opacity > 0.5).length, 8);
  assert.equal(frameState(4).works.filter((n) => n.opacity === 1).length, 6);
  assert.equal(frameState(7).tools.filter((n) => n.opacity === 1).length, 9);
  assert.equal(frameState(8).works.filter((n) => n.opacity === 1).length, 6);
  for (let i = 0; i < 11; i++) assert.equal(frameState(i).hub.opacity, 0);
  assert.equal(frameState(12).hub.opacity, 1);
});
test('orchestration includes five lanes, eight dependency nodes, four gate cards and six execution rows', () => {
  assert.deepEqual(
    frames.slice(15, 20).map((f) => f.layout),
    ['map', 'lanes', 'dependencies', 'human-gate', 'execution'],
  );
  assert.equal(frameState(16).works.filter((n) => n.opacity === 1).length, 5);
  assert.equal(
    frameState(17).works.filter((n) => n.opacity === 1).length +
      frameState(17).contexts.filter((n) => n.opacity === 1).length,
    8,
  );
  assert.equal(frameState(18).works.filter((n) => n.opacity === 1).length, 4);
  assert.equal(frameState(19).works.filter((n) => n.opacity === 1).length, 6);
  assert.equal(workContent(16, 2).agent, 'Codex · o4-mini');
  assert.equal(workContent(16, 0).agent, 'Claude · Sonnet 4');
});
test('delivery shows convergence, five artifacts, human choice, delivered result and next idea', () => {
  assert.deepEqual(
    frames.slice(20).map((f) => f.layout),
    ['convergence', 'evidence', 'decision', 'delivered', 'continuity'],
  );
  assert.equal(frameState(21).works.filter((n) => n.opacity === 1).length, 5);
  assert.equal(frameState(22).decision, 1);
  assert.equal(frameState(23).chips, 1);
  assert.equal(frameState(24).ideaCard, 1);
  assert.equal(frameState(24).continuity, 1);
  for (const f of frames) assert.ok(!Object.hasOwn(f, 'accepted'));
});
test('scroll state is reversible, finite and continuous for visible objects at every beat boundary', () => {
  for (const narrow of [false, true])
    for (let i = 1; i < 24; i++) {
      const a = storyState((i - 0.000001) / 6, narrow),
        b = storyState((i + 0.000001) / 6, narrow);
      for (const group of ['works', 'tools', 'ghosts'])
        a[group].forEach((n, j) => {
          assert.ok(Math.abs(n.x - b[group][j].x) < 0.001);
          assert.ok(Math.abs(n.y - b[group][j].y) < 0.001);
        });
    }
  const expected = storyState(2.731);
  [4, 0, 2, 0.3].forEach((p) => storyState(p));
  assert.deepEqual(storyState(2.731), expected);
});
test('curved connectors finish at the destination', () => {
  for (let i = 0; i < 25; i++)
    for (const [n, p] of frameState(i).works.entries()) {
      const d = connectionPath([50, 50], [p.x, p.y], n);
      assert.ok(d.endsWith(`${p.x} ${p.y}`));
      assert.ok(!d.includes('NaN'));
    }
});

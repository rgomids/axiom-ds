import test from 'node:test';
import assert from 'node:assert/strict';
import { storyState, connectionPath } from '../packages/landing/src/story-state.js';

test('idea precedes Axiom; the same six work identities become inspectable results', () => {
  assert.equal(storyState(0).hubOpacity, 0);
  assert.equal(storyState(1).hubOpacity, 0);
  assert.equal(storyState(1).ideaOpacity, 1);
  assert.equal(storyState(2).coordination, 1);
  assert.equal(storyState(4).proof, 1);
  assert.equal(storyState(4).gate, 1);
  for (const p of [0, 0.25, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4]) {
    assert.equal(storyState(p).works.length, 6);
    assert.ok(!Object.hasOwn(storyState(p), 'accepted'));
  }
});

test('each transition is continuous and independent of previous scroll direction', () => {
  for (const narrow of [false, true])
    for (const boundary of [1, 2, 3]) {
      const before = storyState(boundary - 0.00001, narrow),
        after = storyState(boundary + 0.00001, narrow);
      before.works.forEach((node, i) => {
        assert.ok(Math.abs(node.x - after.works[i].x) < 0.001);
        assert.ok(Math.abs(node.y - after.works[i].y) < 0.001);
      });
      assert.ok(Math.abs(before.idea[0] - after.idea[0]) < 0.001);
    }
  const expected = storyState(1.75);
  [4, 0, 3, 0.1, 2.1].forEach((p) => storyState(p));
  assert.deepEqual(storyState(1.75), expected);
});

test('birth happens after blackout; the idea stays hidden during control-plane coordination', () => {
  for (let p = 0; p < 4; p += 0.005) {
    const state = storyState(p);
    if (state.wash > 0) {
      assert.equal(state.novaOpacity, 0);
      assert.equal(state.ideaOpacity, 0);
    }
    if (p >= 1.24 && p <= 3) assert.equal(state.ideaOpacity, 0);
  }
  assert.equal(storyState(0.31).openingCopy, 0);
  assert.ok(storyState(0.48).novaOpacity > 0.9);
  assert.equal(storyState(1).ideaOpacity, 1);
  assert.equal(storyState(2).ideaOpacity, 0);
  assert.equal(storyState(3).ideaOpacity, 0);
  for (const narrow of [false, true]) {
    assert.equal(storyState(4, narrow).ideaOpacity, 1);
  }
});

test('control plane morphs into the sphere along one continuous shared trajectory', () => {
  for (const narrow of [false, true]) {
    for (let p = 3; p <= 4; p += 0.01) {
      const state = storyState(p, narrow);
      assert.deepEqual(state.idea, state.hub);
      assert.ok(Math.abs(state.ideaOpacity + state.hubOpacity - 1) < 0.000001);
      assert.ok(state.idea[1] >= (narrow ? 19 : 30));
    }
    const midway = storyState(3.3, narrow);
    assert.ok(midway.ideaOpacity > 0.4 && midway.ideaOpacity < 0.6);
    assert.ok(midway.hubOpacity > 0.4 && midway.hubOpacity < 0.6);
    assert.ok(midway.hubScale < 1 && midway.hubScale > 0.16);
    assert.equal(storyState(3.6, narrow).hubOpacity, 0);
  }
});

test('desktop and mobile maintain finite positions within their stage', () => {
  for (const narrow of [false, true])
    for (let p = 0; p <= 4; p += 0.05) {
      const state = storyState(p, narrow);
      for (const node of state.works) {
        assert.ok(Number.isFinite(node.x) && node.x >= 10 && node.x <= 90);
        assert.ok(Number.isFinite(node.y) && node.y >= 0 && node.y <= 90);
      }
    }
});

test('curved connections always terminate at the current work position', () => {
  for (const p of [1, 1.5, 2, 3, 3.5, 4]) {
    const state = storyState(p);
    for (const [i, node] of state.works.entries()) {
      const path = connectionPath(state.hub, [node.x, node.y], i, state.coordination);
      assert.ok(path.endsWith(`${node.x} ${node.y}`));
      assert.ok(!path.includes('NaN'));
    }
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { frames, workContent, frameProgress } from '../packages/landing/src/story-frames.js';
import {
  storyState,
  frameState,
  connectionPath,
  storyConnections,
  curvePrefix,
  frameConnections,
  flowSpineX,
} from '../packages/landing/src/story-state.js';
test('all 18 distinct beats remain ordered in five complete scenes', () => {
  assert.equal(frames.length, 18);
  for (let scene = 1; scene <= 5; scene++) {
    const group = frames.filter((f) => f.scene === scene);
    assert.equal(group.length, [4, 3, 2, 4, 5][scene - 1]);
    assert.deepEqual(
      group.map((f) => f.beat),
      Array.from({ length: group.length }, (_, i) => i + 1),
    );
  }
  assert.equal(frames[17].layout, 'continuity');
});
test('idea expands into eight outlines, six fronts, nine tools and scattered artifacts before Axiom', () => {
  assert.equal(frameState(2).ghosts.filter((n) => n.opacity > 0.5).length, 8);
  assert.equal(frameState(3).works.filter((n) => n.opacity === 1).length, 6);
  assert.equal(frameState(4).tools.filter((n) => n.opacity === 1).length, 4);
  assert.equal(frameState(5).works.filter((n) => n.opacity === 1).length, 6);
  for (let i = 0; i < 7; i++) assert.equal(frameState(i).hub.opacity, 0);
  assert.equal(frameState(8).hub.opacity, 1);
});
test('orchestration includes five lanes, eight dependency nodes, four gate cards and six execution rows', () => {
  assert.deepEqual(
    frames.slice(9, 13).map((f) => f.layout),
    ['lanes', 'dependencies', 'human-gate', 'execution'],
  );
  assert.equal(frameState(9).works.filter((n) => n.opacity === 1).length, 5);
  assert.equal(
    frameState(10).works.filter((n) => n.opacity === 1).length +
      frameState(10).contexts.filter((n) => n.opacity === 1).length,
    8,
  );
  assert.equal(frameState(11).works.filter((n) => n.opacity === 1).length, 4);
  assert.equal(frameState(12).works.filter((n) => n.opacity === 1).length, 6);
  assert.equal(workContent(9, 2).agent, 'Codex · o4-mini');
  assert.equal(workContent(9, 0).agent, 'Claude · Sonnet 4');
});
test('delivery shows convergence, five artifacts, human choice, delivered result and next idea', () => {
  assert.deepEqual(
    frames.slice(13).map((f) => f.layout),
    ['convergence', 'evidence', 'decision', 'delivered', 'continuity'],
  );
  assert.equal(frameState(14).works.filter((n) => n.opacity === 1).length, 5);
  assert.equal(frameState(15).decision, 1);
  assert.equal(frameState(16).chips, 1);
  assert.equal(frameState(17).ideaCard, 1);
  assert.equal(frameState(17).continuity, 1);
  for (const f of frames) assert.ok(!Object.hasOwn(f, 'accepted'));
});
test('scroll state is reversible, finite and continuous for visible objects at every beat boundary', () => {
  for (const narrow of [false, true])
    for (let i = 1; i < 17; i++) {
      const a = storyState(frameProgress(i - 0.000001), narrow),
        b = storyState(frameProgress(i + 0.000001), narrow);
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
test('straight connectors finish at the destination', () => {
  for (let i = 0; i < 18; i++)
    for (const [n, p] of frameState(i).works.entries()) {
      const d = connectionPath([50, 50], [p.x, p.y], n);
      assert.ok(d.endsWith(`${p.x} ${p.y}`));
      assert.ok(!d.includes('NaN'));
    }
});

test('every composition holds for reading before transitioning and connections grow before cards', () => {
  for (let i = 1; i < 17; i++) {
    const held = storyState(frameProgress(i + 0.27));
    assert.equal(held.transition, 0);
    assert.equal(held.index, i);
    assert.equal(held.copy[i], 1);
    assert.deepEqual(held.works, frameState(i).works);
  }
  const growing = storyState(frameProgress(2 + 0.28 + 0.72 * 0.5));
  assert.ok(growing.reveals[0].line > 0.9);
  assert.ok(growing.reveals[0].card < 1e-12);
  const arriving = storyState(frameProgress(2 + 0.28 + 0.72 * 0.65));
  assert.equal(arriving.reveals[0].line, 1);
  assert.ok(arriving.reveals[0].card > 0);
  assert.ok(arriving.reveals[0].bloom > 0);
  assert.ok(arriving.reveals[0].card > arriving.reveals[5].card);
});

test('connector routes and the hub stay continuous through layout changes', () => {
  for (const q of [3, 5, 7, 8.64, 9, 10.64, 11.64, 13.64, 17]) {
    const a = storyState(frameProgress(q - 0.000001)),
      b = storyState(frameProgress(q + 0.000001));
    for (const prop of a.hub.opacity > 0.001 && b.hub.opacity > 0.001
      ? ['x', 'y', 'opacity']
      : ['opacity'])
      assert.ok(Math.abs(a.hub[prop] - b.hub[prop]) < 0.001);
    const before = storyConnections(a, 1000, 560),
      after = storyConnections(b, 1000, 560);
    before.forEach((c, i) => {
      assert.ok(Math.abs(c.opacity - after[i].opacity) < 0.001);
      if (c.opacity < 0.001 && after[i].opacity < 0.001) return;
      assert.ok(Math.abs(c.end[0] - after[i].end[0]) < 0.001);
      assert.ok(Math.abs(c.end[1] - after[i].end[1]) < 0.001);
    });
  }
  const points = [0, 0, 20, 40, 60, 20, 100, 100];
  assert.deepEqual(curvePrefix(points, 0).end, [0, 0]);
  assert.deepEqual(curvePrefix(points, 1).end, [100, 100]);
});

test('cards persist without connectors before Axiom, then become an orthogonal graph', () => {
  const titles = Array.from({ length: 6 }, (_, i) => workContent(3, i).title);
  for (let i = 3; i <= 8; i++) {
    const s = frameState(i);
    assert.equal(s.works.filter((n) => n.opacity === 1).length, 6);
    assert.deepEqual(
      Array.from({ length: 6 }, (_, j) => workContent(i, j).title),
      titles,
    );
    if (i < 8) assert.equal(s.connections, 0);
    for (const path of frameConnections(s, 1000, 560)) {
      assert.ok(!/[CQ]/.test(path.d));
      const v = path.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
      for (let j = 2; j < v.length; j += 2) assert.ok(v[j] === v[j - 2] || v[j + 1] === v[j - 1]);
    }
  }
  assert.equal(frameState(6).tools.filter((n) => n.opacity === 1).length, 9);
  assert.equal(frameState(8).connections, 1);
  assert.equal(frameState(8).toolGrouping, 1);
  const organized = frameState(8);
  assert.equal(organized.tools[0].x, organized.works[0].x);
  assert.equal(organized.tools[4].x, organized.works[0].x);
  assert.ok(organized.tools.every((n) => n.opacity < 0.7));
  assert.equal(new Set(frames.map((f) => f.title.pt)).size, frames.length);
});

test('review connector attaches to cards and idea remains attached to the flow at every width', () => {
  for (const [narrow, width] of [
    [false, 1126],
    [true, 351],
    [true, 288],
  ]) {
    const gate = frameState(11, narrow, width);
    const curve = frameConnections(gate, width, 560)[5];
    const points = curve.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.equal(points[0], gate.works[4].x - (gate.works[4].w / width) * 50);
    assert.equal(points[1], gate.works[4].y);
    assert.equal(points[6], gate.works[5].x - (gate.works[5].w / width) * 50);
    assert.equal(points[7], gate.works[5].y);
    const lane = frameState(9, narrow, width);
    assert.equal(lane.idea.x, flowSpineX(lane, width));
    assert.equal(lane.idea.y, lane.works[0].y);
    assert.ok(lane.idea.x < lane.works[0].x - (lane.works[0].w / width) * 50);
    assert.equal(lane.hub.opacity, 0);
  }
});

test('ports, shape and topology fade continuously across each transition midpoint', () => {
  for (const q of [8.64, 9.64, 10.64, 16.64]) {
    const before = storyState(frameProgress(q - 1e-6)),
      after = storyState(frameProgress(q + 1e-6));
    for (const field of ['flowPorts', 'ideaCard', 'platform'])
      assert.ok(Math.abs(before[field] - after[field]) < 1e-4);
    assert.ok(before.routingFade < 1e-8 && after.routingFade < 1e-8);
  }
});

test('the returning idea fades before relocation and reappears attached to its workflow port', () => {
  for (const width of [1126, 351, 288]) {
    const narrow = width < 760;
    const midpoint = storyState(frameProgress(8.64), narrow, width);
    assert.ok(midpoint.idea.opacity < 1e-12);
    for (const q of [8.83, 8.9, 8.99, 9]) {
      const s = storyState(frameProgress(q), narrow, width);
      assert.ok(s.idea.opacity > 0);
      assert.equal(s.idea.x, flowSpineX(s, width));
      assert.equal(s.idea.y, s.works[0].y);
      assert.ok(s.hub.opacity < 0.001);
    }
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { frames, workContent } from '../packages/landing/src/story-frames.js';
import {
  storyState,
  frameState,
  connectionPath,
  storyConnections,
  curvePrefix,
  frameConnections,
  originConnection,
  flowSpineX,
} from '../packages/landing/src/story-state.js';
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

test('every composition holds for reading before transitioning and connections grow before cards', () => {
  for (let i = 1; i < 24; i++) {
    const held = storyState((i + 0.27) / 6);
    assert.equal(held.transition, 0);
    assert.equal(held.index, i);
    assert.equal(held.copy[i], 1);
    assert.deepEqual(held.works, frameState(i).works);
  }
  const growing = storyState((3 + 0.28 + 0.72 * 0.5) / 6);
  assert.ok(growing.reveals[0].line > 0.9);
  assert.ok(growing.reveals[0].card < 1e-12);
  const arriving = storyState((3 + 0.28 + 0.72 * 0.65) / 6);
  assert.equal(arriving.reveals[0].line, 1);
  assert.ok(arriving.reveals[0].card > 0);
  assert.ok(arriving.reveals[0].bloom > 0);
  assert.ok(arriving.reveals[0].card > arriving.reveals[5].card);
});

test('connector curves and the hub stay continuous through layout changes', () => {
  for (const q of [4, 8, 11, 15.64, 16, 17.64, 18.64, 20.64, 24]) {
    const a = storyState((q - 0.000001) / 6),
      b = storyState((q + 0.000001) / 6);
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

test('upper-left and lower-right tentacles retain curvature rather than flattening', () => {
  for (const [i, to] of [
    [0, [30, 18]],
    [5, [66, 82]],
  ]) {
    const v = connectionPath([50, 50], to, i)
      .match(/-?\d+(?:\.\d+)?/g)
      .map(Number);
    const cross = (v[2] - v[0]) * (v[7] - v[1]) - (v[3] - v[1]) * (v[6] - v[0]);
    assert.ok(Math.abs(cross) > 100);
  }
});

test('review connector attaches to cards and idea remains attached to the flow at every width', () => {
  for (const [narrow, width] of [
    [false, 1126],
    [true, 351],
    [true, 288],
  ]) {
    const gate = frameState(18, narrow, width);
    const curve = frameConnections(gate, width, 560)[5];
    const points = curve.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.equal(points[0], gate.works[4].x - (gate.works[4].w / width) * 50);
    assert.equal(points[1], gate.works[4].y);
    assert.equal(points[6], gate.works[5].x - (gate.works[5].w / width) * 50);
    assert.equal(points[7], gate.works[5].y);
    const map = frameState(15, narrow, width),
      input = originConnection(map, width);
    assert.equal(input.opacity, 1);
    const lane = frameState(16, narrow, width);
    assert.equal(lane.idea.x, flowSpineX(lane, width));
    assert.equal(lane.idea.y, lane.works[0].y);
    assert.ok(lane.idea.x < lane.works[0].x - (lane.works[0].w / width) * 50);
    assert.equal(lane.hub.opacity, 0);
  }
});

test('ports, shape and topology fade continuously across each transition midpoint', () => {
  for (const q of [15.64, 16.64, 17.64, 23.64]) {
    const before = storyState((q - 1e-6) / 6),
      after = storyState((q + 1e-6) / 6);
    for (const field of ['flowPorts', 'ideaCard', 'ideaLink', 'platform'])
      assert.ok(Math.abs(before[field] - after[field]) < 1e-4);
    assert.ok(before.routingFade < 1e-8 && after.routingFade < 1e-8);
  }
});

test('the returning idea fades before relocation and reappears attached to its workflow port', () => {
  for (const width of [1126, 351, 288]) {
    const narrow = width < 760;
    const midpoint = storyState(15.64 / 6, narrow, width);
    assert.ok(midpoint.idea.opacity < 1e-12);
    for (const q of [15.83, 15.9, 15.99, 16]) {
      const s = storyState(q / 6, narrow, width);
      assert.ok(s.idea.opacity > 0);
      assert.equal(s.idea.x, flowSpineX(s, width));
      assert.equal(s.idea.y, s.works[0].y);
      assert.ok(s.hub.opacity < 0.001);
    }
  }
});

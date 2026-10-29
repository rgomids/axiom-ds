import test from 'node:test';
import assert from 'node:assert/strict';
import {
  orchestrationProgress,
  orchestrationFraction,
  intervals,
  offsets,
  totalUnits,
} from '../packages/landing/src/orchestration-timeline.mjs';
import {
  architecture,
  architectureEdges,
  phases,
  agents,
} from '../packages/landing/src/orchestration-data.mjs';

test('native scroll and all 18 chapter anchors agree in both directions', () => {
  for (let beat = 0; beat <= 17; beat += 0.025) {
    assert.ok(
      Math.abs((orchestrationProgress(orchestrationFraction(beat)) * 17) / 4 - beat) < 1e-8,
    );
  }
  assert.equal(orchestrationProgress(-1), 0);
  assert.equal(orchestrationProgress(2), 4);
  for (let i = 0; i < 18; i++)
    assert.ok(Math.abs(orchestrationFraction(i) * totalUnits - offsets[i]) < 1e-8);
});
test('only the architecture and workflow intervals gain extra reading time', () => {
  intervals.forEach((duration, i) => assert.equal(duration, i === 9 ? 4 : i === 10 ? 9 : 1));
  let previous = -1;
  for (let i = 0; i <= 1000; i++) {
    const current = orchestrationProgress(i / 1000);
    assert.ok(current > previous);
    previous = current;
  }
});
test('C4 relationship endpoints exist and external boundaries are explicit', () => {
  const nodes = new Map(architecture.map((node) => [node.id, node]));
  assert.equal(nodes.size, architecture.length);
  architectureEdges.forEach((edge) => {
    assert.ok(nodes.has(edge.from));
    assert.ok(nodes.has(edge.to));
  });
  for (const id of ['runtimes', 'github', 'repositories', 'human'])
    assert.equal(nodes.get(id).kind, 'external');
  assert.equal(nodes.get('store').kind, 'persistence');
  assert.ok(architectureEdges.some((e) => e.from === 'evidence' && e.to === 'human'));
  assert.equal(architecture.filter((n) => !['external', 'persistence'].includes(n.kind)).length, 7);
});
test('the execution example retains six phases and four distinct specialist roles', () => {
  assert.deepEqual(phases, [
    'Intake',
    'Specification',
    'Planning',
    'Implementation',
    'Review',
    'Completion',
  ]);
  assert.deepEqual(
    agents.map((a) => a.id),
    ['backend', 'integration', 'documentation', 'tests'],
  );
});

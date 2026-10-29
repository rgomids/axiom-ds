import { readFile } from 'node:fs/promises';

export function flatten(group, path = [], result = {}) {
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    const name = [...path, key];
    if ('$value' in value) {
      if (result[name.join('.')]) throw new Error('Duplicate token: ' + name.join('.'));
      result[name.join('.')] = value;
    } else flatten(value, name, result);
  }
  return result;
}

export function resolve(tokens, name, trail = []) {
  if (trail.includes(name)) throw new Error('Circular token: ' + [...trail, name].join(' -> '));
  const token = tokens[name];
  if (!token) throw new Error('Unknown token: ' + name);
  const value = token.$value;
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const target = value.slice(1, -1);
    if (tokens[target] && tokens[target].$type !== token.$type)
      throw new Error('Token type mismatch: ' + name);
    return resolve(tokens, target, [...trail, name]);
  }
  return value;
}

export const variable = (name) => '--axion-' + name.replaceAll('.', '-');

export function cssValue(type, value) {
  switch (type) {
    case 'color':
      if (
        value.colorSpace !== 'srgb' ||
        value.components.length !== 3 ||
        value.components.some((n) => !Number.isFinite(n) || n < 0 || n > 1) ||
        !Number.isFinite(value.alpha) ||
        value.alpha < 0 ||
        value.alpha > 1
      )
        throw new Error('Invalid sRGB color');
      return (
        'rgb(' +
        value.components.map((n) => Math.round(n * 255)).join(' ') +
        ' / ' +
        value.alpha +
        ')'
      );
    case 'dimension':
    case 'duration':
      if (
        !Number.isFinite(value.value) ||
        !(type === 'dimension' ? ['px', 'rem'] : ['ms', 's']).includes(value.unit)
      )
        throw new Error('Invalid ' + type);
      return String(value.value) + value.unit;
    case 'fontFamily':
      return (Array.isArray(value) ? value : [value])
        .map((name) => (name.includes(' ') ? JSON.stringify(name) : name))
        .join(', ');
    case 'number':
      if (!Number.isFinite(value)) throw new Error('Invalid number');
      return String(value);
    case 'shadow':
      return (
        ['offsetX', 'offsetY', 'blur', 'spread']
          .map((key) => cssValue('dimension', value[key]))
          .join(' ') +
        ' ' +
        cssValue('color', value.color)
      );
    default:
      throw new Error('Unsupported token type: ' + type);
  }
}

export async function loadTokens() {
  const tokens = {};
  for (const name of ['primitives', 'semantic', 'components']) {
    flatten(
      JSON.parse(await readFile('packages/tokens/src/' + name + '.tokens.json', 'utf8')),
      [],
      tokens,
    );
  }
  return tokens;
}

export function compileTokens(tokens, aliases, selector = ':root', aliasSelector = '.axion') {
  const declarations = Object.entries(tokens).map(([name, token]) => {
    const resolved = cssValue(token.$type, resolve(tokens, name));
    const value = token.$value;
    return (
      '  ' +
      variable(name) +
      ': ' +
      (typeof value === 'string' && value.startsWith('{')
        ? 'var(' + variable(value.slice(1, -1)) + ')'
        : resolved) +
      ';'
    );
  });
  const legacy = Object.entries(aliases).map(([name, target]) => {
    resolve(tokens, target);
    return '  --' + name + ': var(' + variable(target) + ');';
  });
  return (
    selector +
    ' {\n' +
    declarations.join('\n') +
    '\n}\n\n' +
    aliasSelector +
    ' {\n' +
    legacy.join('\n') +
    '\n}\n'
  );
}

import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', '.qa/**'] },
  js.configs.recommended,
  { languageOptions: { globals: globals.node } },
];

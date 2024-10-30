import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ['.husky/', '.vscode/', '.yarn/', 'dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

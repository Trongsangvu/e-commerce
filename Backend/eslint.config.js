import { ESLint } from "eslint";

const eslint = new ESLint({
  baseConfig: {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'no-console': 'warn', // optional: adjust according to your preference
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {}, // this will help resolve typescript files
      },
    },
  },
  overrideConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

export default eslint;

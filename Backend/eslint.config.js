module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'no-console': 'warn', // optional: adjust according to your preference
      '@typescript-eslint/no-explicit-any': 'warn',
      // add more custom rules as needed
    },
    settings: {
      'import/resolver': {
        typescript: {}, // this will help resolve typescript files
      },
    },
  };
  
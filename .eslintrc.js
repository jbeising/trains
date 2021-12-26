module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'brace-style': ['error', 'stroustrup'],
    semi: ['error', 'never'],
  },
}

module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:jsonc/recommended-with-json',
    'plugin:jsonc/prettier',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
      legacyDecorators: true,
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['import', 'simple-import-sort'],
  rules: {
    complexity: 'error',
    curly: 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'max-len': [
      'error',
      {
        code: 80,
        comments: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-nested-ternary': 'error',
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        allowSameFolder: true,
        rootDir: 'src',
      },
    ],
    quotes: [
      'error',
      'single',
      {
        // Do not allow unnecessary backticks
        allowTemplateLiterals: false,
        // Prefer double quotes over escaping a single quotation mark
        avoidEscape: true,
      },
    ],
    'simple-import-sort/exports': 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        allowLineSeparatedGroups: true,
        caseSensitive: false,
        natural: true,
      },
    ],
  },
  settings: {},
}

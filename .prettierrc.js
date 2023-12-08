module.exports = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
  printWidth: 80,
  proseWrap: 'always',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
}

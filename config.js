const { getClipboard } = require(`${process.mainModule.path}/utils.js`)

// Modify to your hearth's content!

const functions = {
  curlyQuote: () => '`' + getClipboard() + '`',
  doubleInsideSingle: () => [functions.doubleQuote, functions.singleQuote],
  doubleQuote: () => `"${getClipboard()}"`,
  markdownLinkFromTitle: () => `[${getClipboard()}](URL)`,
  markdownLinkFromURL: () => `[TITLE](${getClipboard()})`,
  removeNewline: () => getClipboard().replace(/(\r|\n)/gm, ' '),
  replaceSpaceWithDash: () => getClipboard().replace(/\s+/gm, '-'),
  singleInsideDouble: () => [functions.singleQuote, functions.doubleQuote],
  singleQuote: () => `'${getClipboard()}'`,
  snakeToCamelCase: () =>
    getClipboard()
      .toLowerCase()
      .replace(/_./g, (match) => match.charAt(1).toUpperCase()),
  toLowerCase: () => getClipboard().toLowerCase(),
  toUpperCase: () => getClipboard().toUpperCase(),
  trim: () => getClipboard().trim(),
  trimEachLine: () =>
    getClipboard()
      .split(/(\n|\r|\s)/gm)
      .filter((val) => !val.match(/(\n|\r|\s)/g) && val)
      .join('\n'),
}

const aliases = {
  curlyQuote: ['cq', 'curlyquote'],
  doubleInsideSingle: ['dis', 'doubleinsidesingle'],
  doubleQuote: ['adddoublequote', 'd', 'double', 'doublequote'],
  markdownLinkFromTitle: ['mdlft', 'mdlt'],
  markdownLinkFromURL: ['mdlfu', 'mdlu'],
  removeNewline: ['removenl', 'rnl'],
  singleInsideDouble: ['sid', 'singleinsidedouble'],
  singleQuote: ['addsinglequote', 's', 'single', 'singlequote'],
  snakeToCamelCase: ['snaketocamel', 'stc'],
  toLowerCase: ['tl', 'tlc', 'lc'],
  toUpperCase: ['tu', 'tuc', 'uc'],
  trim: ['t'],
  trimEachLine: ['tel', 'trimeach', 'tpl', 'trimperline'],
}

module.exports = {
  aliases,
  functions,
}

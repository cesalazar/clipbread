#!/usr/bin/env node

// Transform the clipboard content by function name and/or aliases, e.g.:
// $ clipbread trim double singleQuote
// $ clipbread t d s

const clipboardy = require('clipboardy')

const appName = 'clipbread'

// Clipboard management
const getClipboard = () => clipboardy.readSync()
const setClipboard = (value) => clipboardy.writeSync(value)

// Function names, passed as arguments
// TODO: Include the user's functions (Eg. ~/.clipbread/config.js)
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

// Aliases for the available functions
// TODO: Include the user's aliases (Eg. ~/.clipbread/config.js)
const aliases = {
  curlyQuote: ['curly', 'cq', 'curlyquote'],
  doubleInsideSingle: ['dis', 'doubleinsidesingle'],
  doubleQuote: ['adddoublequote', 'd', 'double', 'doublequote'],
  markdownLinkFromTitle: ['mdlt'],
  markdownLinkFromURL: ['mdlu'],
  removeNewline: ['removenl', 'rnl'],
  singleInsideDouble: ['sid', 'singleinsidedouble'],
  singleQuote: ['addsinglequote', 's', 'single', 'singlequote'],
  snakeToCamelCase: ['snaketocamel', 'stc'],
  toLowerCase: ['tl', 'tlc', 'lc'],
  toUpperCase: ['tu', 'tuc', 'uc'],
  trim: ['t'],
  trimEachLine: ['te', 'trimeach', 'tpl', 'trimperline'],
}

// Find function by name or alias
const findFunction = (needle) => {
  let functionName = functions[needle]

  if (!functionName) {
    for (const [key, value] of Object.entries(aliases)) {
      if (value.includes(needle.toLowerCase())) {
        functionName = functions[key]
        break
      }
    }
  }

  return functionName || null
}

// List valid arguments and their aliases
// The empty line is a unicode char: '‎'
const showHelp = () => {
  console.error(
    `Pass one or more function names, or their aliases:
  ‎
  ${Object.keys(functions)
    .map((fn) => `${fn} ${aliases[fn] ? '- ' + aliases[fn]?.join(', ') : ''}`)
    .join('\n')}
  ‎
  Example: ${appName} t double singleQuote`.replace(/^\s+/gm, '')
  )
}

const applyTransform = (arg) => {
  const functionName = findFunction(arg)

  if (!functionName) {
    console.error(`${arg} was not found in functions nor aliases\n`)
    return showHelp()
  }

  const output = functionName()

  // Set the value right away...
  typeof output === 'string' && setClipboard(output)

  // ...or execute each function in the array
  Array.isArray(output) && output.forEach((fn) => setClipboard(fn()))

  // List the operations applied
  const { name } = functionName
  const applied = arg === name ? arg : `${arg} (${name})`
  console.log(`${applied} applied`)
}

const args = process.argv.splice(2)

args.length ? args.forEach((arg) => applyTransform(arg)) : showHelp()

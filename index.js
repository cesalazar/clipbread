// Transform clipboard content. Eg:
// $ clipbread trim double singleQuote
// $ clipbread t d s

const clipboardy = require('clipboardy')
const appName = 'clipbread'

// Clipboard management
const getClipboard = () => clipboardy.readSync()
const setClipboard = (value) => clipboardy.writeSync(value)

// Function names, passed as arguments
const functions = {
  doubleQuote: () => `"${getClipboard()}"`,
  removeNewline: () => getClipboard().replace(/(\r|\n)/gm, ' '),
  singleQuote: () => `'${getClipboard()}'`,
  trim: () => getClipboard().trim(),
}

// Aliases for the available functions
const aliases = {
  doubleQuote: ['adddoublequote', 'd', 'double', 'doublequote'],
  removeNewline: ['removenl', 'rnl'],
  singleQuote: ['addsinglequote', 's', 'single', 'singlequote'],
  trim: ['t'],
}

// Find function by name or alias
const findFunctionName = (needle) => {
  let functionName = functions[needle]

  if (! functionName) {
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
  console.error(`You need to pass one or more arguments, or their alias:
  ‎
  ${Object.keys(functions).map(
    (fn) => `${fn} - ${aliases[fn].join(', ')}`
  ).join('\n')}
  ‎
  Example: ${appName} t double singleQuote`.replace(/^\s+/gm, ''))
}

const args = process.argv.splice(2)

// Show help and exit
if (! args.length) return showHelp()

args.forEach((arg) => {
  const functionName = findFunctionName(arg)

  if (! functionName) {
    console.error(`${arg} is an invalid argument`)
    return
  }

  setClipboard(functionName())
  const { name } = functionName
  const applied = arg === name ? arg : `${arg} (${name})`
  console.log(`${applied} applied`)
})

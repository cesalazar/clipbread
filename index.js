// Transform clipboard content. Eg:
// node . trim double singleQuote

const clipboardy = require('clipboardy')

const getClipboard = () => clipboardy.readSync()

// TODO: add moar functions: swap quotes, split, join, etc
const functions = {
  doubleQuote: () => `"${getClipboard()}"`,
  singleQuote: () => `'${getClipboard()}'`,
  trim: () => getClipboard().trim(),
}

// TODO: FIX: this is bad and I feel bad about it
const aliases = {
  d: functions.doubleQuote,
  double: functions.doubleQuote,
  doublequote: functions.doubleQuote,
  s: functions.singleQuote,
  single: functions.singleQuote,
  singlequote: functions.singleQuote,
  t: functions.trim,
  trim: functions.trim,
}

const arguments = process.argv.splice(2)

arguments.forEach((arg) => {
  const action = functions[arg]
    || functions[arg.toLowerCase()]
    || aliases[arg]
    || aliases[arg.toLowerCase()]

  if (action) {
    console.log('action:', action)
    clipboardy.writeSync(action())
  }
})

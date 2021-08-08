const clipboardy = require('clipboardy')

const clipboardContent = clipboardy.readSync()

const trimContent = () => clipboardContent.trim()
const singleQuoteContent = () => `'${clipboardContent}'`
const doubleQuoteContent = () => `"${clipboardContent}"`

let res

switch (process.argv.splice(2)[0]) {
  case 'trim':
    res = trimContent()
    break
  case 'singlequote':
    res = singleQuoteContent()
    break
  case 'doublequote':
    res = doubleQuoteContent()
    break
  default:
}

clipboardy.writeSync(res)

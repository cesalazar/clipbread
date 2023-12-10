const clipboardy = require('clipboardy')

// Clipboard management
const getClipboard = () => clipboardy.readSync()
const setClipboard = (value) => clipboardy.writeSync(value)

module.exports = { getClipboard, setClipboard }

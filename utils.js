const clipboardy = require('clipboardy')
const fs = require('fs')

const fileExists = (filePath) => fs.existsSync(filePath)

const getClipboard = () => clipboardy.readSync()

const setClipboard = (value) => clipboardy.writeSync(value)

module.exports = { fileExists, getClipboard, setClipboard }

const clipboardy = require('clipboardy')
const fs = require('fs')

const fileExists = (filePath) => fs.existsSync(filePath)

const getClipboard = () => clipboardy.readSync()

const getFilePathOrFallback = (file, fallback) =>
  fileExists(file) ? file : fallback

const setClipboard = (value) => clipboardy.writeSync(value)

module.exports = {
  fileExists,
  getClipboard,
  getFilePathOrFallback,
  setClipboard,
}

const clipboardy = require('clipboardy')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { name: appName } = require('./package')

const fileExists = (filePath) => fs.existsSync(filePath)

const getClipboard = () => clipboardy.readSync()

const getFilePathOrFallback = (file, fallback) =>
  fileExists(file) ? file : fallback

const listFunctionsAndAliases = (functions, aliases) =>
  Object.keys(functions)
    .map((fn) => `${fn} ${aliases[fn] ? '- ' + aliases[fn].join(', ') : ''}`)
    .join('\n')

const setClipboard = (value) => clipboardy.writeSync(value)

const setUserConfig = (configFile) => {
  // TODO: does this work on Windows?
  const configDir =
    process.env.XDG_CONFIG_DIR || path.join(os.homedir(), '.config')
  const targetDir = path.join(configDir, appName)

  !fileExists(targetDir) && fs.mkdirSync(targetDir, { recursive: true })

  if (fileExists(`${targetDir}/${configFile}`)) {
    console.log(`${targetDir}/${configFile} exists already, nothing to do`)
    return
  }

  fs.copyFileSync(
    path.join(__dirname, configFile),
    path.join(targetDir, configFile)
  )

  console.log('Files copied successfully to', targetDir)
}

module.exports = {
  fileExists,
  getClipboard,
  getFilePathOrFallback,
  listFunctionsAndAliases,
  setClipboard,
  setUserConfig,
}

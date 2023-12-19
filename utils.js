const clipboardy = require('clipboardy')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { name: appName } = require('./package')

const { log } = console
const { argv, env } = process
const args = argv.splice(2)

const fileExists = (filePath) => fs.existsSync(filePath)

const getClipboard = () => clipboardy.readSync()

const getConfigFile = (fileName) => {
  const appConfigPath = `${getOsConfigDir()}/${appName}/${fileName}`
  return fileExists(appConfigPath) ? appConfigPath : fileName
}

const hasArg = (arg) => args.includes(arg)

const getOsConfigDir = () =>
  env.XDG_CONFIG_DIR ?? path.join(os.homedir(), '.config')

const listFunctionsAndAliases = (functions, aliases) =>
  Object.keys(functions)
    .map((fn) => `${fn} ${aliases[fn] ? '- ' + aliases[fn].join(', ') : ''}`)
    .join('\n')

const setClipboard = (value) => clipboardy.writeSync(value)

const setUserConfig = (configFile) => {
  // TODO: does this work on Windows?
  const targetDir = path.join(getOsConfigDir(), appName)

  !fileExists(targetDir) && fs.mkdirSync(targetDir, { recursive: true })

  if (fileExists(`${targetDir}/${configFile}`)) {
    log(`${targetDir}/${configFile} exists already, nothing to do`)
    return
  }

  fs.copyFileSync(
    path.join(__dirname, configFile),
    path.join(targetDir, configFile)
  )

  log('Files copied successfully to', targetDir)
}

module.exports = {
  fileExists,
  getClipboard,
  getConfigFile,
  hasArg,
  listFunctionsAndAliases,
  setClipboard,
  setUserConfig,
}

const clipboardy = require('clipboardy')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { name: appName } = require('./package')

const { log } = console
const { argv, env, exit, mainModule } = process
const args = argv.splice(2)

const fileExists = (filePath) => fs.existsSync(filePath)

const getClipboard = () => clipboardy.readSync()

const getConfigFile = (configFileName) => {
  const appConfigPath = `${getOsConfigDir()}/${appName}/${configFileName}`
  return fileExists(appConfigPath)
    ? appConfigPath
    : `${mainModule.path}/${configFileName}`
}

const getOsConfigDir = () =>
  env.XDG_CONFIG_HOME ?? path.join(os.homedir(), '.config')

const hasArg = (arg) => args.includes(arg)

const listFunctionsAndAliases = (functions, aliases) =>
  Object.keys(functions)
    .map((fn) => `${fn} ${aliases[fn] ? '- ' + aliases[fn].join(', ') : ''}`)
    .join('\n')

const logAndExit = (message, exitCode = 0) => {
  log(message)
  exit(exitCode)
}

const setClipboard = (value) => clipboardy.writeSync(value)

const setUserConfig = (configFileName) => {
  // TODO: does this work on Windows?
  const targetDir = path.join(getOsConfigDir(), appName)
  const targetFile = `${targetDir}/${configFileName}`

  !fileExists(targetDir) && fs.mkdirSync(targetDir, { recursive: true })

  if (fileExists(targetFile)) {
    return `File ${targetFile} exists already, remove it and try again`
  }

  fs.copyFileSync(
    path.join(__dirname, configFileName),
    path.join(targetDir, configFileName)
  )

  return `Config file successfully copied to ${targetFile}`
}

module.exports = {
  args,
  exit,
  fileExists,
  getClipboard,
  getConfigFile,
  hasArg,
  listFunctionsAndAliases,
  log,
  logAndExit,
  setClipboard,
  setUserConfig,
}

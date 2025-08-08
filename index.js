#!/usr/bin/env node

// Transform the clipboard content by function name and/or aliases, e.g.:
// $ clipbread trim doubleQuote singleQuote
// $ clipbread t dq s

const { name: appName, version, description } = require('./package')
const {
  args,
  getClipboard,
  getConfigFile,
  hasArg,
  listFunctionsAndAliases,
  log,
  logAndExit,
  setClipboard,
  setUserConfig,
} = require('./utils')

const configFileName = 'config.js'
const configFile = getConfigFile(configFileName)
const { aliases, functions } = require(configFile)

const getFunctionByLowerCaseName = (functionName) =>
  functions[
    Object.keys(functions).find(
      (fn) => fn.toLowerCase() === functionName.toLowerCase()
    )
  ]

const findFunctionByNameOrAlias = (functionNameOrAlias) => {
  const needle = functionNameOrAlias.toLowerCase()
  let functionName = getFunctionByLowerCaseName(needle)

  if (!functionName) {
    for (const [key, values] of Object.entries(aliases)) {
      if ([key.toLowerCase(), ...values].includes(needle)) {
        functionName = getFunctionByLowerCaseName(key)
        break
      }
    }
  }

  return functionName
}

// The empty line contains an invisible unicode char: '‎'
const showHelp = (exitCode = 0) =>
  logAndExit(
    `${appName} v${version} - ${description}
    ‎
    Options:
    ‎  -h  Show this help text
    ‎  -i  Initialize the user config
    ‎  -l  List functions and aliases without help text
    ‎  -L  Long output: print the entire transformed text
    ‎  -q  Quiet: do not print any output
    ‎
    Pass one or more function names, or their aliases. Example:
    ‎  ${appName} -L t double singleQuote
    ‎
    Available functions and aliases:
    ${listFunctionsAndAliases(functions, aliases)}
    ‎`.replace(/^\s+/gm, ''),
    exitCode
  )

const applyTransform = (arg) => {
  const functionName = findFunctionByNameOrAlias(arg)

  if (!functionName) {
    log(`${arg} was not found in functions nor aliases`)
    return
  }

  const output = functionName()

  // Set the value right away...
  typeof output === 'string' && setClipboard(output)

  // ...or execute each function in the array
  Array.isArray(output) && output.forEach((fn) => setClipboard(fn()))

  // List the operations applied if '-q' (for quiet) is not present
  if (!hasArg('-q')) {
    const { name } = functionName
    const applied = arg === name ? arg : `${arg} (${name})`
    const transformedOutput = `${applied} applied: ${getClipboard()}`

    // Log only the first transformed line unless '-L' (for Long) is present
    log(hasArg('-L') ? transformedOutput : transformedOutput.split('\n')?.[0])
  }
}

if (require.main === module) {
  hasArg('-l') && logAndExit(listFunctionsAndAliases(functions, aliases))

  hasArg('-i') && logAndExit(setUserConfig(configFileName))

  hasArg('-h') && showHelp(0)

  !args.length && showHelp(1)

  args.forEach((arg) => !['-L', '-q'].includes(arg) && applyTransform(arg))
}

module.exports = { findFunctionByNameOrAlias }

#!/usr/bin/env node

// Transform the clipboard content by function name and/or aliases, e.g.:
// $ clipbread trim double singleQuote
// $ clipbread t d s

const { name: appName, version, description } = require('./package')
const {
  getFilePathOrFallback,
  setClipboard,
  setUserConfig,
} = require('./utils')

const configFile = 'config.js'
const userConfigFile = `${process.env.XDG_CONFIG_DIR}/${appName}/${configFile}`

const { aliases, functions } = require(
  getFilePathOrFallback(userConfigFile, configFile)
)

const { log } = console
const { argv, exit } = process
const args = argv.splice(2)

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

// List valid arguments and their aliases
// The empty line contains an invisible unicode char: '‎'
const showHelp = (exitCode = 0) => {
  log(
    `${appName} v${version} - ${description}
  ‎
    Pass one or more function names, or their aliases:
  ‎
  ${Object.keys(functions)
    .map((fn) => `${fn} ${aliases[fn] ? '- ' + aliases[fn].join(', ') : ''}`)
    .join('\n')}
  ‎
  Example: ${appName} t double singleQuote
  ‎
  Use ${appName} -i to initialize the user config`.replace(/^\s+/gm, '')
  )

  exit(exitCode)
}

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

  // List the operations applied
  const { name } = functionName
  const applied = arg === name ? arg : `${arg} (${name})`
  log(`${applied} applied`)
}

if (args.includes('-i')) {
  setUserConfig(configFile)
  exit(0)
}

args.includes('-h') && showHelp(0)

!args.length && showHelp(1)

args.forEach((arg) => applyTransform(arg))

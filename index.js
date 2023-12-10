#!/usr/bin/env node

// Transform the clipboard content by function name and/or aliases, e.g.:
// $ clipbread trim double singleQuote
// $ clipbread t d s

const { name: appName, version, description } = require('./package')
const { setClipboard } = require('./utils')
const { aliases, functions } = require('./config')

const { log } = console
const { argv, exit } = process
const args = argv.splice(2)

// Find function by name or alias
const findFunction = (needle) => {
  let functionName = functions[needle]

  if (!functionName) {
    for (const [key, value] of Object.entries(aliases)) {
      if (value.includes(needle.toLowerCase())) {
        functionName = functions[key]
        break
      }
    }
  }

  return functionName || null
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
  Example: ${appName} t double singleQuote`.replace(/^\s+/gm, '')
  )

  exit(exitCode)
}

const applyTransform = (arg) => {
  const functionName = findFunction(arg)

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

args.includes('-h') && showHelp(0)
!args.length && showHelp(1)

args.forEach((arg) => applyTransform(arg))

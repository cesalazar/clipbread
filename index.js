#!/usr/bin/env node

// Transform the clipboard content by function name and/or aliases, e.g.:
// $ clipbread trim double singleQuote
// $ clipbread t d s

const { setClipboard } = require('./utils.js')
const { aliases, functions } = require('./config.js')

const appName = 'clipbread'

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
// The empty line is a unicode char: '‎'
const showHelp = () => {
  console.error(
    `Pass one or more function names, or their aliases:
  ‎
  ${Object.keys(functions)
    .map((fn) => `${fn} ${aliases[fn] ? '- ' + aliases[fn]?.join(', ') : ''}`)
    .join('\n')}
  ‎
  Example: ${appName} t double singleQuote`.replace(/^\s+/gm, '')
  )
}

const applyTransform = (arg) => {
  const functionName = findFunction(arg)

  if (!functionName) {
    console.error(`${arg} was not found in functions nor aliases\n`)
    return showHelp()
  }

  const output = functionName()

  // Set the value right away...
  typeof output === 'string' && setClipboard(output)

  // ...or execute each function in the array
  Array.isArray(output) && output.forEach((fn) => setClipboard(fn()))

  // List the operations applied
  const { name } = functionName
  const applied = arg === name ? arg : `${arg} (${name})`
  console.log(`${applied} applied`)
}

const args = process.argv.splice(2)

args.length ? args.forEach((arg) => applyTransform(arg)) : showHelp()

const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')

const originalMainModule = process.mainModule
process.mainModule = { path: path.join(__dirname, '..') }

const { findFunctionByNameOrAlias } = require('../index.js')
const { functions } = require('../config.js')

process.mainModule = originalMainModule

test('Function name matching with different cases', () => {
  assert.strictEqual(findFunctionByNameOrAlias('trim'), functions.trim)
  assert.strictEqual(findFunctionByNameOrAlias('TRIM'), functions.trim)
})

test('Alias matching with different cases', () => {
  assert.strictEqual(findFunctionByNameOrAlias('dq'), functions.doubleQuote)
  assert.strictEqual(findFunctionByNameOrAlias('DQ'), functions.doubleQuote)
})

test('Returns undefined when no match is found', () => {
  assert.strictEqual(findFunctionByNameOrAlias('nonexistent'), undefined)
})

// const rewire = require('rewire')
// var index = rewire("./index.js")
const index = require('./index.js')

test('no string entered', () => {
  expect(index()).toBe(null)
})

test('null entered', () => {
  expect(index(null)).toBe(null)
})

test('false entered', () => {
  expect(index(false)).toBe(null)
})

test('empty string entered', () => {
  expect(index('')).toBe(null)
})

test('incorrect arguments entered', () => {
  expect(index('', null)).toBe(null)
})

test('more incorrect arguments entered', () => {
  expect(index('test')).toBe(null)
})
const generate = require('../dist/src/generate').default
const calculate = require('../dist/src/calculate').default
const buildSkeleton = require('../dist/src/calculate').buildSkeleton
const parse = require('../dist/src/services/parse').parse
// подключить функцию калькулейт
// посмотреть в консоле отсортированно или нет

describe('calculate function', () => {
  it('should be do anything', () => {
    calculate(generate())
  })
})

describe('sceleton function', () => {
  const someResult = buildSkeleton(parse(generate()))

  it('should be have right counter', () => {
    expect(someResult.counter).toBe(
      someResult.indexMatrix[someResult.indexMatrix.length - 1][3] + 1
    )
  })
})

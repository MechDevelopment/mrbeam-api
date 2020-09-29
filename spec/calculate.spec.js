const generate = require('../dist/src/generate.js').default
const calculate = require('../dist/src/calculate.js').default
// подключить функцию калькулейт
// посмотреть в консоле отсортированно или нет


describe('calculate function', () => {
  it('should be do anything', () => {
    calculate(generate())
  })
})

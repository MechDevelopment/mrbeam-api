const handleErrors = require("../../dist/src/services/error.js").handleErrors

describe('handleError function', () => {
  const exeption1 = 'TypeError | hint: data should be an array'
  const exeption2 = 'TypeError | hint: units should be objects'

  const exeption3 = 'TypeError | hint: units should have <x> property'
  const exeption4 = 'TypeError | hint: units should have <type> property'

  const exeption5 = 'TypeError | hint: property <x> should be a number or an array'
  const exeption6 = 'TypeError | hint: property <type> should have a specific value'

  const exeption7 = 'TypeError | hint: some units should have <value> property'
  const exeption8 = 'TypeError | hint: property <value> should be a number or an array'

  const exeption9 = 'FormatError | hint: not enough units'
  const exeption10 = 'FormatError | hint: units should have more supports'


  const someGoodUnits1 = [{ x: 0, type: 'fixed' }, { x: 1, type: 'force', value: 12 }]
  const someGoodUnits2 = [{ x: 0, type: 'simple' }, { x: 1, type: 'force', value: 12 }, { x: 2, type: 'simple' }]

  const someBadUnits1 = [{ x: 0, type: 'simple' }, { x: 1, type: 'force', value: 12 }]
  const someBadUnits2 = [{ x: 0, type: 'hinge' }, { x: 1, type: 'force', value: 12 }, { x: 2, type: 'simple' }]

  it(`shoud be error <${exeption1}> if data bad format`, () => {
    expect(() => handleErrors()).toThrowError(exeption1)
    expect(() => handleErrors(3)).toThrowError(exeption1)
    expect(() => handleErrors('xs')).toThrowError(exeption1)
    expect(() => handleErrors({ x: 12 })).toThrowError(exeption1)
    expect(() => handleErrors(new Date())).toThrowError(exeption1)
  })

  it(`shoud be error <${exeption2}> if units bad format`, () => {
    expect(() => handleErrors(['dsad'])).toThrowError(exeption2)
    expect(() => handleErrors([1, 2, 3])).toThrowError(exeption2)
    expect(() => handleErrors([[], [1, 2, 3]])).toThrowError(exeption2)
  })

  it(`shoud be error <${exeption3}> if units havent <x> property`, () => {
    expect(() => handleErrors([{ type: 'simple' }])).toThrowError(exeption3)
    expect(() => handleErrors([{ x: 0, type: 'simple' }, { type: 'disload' }])).toThrowError(exeption3)
  })

  it(`shoud be error <${exeption4}> if units havent <type> property`, () => {
    expect(() => handleErrors([{ x: 12 }])).toThrowError(exeption4)
    expect(() => handleErrors([{ x: 0, type: 'simple' }, { x: 12 }])).toThrowError(exeption4)
  })

  it(`shoud be error <${exeption5}> if units have bad <x> property`, () => {
    expect(() => handleErrors([{ x: 12, type: 'simple' }])).not.toThrowError(exeption5)
    expect(() => handleErrors([{ x: '12', type: 'simple' }])).not.toThrowError(exeption5)
    expect(() => handleErrors([{ x: [0, 4], type: 'simple' }])).not.toThrowError(exeption5)
    expect(() => handleErrors([{ x: new Date, type: 'simple' }])).not.toThrowError(exeption5)

    expect(() => handleErrors([{ x: 's12', type: 'simple' }])).toThrowError(exeption5)
    expect(() => handleErrors([{ x: { x: 1 }, type: 'simple' }])).toThrowError(exeption5)
  })

  it(`shoud be error <${exeption6}> if units have bad <type> property`, () => {
    expect(() => handleErrors([{ x: 0, type: 'simple' }])).not.toThrowError(exeption6)
    expect(() => handleErrors([{ x: 0, type: 'distload' }])).not.toThrowError(exeption6)

    expect(() => handleErrors([{ x: 0, type: 'simpleX' }])).toThrowError(exeption6)
    expect(() => handleErrors([{ x: 0, type: 'distloadX' }])).toThrowError(exeption6)
  })

  it(`shoud be error <${exeption7}> if units havent <value> property`, () => {
    expect(() => handleErrors([{ x: 0, type: 'force', value: -32 }])).not.toThrowError(exeption7)
    expect(() => handleErrors([{ x: 0, type: 'hinge' }])).not.toThrowError(exeption7)

    expect(() => handleErrors([{ x: 0, type: 'force' }])).toThrowError(exeption7)
    expect(() => handleErrors([{ x: 0, type: 'distload' }])).toThrowError(exeption7)
  })

  it(`shoud be error <${exeption8}> if units have bad <value> property`, () => {
    expect(() => handleErrors([{ x: 0, type: 'simple' }])).not.toThrowError(exeption8)
    expect(() => handleErrors([{ x: 0, type: 'force', value: 12 }])).not.toThrowError(exeption8)
    expect(() => handleErrors([{ x: 0, type: 'force', value: '12' }])).not.toThrowError(exeption8)
    expect(() => handleErrors([{ x: 0, type: 'distload', value: [12, 21] }])).not.toThrowError(exeption8)

    expect(() => handleErrors([{ x: 0, type: 'force', value: 's12' }])).toThrowError(exeption8)
    expect(() => handleErrors([{ x: 0, type: 'force', value: undefined }])).toThrowError(exeption8)
  })

  it(`shoud be error <${exeption9}> if units count is 0 or 1`, () => {
    expect(() => handleErrors(someGoodUnits1)).not.toThrowError(exeption9)

    expect(() => handleErrors([])).toThrowError(exeption9)
    expect(() => handleErrors([{ x: 0, type: 'fixed' }])).toThrowError(exeption9)
  })

  it(`shoud be error <${exeption10}> if units count is 0 or 1`, () => {
    expect(() => handleErrors(someGoodUnits1)).not.toThrowError(exeption10)
    expect(() => handleErrors(someGoodUnits2)).not.toThrowError(exeption10)

    expect(() => handleErrors(someBadUnits1)).toThrowError(exeption10)
    expect(() => handleErrors(someBadUnits2)).toThrowError(exeption10)
  })

})
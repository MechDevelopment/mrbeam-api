const randInt = require("../../../dist/src/services/algebra.js").randInt

describe('randInt', () => {
  
  it('shoud be return 0 if interval 0-0', () => {
    expect(randInt(0, 0)).toBe(0)
  })

  it('shoud be return 1 if interval 1-1', () => {
    expect(randInt(1, 1)).toBe(1)
  })

  it('shoud be return 0 or 1 if interval 0-1', () => {
    expect(randInt(0, 1)).toBeGreaterThan(-1)
    expect(randInt(0, 1)).toBeLessThan(2)
  })
})
const solve = require('../../../dist/src/services/algebra.js').solve

describe('solve', () => {
  it('shoud be give solution', () => {
    const solution = solve([[2, 2, 1],[1, 3, -2],[3, -1, -1]], [-3, 1, 2])
    expect(solution[0]).toBeCloseTo(-1 / 15)
    expect(solution[1]).toBeCloseTo(-2 / 3)
    expect(solution[2]).toBeCloseTo(-23 / 15)
  })
})

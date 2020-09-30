const { Elem } = require('../../dist/src/services/element')

const fragmentation = require('../../dist/src/services/fragmentation')
  .fragmentation
const elems = require('../support/bigdata').elems

describe('function fragmentation', () => {
  it('should be have right count of elements', () => {
    const elements1 = fragmentation(
      elems.map((el) => el.getClone()),
      {}
    )
    const elements2 = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 500 }
    )
    const elements3 = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 150 }
    )
    const elements4 = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 50 }
    )
    const elements5 = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 25 }
    )
    const elements6 = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 3 }
    )

    expect(elements1.length).toBeCloseTo(100, -1)
    expect(elements2.length).toBeCloseTo(200, -1)
    expect(elements3.length).toBeCloseTo(150, -1)
    expect(elements4.length).toBeCloseTo(50, -1)
    expect(elements5.length).toBeCloseTo(25, -1)
    expect(elements6.length).toBe(5)
  })

  it('should be have initial points', () => {
    const elements = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 10 }
    )

    elems
      .map((el) => el.nodes[0].x)
      .forEach((i) => {
        expect(elements.map((el) => el.nodes[0].x)).toContain(i)
      })
  })

  it('should be have good sequence of numbers', () => {
    const sortedElems = elems
      .map((el) => el.getClone())
      .sort((a, b) => a.nodes[0].x - b.nodes[0].x) // где-то происходит перемешивание.

    const elements = fragmentation(sortedElems, { count: 30 })

    const elements2 = elements
      .map((el) => el.getClone())
      .sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    expect(elements).toEqual(elements2)
  })

  it('should be have only one nodes with simple', () => {
    const elements = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 10 }
    )

    elements.sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    expect(elements[elements.length - 1].nodes[1].support).toBe('simple')
    expect(elements[elements.length - 1].nodes[0].support).toBeUndefined()
    expect(elements[elements.length - 2].nodes[1].support).toBeUndefined()
  })

  it('should be have right distload', () => {
    const elements = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 25 }
    )

    for (const i in elements) {
      if (elements[i].nodes[0].x < 10) {
        expect(elements[i].distload[0].value).toEqual([-90, 70])
        expect(elements[i].distload[0].x).toEqual([0, 10])
      } else {
        expect(elements[i].distload[0]).toBeUndefined()
      }
    }
  })

  it('should be have right material', () => {
    const elements = fragmentation(
      elems.map((el) => el.getClone()),
      { count: 50 }
    )

    elements.sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    for (const i in elements) {
      if (elements[i].nodes[0].x < 8) {
        expect(elements[i].material).toBe(elements[0].material)
      } else {
        expect(elements[i].material).toBe(
          elements[elements.length - 1].material
        )
      }
    }
  })
})

const parse = require("../../dist/src/services/parse").parse
const decryption = require("../../dist/src/services/parse").decryption

const Elem = require("../../dist/src/services/element").Elem


describe('decription function and Elem class setters', () => {
  const node1 = { x: 0, force: 0, moment: 0 }
  const node2 = { x: 1, force: 0, moment: 0 }
  const elems = [new Elem([node1, node2]), new Elem([node2, undefined])]

  it('should add force to node', () => {
    decryption({ type: 'force', value: -50 }, elems[1])
    expect(node2.force).toBe(-50)
  })

  it('should add moment to node', () => {
    decryption({ type: 'moment', value: 10 }, elems[1])
    expect(node2.moment).toBe(10)
  })

  it('should add support to node', () => {
    decryption({ type: 'fixed' }, elems[0])
    expect(node1.support).toBe('fixed')
  })

  it('should add distload to elem', () => {
    decryption({ type: 'distload', value: -50 }, elems[0])
    decryption({ type: 'distload', value: [50, -30] }, elems[0])

    expect(elems[0].distload[0]).toEqual([-50, -50])
    expect(elems[0].distload[1]).toEqual([50, -30])
  })

  it('should add material to elem', () => {
    decryption({ type: 'material', value: [33,33,33] }, elems[0])
    expect(elems[0].material).toEqual([33,33,33])
  })

})
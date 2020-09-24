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
    decryption({ x: [0, 1], type: 'distload', value: -50 }, elems[0])
    decryption({ x: [0, 1], type: 'distload', value: [50, -30] }, elems[0])

    expect(elems[0].distload[0]).toEqual({ x: [0, 1], value: -50 })
    expect(elems[0].distload[1]).toEqual({ x: [0, 1], value: [50, -30] })
  })

  it('should add material to elem', () => {
    decryption({ type: 'material', value: [33, 33, 33] }, elems[0])
    expect(elems[0].material).toEqual([33, 33, 33])
  })

})

describe('parse function create elems from units', () => {
  const units1 = [
    { "type": "simple", "x": 0 },
    { "type": "force", "x": 4, "value": 100 },
    { "type": "simple", "x": 8 }
  ]

  const units2 = [
    { "type": "material", "x": [0, 11], "value": [33, 33, 33] },
    { "type": "simple", "x": 0 },
    { "type": "moment", "x": 8, "value": 80 },
    { "type": "hinge", "x": 6 },
    { "type": "distload", "x": [0, 11], "value": [60, 60] },
    { "type": "simple", "x": 11 }
  ]

  const elems1 = parse(units1)
  const elems2 = parse(units2)

  it('should be have right length', () => {
    expect(elems1.length).toBe(2)
    expect(elems2.length).toBe(3)
  })

  it('should be have equal nodes', () => {
    expect(elems1[0].nodes[1]).toEqual(elems1[1].nodes[0])
    expect(elems2[0].nodes[1]).toEqual(elems2[1].nodes[0])
    expect(elems2[1].nodes[1]).toEqual(elems2[2].nodes[0])
  })

  it('should be have right x', () => {
    expect(elems1[0].nodes[0].x).toBe(0)
    expect(elems1[1].nodes[0].x).toBe(4)
    expect(elems1[1].nodes[1].x).toBe(8)

    expect(elems2[0].nodes[0].x).toBe(0)
    expect(elems2[1].nodes[0].x).toBe(6)
    expect(elems2[1].nodes[1].x).toBe(8)
    expect(elems2[2].nodes[1].x).toBe(11)
  })

  it('should be have right forces and moments', () => {
    expect(elems1[0].nodes[1].force).toBe(100)

    expect(elems2[1].nodes[1].moment).toBe(80)
  })

  it('should be have right supports', () => {
    expect(elems1[0].nodes[0].support).toBe('simple')
    expect(elems1[1].nodes[1].support).toBe('simple')

    expect(elems2[1].nodes[0].support).toBe('hinge')
    expect(elems2[0].nodes[0].support).toBe('simple')
    expect(elems2[2].nodes[1].support).toBe('simple')
  })

  it('should be have right materials', () => {
    expect(elems2[0].material).toEqual([33, 33, 33])
    expect(elems2[1].material).toEqual([33, 33, 33])
    expect(elems2[2].material).toEqual([33, 33, 33])
  })

  it('should be have right distload', () => {
    expect(elems2[0].distload).toEqual([{ x: [0, 11], value: [60, 60] }])
    expect(elems2[1].distload).toEqual([{ x: [0, 11], value: [60, 60] }])
    expect(elems2[2].distload).toEqual([{ x: [0, 11], value: [60, 60] }])
  })
})
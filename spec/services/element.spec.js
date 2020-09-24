const Elem = require("../../dist/src/services/element").Elem;
const shuffleArray = require("../../dist/src/services/algebra").shuffleArray
const elems = require("../support/bigdata").elems
const getDistInCoord = require("../../dist/src/services/element")
  .getDistInCoord;

describe("getDistInCoord", () => {
  it("should be return 1 if value 0, 2 or 1 on 0, 2", () => {
    expect(getDistInCoord({ x: [0, 2], value: [0, 2] }, 1)).toBe(1);
    expect(getDistInCoord({ x: [0, 2], value: [1, 1] }, 1)).toBe(1);
  });
});

describe("Elem set method distVector", () => {
  let elem;

  beforeEach(() => {
    elem = new Elem([{ x: 0, support: "fixed" }, { x: 2 }]);
  });

  it("should be return zero vector if no distload", () => {
    expect(elem.distVector).toEqual([0, 0, 0, 0]);
  });

  it("should be return vector for equal disload", () => {
    elem.addDistload([0, 2], 10);
    expect(elem.distVector).toEqual([10, 40 / 12, 10, -40 / 12]);
  });

  it("should be return vector for triangle distload", () => {
    elem.addDistload([0, 4], [0, 10]);
    expect(elem.distVector).toEqual([(1 / 3) * 5, 0, (2 / 3) * 5, 0]);
  });

  it("should be return vector for double distload", () => {
    elem.addDistload([0, 2], 10);
    elem.addDistload([0, 4], [0, 10]);
    expect(elem.distVector).toEqual([
      (2 / 3) * 10 + (1 / 3) * 15,
      0,
      (1 / 3) * 10 + (2 / 3) * 15,
      0,
    ]);
  });
});

describe("static method getLength", () => {
  
  const length = Elem.getLength(shuffleArray(elems))

  it("should be right start", () => {
    expect(length.start).toBe(0)
  });

  it("should be right end", () => {
    expect(length.end).toBe(14)
  });

  it("should be right length", () => {
    expect(length.length).toBe(14)
  });
});

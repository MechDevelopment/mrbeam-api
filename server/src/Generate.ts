// CONSTANS
const MIN_LENGTH = 0.01;
const MIN_COUNT = 2;

// ENUM
enum Level { Elementary, Intermediate, Advanced }

enum Types {
  Empty, Force, Moment, Distload, Fixed, Simple, Hinge, Material
}

// INTERFACE
interface GenParameters {
  level?: Level;
  count?: number;
  length?: number;
}

interface Unit {
  readonly id: string;
  type: Types;
  x: number | number[];
  value?: number | number[];
}

// MATH FUNCTIONS
function randomInteger(a: number, b: number): number {
  let rand: number = a - 0.5 + Math.random() * (b - a + 1);
  return Math.round(rand);
}

// CONSTANT FUNCTIONS
function getCountByLevel(level: Level): number {
  switch (level) {
    case Level.Elementary:
      return randomInteger(2, 5);
    case Level.Intermediate:
      return randomInteger(3, 8);
    case Level.Advanced:
      return randomInteger(5, 10);
  }
}

function getLength(): number {
  return randomInteger(1, 5) * 10;
}

// MAIN FUNCTIONS
function initialSettings(gp: GenParameters = {}): GenParameters {
  if (!gp.level) gp.level = Level.Elementary;

  if (!gp.count || gp.count < MIN_COUNT) {
    gp.count = getCountByLevel(gp.level);
  }

  if (!gp.length || gp.length < MIN_LENGTH) {
    gp.length = getLength();
  }

  return gp;
}

function createUnits(count: number, length: number): Unit[] {
  const units: Unit[] = [];
  return units;
}

// GENERATE
function Generate(gp?: GenParameters) {
  let { level, count, length } = initialSettings(gp);

  console.log(level, count, length);
}

Generate()
Generate({level: Level.Elementary})
Generate({level: Level.Intermediate})
Generate({level: Level.Advanced})

Generate({count: 10})
Generate({length: 5})
Generate({count: 12, length: 321})

Generate({count: 1})
Generate({length: 0.001})
Generate({count: 12, length: 321})
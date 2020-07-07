import { nanoid } from 'nanoid';

// CONSTANS
const MIN_LENGTH = 0.01;
const MIN_COUNT = 2;

// ENUM
type Level = 'Elementary' | 'Intermediate' | 'Advanced'

enum Types {
  Empty = 'point', Force = 'force', Moment = 'moment', Distload = 'distload',
  Fixed = 'fixed', Simple = 'simple', Hinge = 'hinge', Material = 'material'
}

// INTERFACE
interface GenParameters {
  level?: Level;
  count?: number;
  length?: number;
}

interface InitialSettings {
  level: Level;
  count: number;
  length: number;
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
    case 'Elementary':
      return randomInteger(2, 5);
    case 'Intermediate':
      return randomInteger(3, 8);
    case 'Advanced':
      return randomInteger(5, 10);
  }
}

function getLength(): number {
  return randomInteger(1, 5) * 10;
}

// MAIN FUNCTIONS
function initialSettings(gp: GenParameters = {}): InitialSettings {
  const is = {} as InitialSettings;

  is.level = (!gp.level) ? 'Elementary' : gp.level;

  if (!gp.count || gp.count < MIN_COUNT) {
    is.count = getCountByLevel(is.level);
  }

  if (!gp.length || gp.length < MIN_LENGTH) {
    is.length = getLength();
  }

  return is;
}

function createUnits(count: number, length: number): Unit[] {
  const units: Unit[] = []

  for (let i = 0; i < count; i++) {
    units.push({
      id: nanoid(10),
      type: Types.Empty,
      x: length / (count - 1) * i
    })
  }

  return units;
}

// GENERATE
function Generate(gp?: GenParameters) {
  let { level, count, length }: InitialSettings = initialSettings(gp);

  const units: Unit[] = createUnits(count, length);

  console.log(units, level, count, length);
}

Generate({ level: 'Elementary' })
Generate({ level: 'Intermediate' })
Generate({ level: 'Advanced' })

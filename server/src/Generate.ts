enum Level { Elementary, Intermediate, Advanced }

enum Types {
  Empty, Force, Moment, Distload, Fixed, Simple, Hinge, Material
}

interface Unit {
  readonly id: string;
  type: Types;
  x: number|number[];
  value?: number|number[];
}

function initialSettings(): number[] {
  const init: number[] = [];
  return init;
}

function createUnits(count: number, length: number): Unit[] {
  const units: Unit[] = [];
  return units;
}

function Generate(level: Level = Level.Elementary, count: number = 0, length: number = 0) {
  
  initialSettings()

  const units: Unit[] = createUnits(count, length);
}


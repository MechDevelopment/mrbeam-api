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


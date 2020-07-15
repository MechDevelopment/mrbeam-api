export type UnitType = 'point' | 'force' | 'moment' | 'distload' | 'fixed' | 'simple' | 'hinge' | 'material';

export type GenerateLevel = 'elementary' | 'intermediate' | 'advanced' | 'random';

export interface GenerateParameters {
  level?: GenerateLevel;
  unitsCount?: number;
  beamLength?: number;
}

export interface Unit {
  readonly id: string;
  type: UnitType;
  x: number | number[];
  value?: number | number[];
}

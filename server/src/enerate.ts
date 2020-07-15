import { nanoid } from 'nanoid';
import { GenerateLevel, UnitType, Unit, GenerateParameters } from './core/global.core';
import { InitSettings } from './core/generate.core';
import { randInt } from './services/lgebra';

const DEFAULT_LEVEL: GenerateLevel = 'elementary';

function initSettings(gp: GenerateParameters): InitSettings {
  if (!gp.level) gp.level = DEFAULT_LEVEL;

  if (gp.level === 'random') {
    const basicLevels: GenerateLevel[] = ['elementary', 'intermediate' , 'advanced'];
    gp.level = basicLevels[randInt(0,2)]
  }

  if (!gp.unitsCount || gp.unitsCount < 2) {
    gp.unitsCount = randInt(2, 5); /* else */ 
    if (gp.level === 'intermediate') gp.unitsCount = randInt(3, 8);
    if (gp.level === 'advanced') gp.unitsCount = randInt(5, 10);
  }

  if (!gp.beamLength || gp.beamLength == 0) {
    gp.beamLength = randInt(1, 10) * 10
  }

  return gp as InitSettings;
}


function createUnits(count: number, length: number): Unit[] {
  const units: Unit[] = []

  for (let i = 0; i < count; i++) {
    units.push({
      id: nanoid(10),
      type: 'point',
      x: length / (count - 1) * i
    })
  }

  return units;
}

export default function generate(gp: GenerateParameters = {}) {

  const { level, unitsCount, beamLength }: InitSettings = initSettings(gp);


  const units: Unit[] = createUnits(unitsCount, beamLength);

  console.log(level, unitsCount, beamLength, units );


}

generate({ level: 'elementary' });
generate({ level: 'intermediate' });
generate({ level: 'advanced' });
generate({ level: 'random' });

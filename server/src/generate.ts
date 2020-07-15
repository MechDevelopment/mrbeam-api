import { nanoid } from 'nanoid';
import { GenerateLevel, UnitType, Unit, GenerateParameters } from './core/global.core';
import { InitSettings } from './core/generate.core';
import { randInt } from './services/algebra';

const DEFAULT_LEVEL: GenerateLevel = 'elementary';


function initSettings(gp: GenerateParameters): InitSettings {
  if (!gp.level) gp.level = DEFAULT_LEVEL;

  if (gp.level === 'random') {
    const basicLevels: GenerateLevel[] = ['elementary', 'intermediate', 'advanced'];
    gp.level = basicLevels[randInt(0, 2)]
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


function createUnits(unitsCount: number, beamLength: number): Array<Unit> {
  const units: Array<Unit> = []

  for (let i = 0; i < unitsCount; i++) {
    units.push({
      id: nanoid(10),
      type: 'point',
      x: beamLength / (unitsCount - 1) * i
    })
  }

  return units;
}


function addFixed(units: Array<Unit>): void {
  if (randInt(0, 1)) units[0].type = 'fixed';
  else units[units.length - 1].type = 'fixed';
}


function addSimple(units: Array<Unit>): void {
  
}


function addSupport(units: Array<Unit>): void {
  if (units.length < 3) addFixed(units);

  if (units.length > 2 && units.length < 6) {
    if (randInt(0, 1)) addFixed(units);
    else addSimple(units);
  }

  if (units.length > 5) addSimple(units);
}


export default function generate(gp: GenerateParameters = {}) {

  const { level, unitsCount, beamLength }: InitSettings = initSettings(gp);
  const units: Array<Unit> = createUnits(unitsCount, beamLength);

  addSupport(units);



  console.log(level, unitsCount, beamLength, units);

  if (level === 'elementary') {

  }


}

generate({ level: 'elementary' });
generate({ level: 'intermediate' });
generate({ level: 'advanced' });
generate({ level: 'random' });

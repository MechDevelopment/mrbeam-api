import { nanoid } from 'nanoid';

import { GenerateLevel, Unit, GenerateParameters } from './core/global.core';
import { InitSettings } from './core/generate.core';
import { randInt } from './services/algebra';

const YOUNG = {
  'Aluminum': 7036041869.548,
  'Steel': 20394324259.56,
  'Copper': 11930679691.84,
  'Magnesium': 4588722958.401,
  'Lead': 1835489183.36
}
const YOUNG_VALS = Object.values(YOUNG);


function randForce() {
  return (randInt(0, 5) * 10 + 50) * (randInt(0, 1) ? 1 : -1)
}


function randMaterial(): [number, number] {
  const size: number = randInt(10, 30) * 0.01;
  if (randInt(0, 1))  // 50% square
    return [size * size * size * size / 12, size * size];
  else  // 50% circle
    return [size * size * size * size * Math.PI / 64, size * size * Math.PI / 4]
}


function initSettings(gp: GenerateParameters): InitSettings {
  if (!gp.level || gp.level === 'random') {
    const basicLevels: GenerateLevel[] = ['elementary', 'intermediate', 'advanced'];
    gp.level = basicLevels[randInt(0, 2)]
  }

  if (!gp.unitsCount || gp.unitsCount < 2) {
    gp.unitsCount = randInt(2, 5); /* else */
    if (gp.level === 'intermediate') gp.unitsCount = randInt(3, 8);
    if (gp.level === 'advanced') gp.unitsCount = randInt(5, 10);
  }

  if (!gp.beamLength || gp.beamLength == 0) {
    gp.beamLength = randInt(8, 16);
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
  if (randInt(0, 1)) units[0].type = 'fixed'; // left position 50%
  else units[units.length - 1].type = 'fixed'; // right posititon 50%
}


function addSimple(units: Array<Unit>): void {
  const shift: number = randInt(0, Math.floor(units.length / 2) - 1);

  if (randInt(0, 1)) {
    // 50% center position
    units[shift].type = 'simple';
    units[units.length - shift - 1].type = 'simple';
  } else {
    // 50% left and right positions
    if (randInt(0, 1)) {
      // 25% points together
      if (randInt(0, 1)) {
        units[shift].type = 'simple';
        units[shift + 1].type = 'simple';
      } else {
        units[units.length - shift - 1].type = 'simple';
        units[units.length - shift - 2].type = 'simple';
      }
    } else {
      // 25% one point on the edge 22
      if (randInt(0, 1)) {
        units[0].type = 'simple';
        units[units.length - shift - 1].type = 'simple';
      } else {
        units[shift].type = 'simple';
        units[units.length - 1].type = 'simple';
      }
    }
  }
}


function addSupport(units: Array<Unit>): void {
  if (units.length < 3) addFixed(units);

  if (units.length > 2 && units.length < 6) {
    if (randInt(0, 2)) addSimple(units); // 66% simple
    else addFixed(units); // 33% fixed
  }

  if (units.length > 5) addSimple(units);
}


function addMaterial(units: Array<Unit>, beamLength: number | number[]): boolean {
  for (let i = units.length - 1; i >= 0; i--) {
    if (units[i].type === 'point') {
      units[i].type = 'material';
      units[i].x = (typeof beamLength === 'number') ? [0, beamLength] : beamLength;
      units[i].value = [
        YOUNG_VALS[randInt(0, YOUNG_VALS.length - 1)],
        ...randMaterial()
      ];
      return true;
    }
  }
  return false;
}


function addDistload(units: Array<Unit>, beamLength: number | number[]): boolean {
  for (let i = units.length - 1; i >= 0; i--) {
    if (units[i].type === 'point') {
      units[i].type = 'distload';
      units[i].x = (typeof beamLength === 'number') ? [0, beamLength] : beamLength;
      units[i].value = randInt(0, 1) ? randForce() : [randForce(), randForce()];
      return true;
    }
  }
  return false;
}



function addHinge(units: Array<Unit>): boolean {
  
  return false;
}


function addAdvancedDistload(units: Array<Unit>, beamLength: number): boolean {
  return false;
}


function addAdvancedMaterial(units: Array<Unit>, beamLength: number): boolean {
  return false;
}


function finish(units: Array<Unit>): void {
  const type = (randInt(0, 2))
    ? 'force'   // 66% add force
    : 'moment'; // 33% add moment

  for (let i = 0; i < units.length; i++) {
    if (units[i].type === 'point') {
      units[i].type = type;
      units[i].value = randForce();
    }
  }
}


export default function generate(gp: GenerateParameters = {}) {

  const { level, unitsCount, beamLength }: InitSettings = initSettings(gp);
  const units: Array<Unit> = createUnits(unitsCount, beamLength);

  // Добавление закреплений
  addSupport(units);

  if (level === 'intermediate') {
    // Добавление материала на всей длине балки
    if (!addMaterial(units, beamLength)) return units;

    // Добавление распределнной нагрузки на всей длине балки
    if (!addDistload(units, beamLength)) return units;

  }

  if (level === 'advanced') {
    // Добавление нескольких материалов или одного
    if (!addAdvancedMaterial(units, beamLength)) return units;


    // Добавление шарнира
    if (!addHinge(units)) return units;

    // Добавление распределнной нагрузки
    if (!addAdvancedDistload(units, beamLength)) return units;

  }

  // Добиваем оставшиеся точки моментами и силами
  finish(units);

  console.log(level, unitsCount, beamLength, units);
  return units;
}

generate({ level: 'elementary' });
generate({ level: 'intermediate' });
generate({ level: 'intermediate' });
generate({ level: 'intermediate' });
generate({ level: 'advanced' });
generate({ level: 'random' });


import { Unit } from './../core/global.core';

export function handleErrors(units: Array<Unit>) {
  let countOfFixed = 0
  let countOfSimple = 0

  // Handle errors
  if (!Array.isArray(units)) throw new Error('TypeError | hint: data should be an array')

  for (let unit of units) {
    if (unit.toString() !== '[object Object]') throw new Error('TypeError | hint: units should be objects')
    
    if (!unit.hasOwnProperty('x')) throw new Error('TypeError | hint: units should have <x> property')
    if (!unit.hasOwnProperty('type')) throw new Error('TypeError | hint: units should have <type> property')

    
    if (typeof unit.x !== 'number' && !Array.isArray(unit.x) && Object.is(+unit.x, NaN)) {
      throw new Error('TypeError | hint: property <x> should be a number or an array')
    }  

    if (!['force', 'moment', 'distload', 'material', 'fixed', 'simple', 'hinge'].includes(unit.type)) {
      throw new Error('Bad units <type>, should be force, moment, distload, material, fixed, simple, hinge')
    }

    if (['force', 'moment', 'distload', 'material'].includes(unit.type) && !unit.hasOwnProperty('value')){
      throw new Error('Bad units format, some units should have <value> property')
    }

    if (unit.type === 'fixed') countOfFixed++
    if (unit.type === 'simple') countOfSimple++
  }

  if (units.length === 0 || units.length === 1) throw new Error('Not enough units')

  if (countOfFixed === 0 && countOfSimple < 2) {
    throw new Error('Bad units format, units should have minimum 2 simple or 1 fixed supports')
  }

}
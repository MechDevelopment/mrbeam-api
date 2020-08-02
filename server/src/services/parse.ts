import { Unit } from './../core/global.core';
import { INode } from './../core/calculate.core';

import Elem from "./element";


function decryption(unit: Unit, elem: Elem) {
  switch (unit.type) {
    case "force":
      elem.nodes[0].force += unit.value as number
      break;
    case "moment":
      elem.nodes[0].moment += unit.value as number
      break;
    case "fixed":
      elem.nodes[0].support = 'fixed'
      break;
    case "simple":
      elem.nodes[0].support = 'simple'
      break;
    case "hinge":
      elem.nodes[0].support = 'hinge'
      break;
    case "distload":
      elem.addDistload(unit.value as number | [number, number])
      break;
    case "material":
      elem.material = unit.value as [number, number, number]
      break;
  }
}

export function parse(units: Array<Unit>): Array<Elem> {
  let countOfFixed = 0
  let countOfSimple = 0

  // Handle errors
  if (!Array.isArray(units)) throw new Error('Bad data format, data should be an array')

  if (units.length === 0) throw new Error('There are no units')

  for (let unit of units) {
    if (!unit.hasOwnProperty('x')) throw new Error('Bad units format, units should have <x> property')

    if (typeof unit.x !== 'number' || !Array.isArray(unit.x)) {
      throw new Error('Bad units <x>, should be number or Array<number>')
    }

    if (!unit.hasOwnProperty('type')) throw new Error('Bad units format, units should have <type> property')

    if (!['force', 'moment', 'distload', 'material', 'fixed', 'simple', 'hinge'].includes(unit.type)) {
      throw new Error('Bad units <type>, should be force, moment, distload, material, fixed, simple, hinge')
    }

    if (['force', 'moment', 'distload', 'material'].includes(unit.type) && !unit.hasOwnProperty('value')){
      throw new Error('Bad units format, some units should have <value> property')
    }

    if (unit.type === 'fixed') countOfFixed++
    if (unit.type === 'simple') countOfSimple++
  }

  if (units.length === 1) throw new Error('Not enough units')

  if (countOfFixed === 0 && countOfSimple < 2) {
    throw new Error('Bad units format, units should have minimum 2 simple or 1 fixed supports')
  }
  




  const setOfCoords: Set<number> = new Set(units.map(unit => unit.x).flat())
  const sortedCoords: Array<number> = Array.from(setOfCoords).sort((a, b) => a - b)

  const nodes: Array<INode> = sortedCoords.map(coord => ({ x: coord, force: 0, moment: 0 }))
  const elems: Array<Elem> = nodes.map((node, i) => new Elem([node, nodes[i + 1]])).slice(0, -1)

  for (const unit of units) {
    if (typeof unit.x === "number") {
      decryption(unit, elems[sortedCoords.indexOf(unit.x)])
    } else {
      const x: Array<number> = unit.x
      elems
        .filter(elem => elem.nodes[0].x >= x[0] && elem.nodes[0].x <= x[1])
        .forEach(elem => decryption(unit, elem))
    }
  }

  return elems
}
import { Unit } from './../core/global.core';
import { INode } from './../core/calculate.core';

import Elem from "./element";


function decryption(unit: Unit, elem: Elem) {
  switch (unit.type) {
    case "force":
      elem.addForce(unit.value as number)
      break;
    case "moment":
      elem.addMoment(unit.value as number)
      break;
    case "distload":
      elem.addDistload(unit.value as number | [number, number])
      break;
    case "material":
      elem.addMaterial(unit.value as [number, number, number])
      break;
    default:
      elem.addSupport(unit.type)
      break;
  }
}

export function parse(units: Array<Unit>): Array<Elem> {


  const setOfCoords: Set<number> = new Set(units.map(unit => unit.x).flat())
  const sortedCoords: Array<number> = Array.from(setOfCoords).sort((a, b) => a - b)

  const nodes: Array<INode> = sortedCoords.map(coord => ({ x: coord, force: 0, moment: 0 }))
  const elems: Array<Elem> = nodes.map((node, i) => new Elem([node, nodes[i + 1]])) //.slice(0, -1) обработка последней точки нужна ведь!

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

  return elems.slice(0, -1) // Убрал последний элемент за ненадобностью
}
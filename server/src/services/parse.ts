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
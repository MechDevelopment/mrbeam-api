import { INode } from './../core/calculate.core';
import { Unit } from "../core/global.core";

import Elem from "./element";


function decryption(type: string, elem: Elem, value?: any) {
  switch (type) {
    case "force":
      elem.nodes[0].force += value
      break;
    case "moment":
      elem.nodes[0].moment += value
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
      elem.distload = value
      break;
    case "material":
      elem.material = value
      break;
  }

  export default function parse(units: Array<Unit>): Array<Elem> {

    const setOfCoords: Set<number> = new Set(units.map(unit => unit.x).flat())
    const sortedCoords: Array<number> = Array.from(setOfCoords).sort((a, b) => a - b)

    const nodes: Array<INode> = sortedCoords.map(coord => ({ x: coord, force: 0, moment: 0 }))
    const elems: Array<Elem> = nodes.map((node, i) => new Elem([node, nodes[i + 1]])).slice(0, -1)

    for (const unit of units) {
      
    }

    return elems;
  }

  console.log(parse([
    {
      "id": "RKZSlaxZpV",
      "type": "distload",
      "x": [
        0,
        11
      ],
      "value": [
        -90,
        -50
      ]
    },
    {
      "id": "D9Cfn0fR0a",
      "type": "material",
      "x": [
        0,
        11
      ],
      "value": [
        7036041869.548,
        0.0004428675000000001,
        0.0729
      ]
    },
    {
      "id": "rdd80WRaES",
      "type": "simple",
      "x": 7.333333333333333
    },
    {
      "id": "m5bxsXffS5",
      "type": "simple",
      "x": 3.6666666666666665
    }
  ]))
import { Unit } from './core/global.core';
import { Graph, Elem } from './core/calculate.core'

import graph from './services/graph'
import parse from './services/parse';


export default function calculate(units: Array<Unit>): Graph {
  const elems: Array<Elem> = parse(units);

  
  return graph();
}
import { Unit } from './core/global.core'
import { CalculateOptions, Graph } from './core/calculate.core'

import { graph } from './services/graph'
import { parse } from './services/parse'
import { fragmentation } from './services/fragmentation'
import { Elem } from './services/element'
import { handleErrors } from './services/error'

export default function calculate(
  units: Array<Unit>,
  options: CalculateOptions = { count: 100 }
): Graph {
  handleErrors(units)

  const elems: Array<Elem> = fragmentation(parse(units), options)

  //// ansamblirovanie elements
  // const support = supporting(elems);
  // const GM = globalM(elems, support);
  // const GV = globalV(elems, support);

  // const solution = solve(GM, GV);
  // reaction(elems, solution, support);

  // return chartResults(elems);

  return graph()
}

// function supporting(elems) {
//   // variables
//   let indexM = [];
//   let defV = new Set();
//   let temp = [];
//   let s = 0;

//   for (let i = 0; i < elems.length; i++) {
//     for (let j = 0; j < 4; j++) {
//       // definition vector building
//       if (j == 0 && elems[i].nodes[0].def[1]) defV.add(s);
//       if (j == 1 && elems[i].nodes[0].def[2]) defV.add(s);
//       if (j == 2 && elems[i].nodes[1].def[1]) defV.add(s);
//       if (j == 3 && elems[i].nodes[1].def[2]) defV.add(s);

//       // index matrix building
//       if (j == 1 && elems[i].nodes[0].joint) s++;
//       temp[j] = s;
//       s++;
//     }
//     indexM[i] = [...temp];
//     s -= 2;
//   }
//   return { indexM, defV: [...defV], s: s + 2 };
// }

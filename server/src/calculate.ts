/** Beam calculation
 *
 * Calculation progress:
 *  1. fragmentation elements / увеличение количества элементов
 *  2. global matrix and global vector formation / ансамблирование элементов
 *  3. SLAU solution and finding reactions / решение СЛАУ и отыскание реакций опор
 *  4. chart results creation / создание результатов и графиков
 */

 /** Computational functions
 *
 * Abbreviation and terms:
 *  elems    - array of finite elements       / массив конечных элементов
 *  indexM   - index matrix (local to global) / матрица индексов
 *  defV     - definition index vector        / вектор индексов закреплений
 *  s        - size of global matrix          / размер глобальной матрицы
 *  globalM  - global matrix (size: [s, s])   / глобальная матрица
 *  globalV  - global vector (size: [s])      / глобальный грузовой вектор
 *
 *  solve    - SLAU solution (matrix,vector)  / решение СЛАУ, возвращает вектор
 *  reaction - add support reactions (R, M)   / добавляет реакции опор
 *
 *  multiply - matrix vector multiplication   / умножение матрицы на вектор
 *  filled   - creating a filled array        / создание заполненного массива
 */

import { Unit } from './core/global.core';
import { Graph } from './core/calculate.core'

import graph from './services/graph'
import {parse} from './services/parse';
import Elem from './services/element';
import { handleErrors } from './services/error';


export default function calculate(units: Array<Unit>): Graph {

  handleErrors(units)
  
  const elems: Array<Elem> = parse(units);

  // А что если объединить парс юнитов и фрагментацию?

  // elems: Array<Elem> =>


  //// ansamblirovanie elements
  // const support = supporting(elems);
  // const GM = globalM(elems, support);
  // const GV = globalV(elems, support);

  // const solution = solve(GM, GV);
  // reaction(elems, solution, support);

  // return chartResults(elems);

  

  
  return graph();
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
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
import parse from './services/parse';
import Elem from './services/element';


export default function calculate(units: Array<Unit>): Graph {
  const elems: Array<Elem> = parse(units);

  
  return graph();
}
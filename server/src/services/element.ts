import { INode } from './../core/calculate.core';
/** Class for the formation of finite elements
 *
 * Abbreviation and terms:
 *  node     - beam point       / узел
 *  element  - finite element   / конечный элемент
 *
 *  joint    - swing joint      / шарнирное соединение
 *  def      - definition       / закрепление
 *   [0, 0, 0]  - no definitions/ свободное перемещение
 *   [0, 1, 0]  - roller        / перемещение по вертикали запрещено
 *   [1, 1, 1]  - fixed         / жесткая заделка
 *
 *  load     - (+ up) force     / нагрузка, положительное направление: вверх
 *  distload - (+ up) distributed load [node1.q, node2.q]
 *                              / распределенная нагрузка, положительна: вверх
 *  moment   - (+ counterclockwise) force moment
 *                              / момент, положительный: против часовой стрелки
 *  mat      - material { E: value, J: value, A: value } / материал
 *   E       - elastic modulus  / модуль упругости
 *   J       - inertia          / момент инерции
 *   A       - area             / площадь поперечного сечения
 *
 *  len      - length of elem   / длинна коненчого элемента
 *  loc      - local stiffness matrix for beam
 *                              / локальная матрица жесткости
 *  fdist    - distributed load local vector
 *                              / локальный вектор из распределенной нагрузки
 */

export class Elem {
  public distload: Array<[number, number]> = []
  public material: [number, number, number] = [1, 1, 1]

  constructor(
    public nodes: [INode, INode],

  ) {
    // Что же нам тут нужно? Это у нас конечный элемент, да по сути ничего
    /**
     * Локальная матрица
     * длина между двумя узлами
     * и сами узлы
     * 
     * Вот что должно быть в узлах
     * тут интереснее
     *  Узел включает информацию
     *  расположение узла
     *  силу или момент
     */

  }

  localMatrix(): Array<Array<number>> {
    const EJ: number = this.material[0] * this.material[1]
    const len: number = this.length

    return [
      [
        (1 / len ** 3) * (EJ * 12),
        (1 / len ** 2) * (EJ * 6),
        (1 / len ** 3) * (EJ * -12),
        (1 / len ** 2) * (EJ * 6),
      ],
      [
        (1 / len ** 2) * (EJ * 6),
        (1 / len ** 1) * (EJ * 4),
        (1 / len ** 2) * (EJ * -6),
        (1 / len ** 1) * (EJ * 2),
      ],
      [
        (1 / len ** 3) * (EJ * -12),
        (1 / len ** 2) * (EJ * -6),
        (1 / len ** 3) * (EJ * 12),
        (1 / len ** 2) * (EJ * -6),
      ],
      [
        (1 / len ** 2) * (EJ * 6),
        (1 / len ** 1) * (EJ * 2),
        (1 / len ** 2) * (EJ * -6),
        (1 / len ** 1) * (EJ * 4),
      ],
    ]
  }


  // SETTERS
  addForce(value: number) {
    this.nodes[0].force += value
  }

  addMoment(value: number) {
    this.nodes[0].moment += value
  }

  addSupport(value: "fixed" | "simple" | "hinge") {
    this.nodes[0].support = value
  }

  addDistload(value: number | [number, number]) {
    if (typeof value === 'number') value = [value, value]
    this.distload.push(value)
  }

  addMaterial(value: [number, number, number]) {
    this.material = value
  }


  // GETTERS
  get length(): number {
    return this.nodes[1].x - this.nodes[0].x
  }

}


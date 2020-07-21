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

export default class Elem {

}


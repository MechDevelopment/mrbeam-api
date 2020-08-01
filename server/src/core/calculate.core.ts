export interface Graph {
  [key: string]: Array<number> | number;
}

export interface INode {
  x: number
  force: number
  moment: number

  support?: 'fixed' | 'simple' | 'hinge'
}
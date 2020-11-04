export function randInt(a: number, b: number): number {
  let rand: number = a - 0.5 + Math.random() * (b - a + 1)
  return Math.round(rand)
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  let m = array.length
  let t, i

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

export function flat(array: Array<number | number[]>): Array<number> {
  const result: Array<number> = []
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) result.push(...(array[i] as number[]))
    else result.push((array[i] as number))
  }
  return result
}

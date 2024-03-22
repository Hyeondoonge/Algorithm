function solution(n, times) {
  const t = times.length
  let s = -1,
    e = Math.pow(10, 18)

  while (s + 1 < e) {
    const m = Math.floor((s + e) / 2)
    let p = times.reduce((prev, cur) => prev + Math.floor(m / cur), 0)
    if (n <= p) {
      e = m
    } else {
      s = m
    }
  }

  return e
}

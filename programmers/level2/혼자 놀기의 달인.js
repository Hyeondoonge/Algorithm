function solution(cards) {
  const N = cards.length

  let answer = 0

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      answer = Math.max(getPoint(i, j), answer)
    }
  }

  return answer

  function getPoint(i, j) {
    const p = Array.from({ length: N + 1 }, (_, index) => index)

    // 1번째 상자
    let c = i
    let A = 1

    while (find(c) !== find(cards[c - 1])) {
      union(c, cards[c - 1])
      A++
      c = cards[c - 1]
    }

    if (find(i) === find(j)) return 0

    // 2번째 상자
    c = j
    let B = 1

    while (find(c) !== find(cards[c - 1])) {
      union(c, cards[c - 1])
      B++
      c = cards[c - 1]
    }

    return A * B

    function union(u, v) {
      const pu = find(u)
      const pv = find(v)
      p[pu] = p[pv]
    }

    function find(u) {
      if (p[u] === u) return u
      return (p[u] = find(p[u]))
    }
  }
}

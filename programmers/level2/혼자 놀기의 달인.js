// 다른 풀이범: union and find

function solution(cards) {
  const N = cards.length

  const visitied = Array.from({ length: N }, () => false)
  const sizes = []

  for (let i = 0; i < N; i++) {
    let size = getLinkSize(i)
    sizes.push(size)
  }
  sizes.sort((a, b) => b - a)

  return sizes[0] * sizes[1]

  function getLinkSize(i) {
    if (visitied[i]) {
      return 0
    }
    visitied[i] = true
    const next = cards[i] - 1
    return 1 + getLinkSize(next)
  }
}

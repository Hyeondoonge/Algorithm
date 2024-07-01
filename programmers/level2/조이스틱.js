// 비트 연산자를 활용한 풀이

function solution(name) {
  const N = name.length

  let change = 0

  for (let i = 0; i < N; i++) {
    const a = 'A'.charCodeAt(0) - 58
    const z = 'Z'.charCodeAt(0) - 58
    const n = name[i].charCodeAt(0) - 58
    change += Math.min(n - a, z - n + 1)
  }

  const costs = Array.from({ length: 1 << (N + 1) }, () =>
    Array.from({ length: N }, () => Infinity)
  )

  let init = 0
  for (let i = 0; i < N; i++) {
    if (name[i] === 'A') {
      init += 1 << (N - i - 1)
    }
  }

  dfs(init | (1 << (N - 1)), 0, 0)
  const move = Math.min(...costs[(1 << N) - 1])

  return move + change

  function dfs(cur, index, d) {
    if (costs[cur][index] <= d) {
      return
    }

    costs[cur][index] = d

    let nextIndex = index - 1 < 0 ? N - 1 : index - 1
    let nextState = cur | (1 << (N - 1 - nextIndex))

    dfs(nextState, nextIndex, d + 1)

    nextIndex = N <= index + 1 ? 0 : index + 1
    nextState = cur | (1 << (N - 1 - nextIndex))
    dfs(nextState, nextIndex, d + 1)
  }
}

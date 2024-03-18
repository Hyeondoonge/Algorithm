// n x m
// 석유 덩어리
// 시추관으로 단 하나만 뚫음, 가장많은 석유를 뽑아야함.
// 시추관 위치
// 시추관은 열 하나를 관통

// 석유량 => 시추관이 지나는 석유 덩어리의 크기를 모두 합한 것.

// input
// land (세로길이) 1<=n<=500
// land[i] 가로길이 1<=m<=500
// land[i][j] 0(빈) or 1(석유)

// output
// 가장 많은 석유량

function solution(land) {
  const dr = [-1, 1, 0, 0]
  const dc = [0, 0, -1, 1]

  const N = land.length
  const M = land[0].length
  const totalList = Array.from({ length: N * M }, () => 0)
  const numbers = Array.from({ length: N }, () => Array.from({ length: M }, () => -1))
  const visitied = Array.from({ length: N }, () => Array.from({ length: M }, () => false))

  let number = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (numbers[i][j] !== -1 || land[i][j] === 0) continue

      const total = bfs(i, j, number)
      totalList[number] = total
      numbers[i][j] = number++
    }
  }
  let answer = 0

  for (let j = 0; j < M; j++) {
    const visitied = new Set()
    let earn = 0
    for (let i = 0; i < N; i++) {
      if (land[i][j] === 0) continue
      if (!visitied.has(numbers[i][j])) {
        earn += totalList[numbers[i][j]]
      }
      visitied.add(numbers[i][j])
    }
    answer = Math.max(answer, earn)
  }

  return answer

  function bfs(i, j, number) {
    // 석유 양 기록
    let count = 0
    const q = []
    let idx = 0

    visitied[i][j] = true
    numbers[i][j] = number
    q.push([i, j])

    while (idx < q.length) {
      const [r, c] = q[idx++]
      count++

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k]
        const nc = c + dc[k]

        if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue
        if (visitied[nr][nc] || land[nr][nc] === 0) continue
        visitied[nr][nc] = true
        numbers[nr][nc] = number
        q.push([nr, nc])
      }
    }
    return count
  }
}

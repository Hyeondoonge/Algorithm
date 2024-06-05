// 1번~N번 학생
// 두 학생끼리 키를 비교한 일부 결과
// N명의 학생들의 키는 모두 다름

// a < b 이면 a -> b

// input
// N 학생 수 (2~500) M 두 학생 키 비교 수 (0~N(N-1)/2)
// a b 두 학생 비교 결과 (1~N) a < b를 의미

// output
// 자신의 키가 몇 번째인지 알 수 잇는 학생들의 수

function solution(N, M, compares) {
  const costs = Array.from({ length: N + 1 }, (_, i) =>
    Array.from({ length: N + 1 }, (_, j) => (i === j ? 0 : Infinity))
  )
  for (const [a, b] of compares) {
    // 갈 수 있는지 없는지만 표시하면 됨, 따라서 임의의 값 넣음.
    costs[a][b] = 0
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        costs[i][j] = Math.min(costs[i][j], costs[i][k] + costs[k][j])
      }
    }
  }

  let answer = 0
  for (let k = 1; k <= N; k++) {
    let connection = 0
    for (let i = 1; i <= N; i++) {
      if (i === k) continue
      connection += costs[i][k] !== Infinity ? 1 : 0
    }
    for (let j = 1; j <= N; j++) {
      if (j === k) continue
      connection += costs[k][j] !== Infinity ? 1 : 0
    }

    answer += connection === N - 1 ? 1 : 0
  }

  return answer
}

const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const [N, M] = input[0].split(' ').map(Number)
const compares = input.slice(1).map((str) => str.split(' ').map(Number))

console.log(solution(N, M, compares))

// 민호월드
// N개의 파티장을 가진 놀이동산
// 새로운 파티장과 기존의 모든 파티장이 직접적으로 연결되는 도로
// 도로는 일방통행

// A -> B 다이렉트 도로가 있어도 다른 지름길이 있을 수 있음
// C만큼의 시간 뒤에 B번 파티장에서 새롭게 파티가 열릴 때 1번에 따라 갈 수 있는지 쉽게 알 수 없음

// 한 파티장에서 다른 파티장에까지 시간 내에 도착 가능한지

// input
// N(5~500) 파티장 크기 M 서비스 요청 손님 수 (1~10000)
// costs (length: 5)
// costs[i][j] => i -> j 도로 이동 시간 (1~1,000,000)
// requests (length: M)
// A 시작지점 (1~N) B 도착지점 (1~N) C 파티 개최 소요 시간(1~1,000,000,000)

// output
// Enjoy other party or Stay here

function solution(N, M, costs, requests) {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        costs[i][j] = Math.min(costs[i][j], costs[i][k] + costs[k][j])
      }
    }
  }

  let answer = ''
  for (let i = 0; i < M; i++) {
    const [A, B, C] = requests[i]
    if (costs[A - 1][B - 1] <= C) {
      answer += 'Enjoy other party' + '\n'
    } else {
      answer += 'Stay here' + '\n'
    }
  }
  return answer
}

const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const [N, M] = input[0].split(' ').map(Number)
const costs = input.slice(1, N + 1).map((v) => v.split(' ').map(Number))
const requests = input.slice(N + 1).map((v) => v.split(' ').map(Number))

console.log(solution(N, M, costs, requests))

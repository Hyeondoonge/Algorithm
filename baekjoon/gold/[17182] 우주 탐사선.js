// 분류: 플로이드와샬
// 풀이시간: 12:51~1:13

// 행성 탐사 최소 시간
// 탐색할 행성 개수, 발사되는 행성의 위치, 행성 간 이동하는데 걸리는 시간
// i, j => i => j 로 이동하는데 걸리는 시간. i=j이면 0

// 중복 방문 O, 다시 돌아올 필요 없음.

// input
// N(2~10) 행성 개수 K(0~N-1) 발사되는 위치
// T
// Tij (0~1,000)

// output
// 모든 행성 탐사 최소 시간

function solution(N, S, time) {
  const costs = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      costs[i][j] = time[i][j];
    }
  }

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const newCost = costs[i][k] + costs[k][j];
        costs[i][j] = Math.min(costs[i][j], newCost);
      }
    }
  }

  let answer = Infinity;
  const visitied = Array(N).fill(false);
  visitied[S] = true;
  dfs(S, 0, 0);

  return answer;

  function dfs(u, d, sum) {
    if (d === N - 1) {
      answer = Math.min(answer, sum);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visitied[i]) continue;
      visitied[i] = true;
      dfs(i, d + 1, sum + costs[u][i]);
      visitied[i] = false;
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, S] = input[0].split(" ").map(Number);
const time = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(N, S, time));

// 분류: DP, 그래프
// 풀이시간: 2:30~3:50

// N개의 마을, 1부터 N까지 번호, 트리 구조
// 마을과 마을을 직접 잇는 N-1개의 길이 있음, 양방향
// 모든 마을은 연결되어있음, *두 마을 사이 직접 잇는 길이 있다면 인접한 마을*

// N개의 마을 중 몇 개의 마을을 우수 마을로 선정
// 우수 마을 선정된 마을 주민 수 *총합이 최대*
// 우수 마을끼리 인접 X. 인접중 하나만 가능
// 선정되지 못한 마을은 적어도 하나의 우수 마을과 인접

// input
// N 마을 수 (1~10,000)
// people[i] 마을 주민 수 (1~10,000)
// edges[i]

// output
// 우수 마을의 주민 수 총합

function solution(N, peoples, edges) {
  const adjList = Array.from({ length: N + 1 }, () => []);

  edges.forEach(([u, v]) => {
    adjList[u].push(v);
    adjList[v].push(u);
  });

  const dp = Array.from({ length: N + 1 }, () => [Infinity, Infinity]); // X, O

  dfs(1);

  return Math.max(...dp[1]);

  function dfs(i) {
    dp[i][0] = dp[i][1] = 0;

    for (let j = 0; j < adjList[i].length; j++) {
      const v = adjList[i][j];
      if (dp[v][0] !== Infinity) continue;

      dfs(v);

      dp[i][0] += Math.max(dp[v][0], dp[v][1]);
      dp[i][1] += dp[v][0];
    }

    dp[i][1] += peoples[i];
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const peoples = [0, ...input[1].split(" ").map(Number)];
const edges = input.slice(2).map((row) => row.split(" ").map(Number));

console.log(solution(N, peoples, edges));

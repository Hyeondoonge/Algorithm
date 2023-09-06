// 분류: 그래프 탐색
// 풀이시간: 1:14~2:24

// N개의 정점으로 이루어진 트리
// 각 정점은 1번부터 N번. 루트는 1번
// 주어진 두 노드의 가장 가까운 공통 조상의 번호

// input
// N 노드 수 (2~50,000)
// u 정점1 v 정점2
// ...
// M 쌍의 개수
// u 정점1 v 정점2
// ...

// output
// 두 노드의 가장 가까운 공통 조상

function solution(N, edges, M, pairs) {
  const levelList = Array(N + 1).fill(0);
  const adjList = Array.from({ length: N + 1 }, () => []); // 양방향
  const visitied = Array(N + 1).fill(false); // 양방향

  edges.forEach(([u, v]) => {
    adjList[u].push(v);
    adjList[v].push(u);
  });

  // 올라가는 방향으로 탐색 방향 지정 (level 작은 것)
  // level 만들기
  const q = [];
  visitied[1] = true;
  q.push([1, 1]); // 루트
  levelList[1] = 1;
  let idx = 0;

  while (idx < q.length) {
    const [u, level] = q[idx++];
    for (let i = 0; i < adjList[u].length; i++) {
      const v = adjList[u][i];
      if (visitied[v]) continue;
      visitied[v] = true;
      levelList[v] = level + 1;
      q.push([v, level + 1]);
    }
  }

  // 공통 조상 찾기
  for (let i = 1; i <= N; i++) {
    visitied[i] = false;
  }

  const lcaList = [];

  for (let i = 0; i < M; i++) {
    let [u, v] = pairs[i];

    // 하위 방향에서 상위로 가는 방향
    if (levelList[u] < levelList[v]) {
      [u, v] = [v, u]; // swap
    }

    while (levelList[u] !== levelList[v]) {
      for (let i = 0; i < adjList[u].length; i++) {
        const t = adjList[u][i];
        if (levelList[t] < levelList[u]) {
          u = t;
          break;
        }
      }
    }

    while (u !== v) {
      for (let i = 0; i < adjList[u].length; i++) {
        const t = adjList[u][i];
        if (levelList[t] < levelList[u]) {
          u = t;
          break;
        }
      }

      for (let i = 0; i < adjList[v].length; i++) {
        const t = adjList[v][i];
        if (levelList[t] < levelList[v]) {
          v = t;
          break;
        }
      }
    }

    lcaList.push(u);
  }

  return lcaList.join("\n");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const edges = input.slice(1, N).map((row) => row.split(" ").map(Number));
const M = Number(input[N]);
const pairs = input.slice(N + 1).map((row) => row.split(" ").map(Number));

console.log(solution(N, edges, M, pairs));

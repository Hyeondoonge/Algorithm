function solution(N, edges) {
  const graph = Array.from({ length: N + 1 }, () => [null, null]);
  let last = 0;
  let cnt = 0;

  for (const [p, u, v] of edges) {
    if (u !== -1) graph[p][0] = u;
    if (v !== -1) graph[p][1] = v;
  }

  midOrder(1);
  let cur = 0;
  likeMidOrder(1);

  return cnt;

  function midOrder(i) {
    if (graph[i][0]) midOrder(graph[i][0]);
    last = i;
    if (graph[i][1]) midOrder(graph[i][1]);
  }

  function likeMidOrder(i) {
    if (graph[i][0]) {
      if (cur !== last) cnt++;
      likeMidOrder(graph[i][0]);
      if (cur !== last) cnt++;
    }
    if (cur !== last) cur = i;
    if (graph[i][1]) {
      if (cur !== last) cnt++;
      likeMidOrder(graph[i][1]);
      if (cur !== last) cnt++;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const edges = input.slice(1).map((edge) => edge.split(' ').map(Number));

console.log(solution(N, edges));

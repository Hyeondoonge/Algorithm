const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m] = input[0].split(' ').map((e) => parseInt(e));
const graph = Array.from(new Array(n + 1), () => new Array(n + 1).fill(0));
const visitied = new Array(n + 1).fill(false);

for(let i = 0; i < m; i++) {
  const [u, v] = input[i + 1].split(' ').map((e) => parseInt(e));
  graph[u][v] = graph[v][u] = 1;
}

let answer = 0;

for(let i = 1; i <= n; i++) {
  if (visitied[i]) continue;
  visitied[i] = true;
  grouping(i);
  answer += 1;
}

console.log(answer);

function grouping(vtx) {
  for(let i = 1; i <= n; i++) {
    if (graph[vtx][i] === 0) continue; // 인접하지 않은 정점
    if (visitied[i]) continue;
    visitied[i] = true;
    grouping(i);
  }
}
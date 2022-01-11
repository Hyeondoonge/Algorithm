const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map((e) => parseInt(e));
const graph = Array.from(new Array(n + 1), (_, i) => Array.from(new Array(n + 1), (_, j) => i === j ? 0 : Infinity));

for(let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(' ').map((e) => parseInt(e));
  graph[a][b] = 1;
  graph[b][a] = -1;
}

for(let k = 1; k <= n; k++) {
  for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= n; j++) {
      if ((graph[i][k] < 0 && graph[k][j] > 0) || graph[i][k] > 0 && graph[k][j] < 0) continue;
      if (graph[i][j] > graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

let answer = 0;

for(let i = 1; i <= n; i++) {
  let bigger = 0, smaller = 0;
  for(let j = 1; j <= n; j++) {
    if (graph[i][j] === Infinity) continue;
    if (graph[i][j] <= -1) bigger += 1;
    if (graph[i][j] >= 1) smaller += 1;
  }
  if (bigger >= (n + 1) / 2 || smaller >= (n + 1) / 2) {
    answer += 1;
  }
}

console.log(answer); 
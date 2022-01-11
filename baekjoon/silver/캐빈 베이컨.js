const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m] = input[0].split(' ').map((e) => parseInt(e));

const graph = Array.from(new Array(n + 1), () => new Array(n + 1).fill(Infinity));

for(let i = 1; i <= m; i++) {
  const [u, v] = input[i].split(' ').map((e) => parseInt(e));
  graph[u][v] = graph[v][u] = 1; // 무방향
}

const kebin = new Array(n + 1);
let min = Infinity;

for(let k = 1; k <= n; k++) {
  for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= n; j++) {
      if (i === j) continue;
      if (graph[i][j] >= graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
    let sum = 0;
    for(let j = 1; j <= n; j++) {
      if (i === j) continue;
      sum += graph[i][j];
    }
    kebin[i] = sum;
    if (min > sum) {
      min = sum;
    }
  }
}

let answer = 0;

for(let i = 1; i <= n; i++) {
  if (kebin[i] === min) {
    answer = i;
    break;
  }
}

console.log(answer);
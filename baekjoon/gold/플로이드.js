const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = parseInt(input[0]);
const m = parseInt(input[1]);

const graph = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 0 : Infinity));

for(let i = 0; i < m; i++) {
  let [a, b, c] = input[i + 2].split(' ').map((e) => parseInt(e));
  a -= 1; b -= 1;
  graph[a][b] = graph[a][b] < c ? graph[a][b] : c;
}

for(let k = 0; k < n; k++) {
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      if (graph[i][j] > graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

let answer = '';

for(let i = 0; i < n; i++) {
  answer += graph[i].join(' ') + '\n';
}

console.log(answer.replace(/Infinity/g, '0'));
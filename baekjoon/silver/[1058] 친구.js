const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = parseInt(input[0]);

const graph = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => i === j ? 0 : Infinity));

for(let i = 0; i < N; i++) {
  const line = Array.from(input[i + 1]);
  for(let j = 0; j < N; j++) {
    if (line[j] === 'Y') {
      graph[i][j] = 1;
      graph[j][i] = 1;
    }
  }
}

for(let i = 0; i < N; i++) {
  for(let j = 0; j < N; j++) {
    for(let k = 0; k < N; k++) {
      graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
    }
  } 
}

let answer = 0;

for(let i = 0; i < N; i++) {
  let friend = 0;
  for(let j = 0; j < N; j++) {
    if (i === j) continue;
    if (graph[i][j] <= 2) friend++;
  }
  answer = max(answer , friend);
}

console.log(answer);

function min (a, b) {
  return a < b ? a : b;
}

function max (a, b) {
  return a > b ? a : b;
}
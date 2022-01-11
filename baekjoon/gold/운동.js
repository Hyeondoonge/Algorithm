const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [v, e] = input[0].split(' ').map((e) => parseInt(e));

const cost = Array.from({length: v + 1 }, (_, i) => Array.from({length: v + 1}, (_, j) => i === j ? 0 : Infinity));

for(let i = 0; i < e; i++) {
  const [a, b, c] = input[i + 1].split(' ').map((e) => parseInt(e));
  cost[a][b] = c;
}

for(let k = 1; k <= v ; k++) {
  for(let i = 1; i <= v; i++) {
    for(let j = 1; j <= v; j++) {
      if (cost[i][j] > cost[i][k] + cost[k][j]) {
        cost[i][j] = cost[i][k] + cost[k][j];
      }
    }
  }
}

let answer = Infinity;

for(let i = 1; i <= v; i++) {
  for(let j = 1; j <= v; j++) {
    if (i === j) continue;
    if (cost[i][j] !== Infinity && cost[j][i] !== Infinity) {
      answer = answer < cost[i][j] + cost[j][i] ? answer : cost[i][j] + cost[j][i];
    }
  }
}

if (answer === Infinity) console.log(-1);
else console.log(answer);
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split(' ');

const [a, b] = input.map((e) => parseInt(e));

let n = 0;

let answer = Infinity;

const dfs = (n, d) => {
  if (n >= b) {
    if (n == b) answer = answer < d ? answer : d;
    return;
  }

  dfs(n * 2, d + 1);
  dfs(n * 10 + 1, d + 1);
}

dfs(a, 1);


console.log(answer === Infinity ? -1 : answer);
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m] = input[0].split(' ').map((e) => parseInt(e));

const visitied = [];
let answer = '';

const perm = (depth) => {
  if (depth === m) {
    for(let i = 0; i < visitied.length; i++) {
      answer += `${visitied[i]} `
    }
    answer += '\n';
    return;
  }

  for(let i = 1; i <= n; i++) {
    if (visitied.includes(i)) continue;
    visitied.push(i);
    perm(depth + 1);
    visitied.pop();
  }
}

perm(0);

console.log(answer);
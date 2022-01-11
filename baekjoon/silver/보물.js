const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);
const a = input[1].split(' ').map((e) => parseInt(e));
const b = input[2].split(' ').map((e) => parseInt(e));

a.sort((a, b) => a - b);
b.sort((a, b) => b - a);

let answer = 0;

for(let i = 0; i < n; i++) {
  answer += a[i] * b[i];
}

console.log(answer);
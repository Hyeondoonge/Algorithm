const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, l] = input[0].split(' ').map((e) => parseInt(e));
const arr = input[1].split(' ').map((e) => parseInt(e));
arr.sort((a, b) => a - b);

let s = 0, e = 0;
let answer = 0;

for(let i = 0; i < arr.length; i++) {
  if (s <= arr[i] && arr[i] <= e) continue;
  s = arr[i] - 0.5;
  e = s + l;
  answer += 1;
}

console.log(answer);
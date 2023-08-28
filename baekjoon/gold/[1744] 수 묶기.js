const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);

const arr = [];

for(let i = 0; i < n; i++) {
  arr.push(parseInt(input[i + 1]));
}

arr.sort((a, b) => a - b);

let answer = 0;
let idx = 0;

while (idx + 1 < n &&
  arr[idx] < 1 && arr[idx + 1] < 1) {
  answer += arr[idx] * arr[idx + 1];
  idx += 2;
}

while (idx < n && arr[idx] <= 0) {
  answer += arr[idx];
  idx += 1;
}

idx = n - 1;

while (idx - 1 >= 0 && arr[idx] > 1 && arr[idx - 1] > 1) {
  answer += arr[idx] * arr[idx - 1];
  idx -= 2;
}

while (idx >= 0 && arr[idx] > 0) {
  answer += arr[idx];
  idx -= 1;
}

console.log(answer);
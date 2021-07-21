const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, s] = input[0].split(' ');

const arr = input[1].split(' ').map((e) => parseInt(e));

let l = 0, r = 0, sum = arr[0], answer = 100001;

while (l <= r && r < arr.length) {
  if (sum >= s) {
    answer = r - l + 1 < answer ? r - l + 1: answer;
    sum -= arr[l++];
  } else {
    sum += arr[++r];
  }
}

if (answer === 100001) console.log(0);
else console.log(answer);
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);
const arr = input[1].split(' ').map((e) => parseInt(e)).sort((a, b) => a - b);

let l = 0; r = arr.length;

while((r - l) >= 0) {
  const m = (r + l) / 2;

  if (arr[m] >= 0) r -= 1;
  else l += 1;
}

lastM = r - 1;
lastP = arr.length - 1;

l = 0; r += 1;

let sum = arr[l] + arr[r];
let answer = 2000000000;
let ansArr = [];

const q = [];
q.push([l, r, sum]);

while (q.length) {
  const [left, right, sum] = q.shift();

  if (answer > Math.abs(sum)) {
    answer = Math.abs(sum);
    ansArr = [arr[left], arr[right]];
  }

  if (left === lastM || right === lastP) continue;

  q.push([left + 1, right, arr[right] + arr[left + 1]]);
  q.push([left, right+ 1,  arr[left] + arr[right + 1]]);
};

console.log(ansArr);
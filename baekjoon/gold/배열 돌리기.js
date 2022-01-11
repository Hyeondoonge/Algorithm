const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m, k] = input[0].split(' ').map((e) => parseInt(e));;

const arr = new Array(n);

for(let i = 0; i < n; i++) {
  arr[i] = input[i + 1].split(' ').map((e) => parseInt(e));
}

const rotatedArray = (r, c, s) => {
  const copiedArr = new Array(s);

  for(let i = 0; i < s * 2 + 1; i++) {
    for(let j = 0; j < s * 2 + 1; j++) {
      copiedArr[i][j] = arr[r - s + i][c - s + j];
    }
  }

  console.log(copiedArr);
};

for(let i = 0; i < k; i++) {
  const [r, c, s] = input[n + i + 1].split(' ').map((e) => parseInt(e));
  rotatedArray(r - 1, c - 1, s);
}
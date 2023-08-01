const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const map = input.slice(1).map((row) => Array.from(row));

let hCnt = 0; // 가로
let vCnt = 0; // 수직

// 가로 방향 찾기
for (let i = 0; i < N; i++) {
  let s = 0;
  for (let j = 0; j <= N; j++) {
    if (j === N || map[i][j] === 'X') {
      hCnt += s >= 2 ? 1 : 0;
      s = 0;
    } else {
      s++;
    }
  }
}

for (let j = 0; j < N; j++) {
  let s = 0;
  for (let i = 0; i <= N; i++) {
    if (i === N || map[i][j] === 'X') {
      vCnt += s >= 2 ? 1 : 0;
      s = 0;
    } else {
      s++;
    }
  }
}

console.log(hCnt + ' ' + vCnt);

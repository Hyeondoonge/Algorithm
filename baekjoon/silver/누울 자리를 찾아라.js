// N * N 방
// 누울 수 있는 자리 => 2칸 이상의 연속된 빈 칸, 가로 세로 ok

// input
// N 방의 크기 (1~100)
// arr[i][j] (. or X) . => 빈 칸, X 짐

// output
// 가로, 세로 누울 수 있는 자리 개수

function solution(N, map) {
  let hCnt = 0; // 가로
  let vCnt = 0; // 수직

  // 가로 방향 찾기
  for (let i = 0; i < N; i++) {
    let s = 0;
    for (let j = 0; j <= N; j++) {
      if (j === N || map[i][j] === 'X') {
        // 빈칸 or 벽
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
        // 빈칸 or 벽
        vCnt += s >= 2 ? 1 : 0;
        s = 0;
      } else {
        s++;
      }
    }
  }
  return hCnt + ' ' + vCnt;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const map = input.slice(1).map((row) => Array.from(row));

console.log(solution(N, map));

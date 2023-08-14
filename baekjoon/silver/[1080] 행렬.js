// 분류: 그리디
// 풀이시간: 2:03~2:23

// 0, 1로 이루어진 행렬 A, B
// A -> B 변환에 필요한 연산 최소 횟수
// 연산? 3x3 행렬의 각 원소를 1 <-> 0 변환

// input
// N(1~50) M(1~50)
// 행렬 A, B

// output
// 최소 연산 횟수 or -1 (변환 불가능)

function solution(N, M, A, B) {
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (A[i][j] === B[i][j]) continue;
      // 색칠 불가하면 변환 불가능
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          if (N <= i + k || M <= j + l) return -1;
          A[i + k][j + l] = A[i + k][j + l] ? 0 : 1;
        }
      }
      cnt++;
    }
  }
  return cnt;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const A = input.slice(1, N + 1).map((row) => Array.from(row).map(Number));
const B = input.slice(N + 1).map((row) => Array.from(row).map(Number));

console.log(solution(N, M, A, B));

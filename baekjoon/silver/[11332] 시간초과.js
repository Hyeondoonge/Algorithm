// 분류: 구현
// 풀이시간: 5:40~6:30

// 시간복잡도 계산
// 1초에 10^8가지 동작 가능

// input
// C(1~100)
// S 시간 복잡도(주어진 5가지) N 입력최대범위 (1~1,000,000) T 테스트 케이스 수 (1~10) L 제한 시간(초 단위, 1~10)

// output
// TLE! or May Pass.

function solution(C, cases) {
  const UNIT = BigInt(Math.pow(10, 8));
  const answer = [];

  for (let i = 0; i < C; i++) {
    const [S, N, T, L] = cases[i];

    const result = isOverLimit(S, N, T, L);
    answer.push(result ? "TLE!" : "May Pass.");
  }
  return answer.join("\n");

  function isOverLimit(S, N, T, L) {
    N = BigInt(N);
    T = BigInt(T);
    L = BigInt(L);

    if (S === "O(N)") {
      return UNIT * L < N * T;
    } else if (S === "O(2^N)") {
      let result = 1n;
      while (N--) {
        result *= 2n;

        if (UNIT * L < result) {
          return true;
        }
      }
      return UNIT * L < result * T;
    } else if (S === "O(N!)") {
      let result = 1n;
      while (N--) {
        result *= N + 1n;
        if (UNIT * L < result) {
          return true;
        }
      }
      return UNIT * L < result * T;
    } else if (S === "O(N^2)") {
      let loop = 2;
      let result = 1n;

      while (loop--) {
        result *= N;
        if (UNIT * L < result) {
          return true;
        }
      }
      return UNIT * L < result * T;
    } else if (S === "O(N^3)") {
      let loop = 3;
      let result = 1n;

      while (loop--) {
        result *= N;

        if (UNIT * L < result) {
          return true;
        }
      }
      return UNIT * L < result * T;
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const C = Number(input[0]);
const cases = input.slice(1).map((row) => row.split(" "));

console.log(solution(C, cases));

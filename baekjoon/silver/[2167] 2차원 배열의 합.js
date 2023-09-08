// 분류: 누적합
// 풀이시간: 12:05~12:35

// 2차원 배열 (i, j) => (x, y) 저장되어있는 수들의 합?
// input
// N (1~300) M(1~300)
// arr[i][j] (|x| <= 10,000)
// K (1~10,000)
// i(1~N) j(1~N) x(1~M) y(1~M)

// output

function solution(arr, coords) {
  const prefixSum = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));

  for (let j = 0; j < M; j++) {
    for (let i = 0; i < N; i++) {
      prefixSum[i][j] = arr[i][j] + (0 <= i - 1 ? prefixSum[i - 1][j] : 0);
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      prefixSum[i][j] += 0 <= j - 1 ? prefixSum[i][j - 1] : 0;
    }
  }

  let answer = [];
  for (let i = 0; i < coords.length; i++) {
    const [r1, c1, r2, c2] = coords[i].map((v) => v - 1);

    let sum = prefixSum[r2][c2];

    if (isInScope(r1 - 1, c1 - 1)) {
      sum += prefixSum[r1 - 1][c1 - 1];
    }
    if (isInScope(r2, c1 - 1)) {
      sum -= prefixSum[r2][c1 - 1];
    }
    if (isInScope(r1 - 1, c2)) {
      sum -= prefixSum[r1 - 1][c2];
    }
    answer.push(sum);
  }

  return answer.join("\n");
  function isInScope(r, c) {
    return !(r < 0 || N <= r || c < 0 || M <= c);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const coords = input.slice(N + 2).map((row) => row.split(" ").map(Number));

console.log(solution(arr, coords));

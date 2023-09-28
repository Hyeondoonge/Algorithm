// 분류: 수학
// 풀이시간: 4:00~5:35

// nCm의 끝자리 0의 개수를 출력

// input
// n, m (0~2,000,000,000), n != 0

// output
// 끝자리 0의 개수!

function solution(N, M) {
  let A = [0, 0];

  const numbers = [N, M, N - M];

  for (let i = 0; i < 3; i++) {
    let two = 0;
    let five = 0;

    for (let k = 2; k <= numbers[i]; k *= 2) {
      two += Math.floor(numbers[i] / k);
    }

    for (let k = 5; k <= numbers[i]; k *= 5) {
      five += Math.floor(numbers[i] / k);
    }

    if (i === 0) {
      A[0] = two;
      A[1] = five;
    } else {
      A[0] -= two;
      A[1] -= five;
    }
  }

  return min(A[0], A[1]);
}

function min(a, b) {
  if (a < b) return a;
  return b;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

console.log(solution(N, M));

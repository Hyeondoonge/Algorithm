// 분류: 수학
// 풀이시간: 2:24~2:35

// nCm 출력

// input
// n (5~100)
// m (5~100)
// * m <= n

// output
// nCm

function solution(N, M) {
  const K = Math.min(M, N - M);

  let p = 1n;
  for (let i = 1; i <= K; i++) {
    p *= BigInt(i);
  }

  let c = 1n;
  for (let i = N - K + 1; i <= N; i++) {
    c *= BigInt(i);
  }

  let answer = c / p;
  return answer.toString();
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

console.log(solution(N, M));

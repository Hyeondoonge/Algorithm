// 분류: DP
// 풀이시간: 5:06~5:22

// 여러 단원 융합 문제 출제 X
// 한 단원에 한 문제 출제

// 단원 별 배점

// 예상 공부 시간 이상 공부하면 맞출 수 있음.

// 최대 점수

// input
// N 단원 개수 (1~100) T 총 시간 (1~10,000)
// K 예상 공부 시간 (1~1,000) S 문제 배점 (1~1,000)

// output
// 최대 점수

function solution(N, T, tests) {
  const dp = Array.from({ length: T + 1 }, () => 0);
  for (let i = 0; i < N; i++) {
    const [K, S] = tests[i];
    for (let j = T; j >= K; j--) {
      dp[j] = Math.max(dp[j], dp[j - K] + S);
    }
  }
  let answer = 0;
  for (let i = 1; i <= T; i++) {
    answer = Math.max(dp[i], answer);
  }
  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, T] = input[0].split(" ").map(Number);
const tests = input.slice(1).map((row) => row.split(" ").map(Number));
console.log(solution(N, T, tests));

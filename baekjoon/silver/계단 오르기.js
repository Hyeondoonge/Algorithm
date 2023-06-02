function solution(N, scores) {
  const dp = Array.from({ length: N }, () => [0, 0]); // 연속 X, 연속 O

  dp[0][0] = scores[0];

  if (2 <= N) {
    dp[1][1] = scores[0] + scores[1];
    dp[1][0] = scores[1];
  }

  for (let i = 2; i < N; i++) {
    dp[i][1] = dp[i - 1][0] + scores[i];
    dp[i][0] = Math.max(dp[i - 2][0], dp[i - 2][1]) + scores[i];
  }

  return Math.max(dp[N - 1][0], dp[N - 1][1]);
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const scores = input.slice(1).map(Number);

console.log(solution(N, scores));

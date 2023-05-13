function solution(N, K) {
  const dp = Array.from({ length: N + 1 }, () => Array.from({ length: K + 1 }, () => BigInt(0)));

  const M = 1000000003n;

  dp[1][1] = 1n;
  dp[1][0] = 1n;
  dp[2][0] = 1n;
  dp[2][1] = 2n;

  for (let i = 3; i <= N; i++) {
    dp[i][0] = BigInt(1);
    dp[i][1] = BigInt(i);
    for (let j = 2; j <= K; j++) {
      dp[i][j] = dp[i][j] + dp[i - 2][j - 1] + dp[i - 1][j];
    }
  }
  return String((dp[N - 3][K - 1] + dp[N - 1][K]) % M);
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const K = Number(input[1]);

console.log(solution(N, K));

// 핵심
// 1. 순열 계산 시 작은 값은 ok지만, 큰 값에 대해 시간초과를 보임
// 2. 규칙을 찾아 dp 적용

const solution = (n) => {
  const dp = [];
  dp[1] = 1;
  dp[2] = 2;

  for(let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
  }
  return dp[n];
};
function solution(N, powers) {
  const dp = Array.from({ length: N }, () => 1);

  for (let i = 0; i < N; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (powers[j] > powers[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return N - Math.max(...dp);
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const powers = input[1].split(' ').map(Number);

console.log(solution(N, powers));

function solution(N, K, items) {
  const dp = Array.from({ length: K + 1 }, () => -1); // weight
  let answer = 0;

  for (let i = 0; i < items.length; i++) {
    const [w, v] = items[i];
    for (let j = K - 1; j >= 1; j--) {
      if (K < w + j) continue;
      if (dp[j] === -1) continue;
      dp[w + j] = Math.max(dp[w + j], dp[j] + v);

      answer = Math.max(answer, dp[w + j]);
    }

    if (K < w) continue;
    dp[w] = Math.max(dp[w], v);
    answer = Math.max(answer, dp[w]);
  }
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const items = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, K, items));

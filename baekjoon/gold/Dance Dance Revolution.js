function solution(steps) {
  const N = steps.length - 1;
  const M = 5;
  const dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: M }, () => Array.from({ length: M }, () => Infinity))
  );

  dp[0][0][0] = 0;

  if (N === 0) return 0;

  let answer = Infinity;

  for (let k = 1; k <= N; k++) {
    const step = steps[k - 1];
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        if (step !== j) {
          dp[k][step][j] = Math.min(dp[k][step][j], dp[k - 1][i][j] + power(i, step));
        }

        if (step !== i) {
          dp[k][i][step] = Math.min(dp[k][i][step], dp[k - 1][i][j] + power(j, step));
        }

        if (k === N) {
          answer = Math.min(answer, dp[k][step][j], dp[k][i][step]);
        }
      }
    }
  }

  return answer;

  function power(a, b) {
    if (b < a) {
      [a, b] = [b, a];
    }

    if (a === 0) return 2;
    if (a === b) return 1;
    if (b - a === 2) return 4;
    return 3;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const steps = input[0].split(' ').map(Number);

console.log(solution(steps));

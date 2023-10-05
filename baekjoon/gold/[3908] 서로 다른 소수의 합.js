// 분류: DP
// 풀이시간: 5:01~5:48

// 양의 정수 => 서로 다른 소수의 합
// n을 서로 다른 k개 소수의 합으로 나타내는 방법의 수
// 구성하는 수가 동일하면 같은 경우로 봄

// input
// T
// n (0~1120) k (0~14)

// output
// 경우의 수 (0~2^31)

function solution(tc) {
  const MAX_N = 1120; // updaet
  const MAX_K = 14;
  const dp = Array.from({ length: MAX_N + 1 }, () => Array.from({ length: MAX_K + 1 }, () => 0));
  dp[0][0] = 1;

  const prime = [];

  for (let i = 2; i <= MAX_N; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.pow(i, 1 / 2); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) prime.push(i);
  }

  for (let i = 0; i < prime.length; i++) {
    for (let j = MAX_N; j >= prime[i]; j--) {
      for (let k = 0; k <= MAX_K; k++) {
        // target: j - prime[i] (>= 0)
        dp[j][k + 1] += dp[j - prime[i]][k];
      }
    }
  }

  const answer = [];

  for (let i = 0; i < tc.length; i++) {
    const [n, k] = tc[i];
    answer.push(dp[n][k]);
  }

  return answer.join("\n");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = Number(input[0]);
const tc = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(tc));
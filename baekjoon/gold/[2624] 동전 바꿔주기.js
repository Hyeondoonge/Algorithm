// 분류: DP
// 풀이시간: 11:33~12:10

// k가지 동전, n1, n2, ...nk 개씩
// T원의 지폐를 동전으로 바꾸기

// 지폐를 동전으로 교환하는 방법 가지 수
// input
// T 지폐 (1~10,000)
// k 가지 수 (1~100)
// coins
// coins[i] p 금액 (1~T) n 개수 (1~1,000)

// output
// 가지 수 (0~2^31-1)

function solution(T, N, coins) {
  coins.sort((a, b) => a[0] - b[0]);

  const dp = Array.from({ length: T + 1 }, () => 0);
  dp[0] = 1;

  for (let i = 0; i < N; i++) {
    const [p, n] = coins[i];

    for (let j = T; j >= p; j--) {
      for (let k = n; k >= 1; k--) {
        if (j - p * k < 0) continue;
        // 개수
        dp[j] += dp[j - p * k];
      }
    }
  }

  return dp[T];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = Number(input[0]);
const N = Number(input[1]);
const coins = input.slice(2).map((row) => row.split(" ").map(Number));

console.log(solution(T, N, coins));

// 분류: DP
// 풀이시간: 1:33~2:06

// 개근상 주기
// 출석, 지각, 결석
// 개근상 X => 지각 두 번 이상 or 결석 세 번 연속
// input
// N 학기 일 수 (1~1,000)

// output
// 개근상 갯수 % 1,000,000

function solution(N) {
  let answer = 0;
  const mod = 1000000;

  const dp = Array.from({ length: N }, () => [0, 0, 0]);
  dp[0][0] = 1;
  dp[0][1] = 1;
  // 지각 X
  for (let i = 1; i < N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % mod;
    dp[i][1] = dp[i - 1][0];
    dp[i][2] = dp[i - 1][1];
  }
  answer = (answer + dp[N - 1][0] + dp[N - 1][1] + dp[N - 1][2]) % mod;

  // 초기화?
  // 지각 O
  for (let i = 0; i < N; i++) {
    // i일 떄 지각
    for (let k = 0; k < N; k++) {
      dp[k][2] = dp[k][1] = dp[k][0] = 0;
    }

    dp[0][0] = 1;
    if (i !== 0) dp[0][1] = 1;

    for (let k = 1; k < N; k++) {
      if (i === k) {
        dp[k][0] = (dp[k - 1][0] + dp[k - 1][1] + dp[k - 1][2]) % mod;
        dp[k][1] = 0;
        continue;
      }

      dp[k][0] = (dp[k - 1][0] + dp[k - 1][1] + dp[k - 1][2]) % mod;
      dp[k][1] = dp[k - 1][0];
      dp[k][2] = dp[k - 1][1];
    }

    answer = (answer + dp[N - 1][0] + dp[N - 1][1] + dp[N - 1][2]) % mod;
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);

console.log(solution(N));

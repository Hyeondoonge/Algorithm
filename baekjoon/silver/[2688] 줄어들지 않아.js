// 분류: DP
// 풀이시간: 12;08~12:18

// 줄어들지 않는 숫자. 각 자리수보다 왼쪽 자리수가 작거나 같음. ex 1234
// 0이 있는 걸 허용함.
// 줄어들지 않는 n자리 수 개수

// input
// T(1~1,000)
// numbers[i] (1~64)

// output
// 줄어들지 않는 n자리수 개수

function solution(tc) {
  const N = 64;
  const M = 10;
  const dp = Array.from({ length: N + 1 }, () => Array.from({ length: M }, () => 0));

  for (let i = 0; i < M; i++) {
    dp[1][i] = 1;
  }

  for (let i = 2; i <= N; i++) {
    // 자리수
    for (let j = 0; j < M; j++) {
      for (let k = 0; k <= j; k++) {
        dp[i][j] += dp[i - 1][k];
      }
    }
  }

  let answer = "";
  for (let i = 0; i < tc.length; i++) {
    answer += dp[tc[i]].reduce((prev, cur) => prev + cur) + "\n";
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const tc = input.slice(1).map(Number);

console.log(solution(tc));

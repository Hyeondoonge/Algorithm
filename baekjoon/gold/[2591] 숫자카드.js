// 분류: DP
// 풀이시간: 11:30~12:08

// 1~34까지 적힌 수가 충분히 많이 있음
// 몇 장을 일렬로 놓고, 차례로 적음.
// 여러가지 방법으로 늘어놓음.

// 거꾸로 카드의 배열 찾기?

// input
// number (length:1~40)

// output
// 가능한 카드배열

function solution(number) {
  const numbers = Array.from(number).map(Number);
  const N = number.length;
  const dp = Array.from({ length: N }, () => [0, 0]); // 한자리, 두자리
  dp[0][0] = 1;

  for (let i = 1; i < N; i++) {
    const number = numbers[i];
    if (number !== 0) {
      dp[i][0] += dp[i - 1][0] + dp[i - 1][1];
    }
    if ((1 <= numbers[i - 1] && numbers[i - 1] <= 2) || (numbers[i - 1] === 3 && number <= 4)) {
      // 1~34
      dp[i][1] += dp[i - 1][0];
    }
  }

  return dp[N - 1][0] + dp[N - 1][1];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const number = input[0];

console.log(solution(number));

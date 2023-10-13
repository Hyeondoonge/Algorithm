// 분류: DP
// 풀이시간: 11:25~12:53

// 하루 이용권: 10,000
// 3일 연속 이용권: 25,000 (쿠폰1)
// 5일 연속 이용권: 37,000 (쿠폰2)
// 쿠폰 3장: 이용권 한 장

// 구입일로부터 연속한 기간동안 이용 가능 (해당 기간 모두 이용하지 않아도됨)

// N일의 여름방학, 리조트갈 수 없는 M일이 있는데 그 외의 날들은 리조트에서 보냄 => 가장 저렴한 비용으로

// input
// N 여름방학 일 수(1~100) M 갈 수 없는 날의 수(0~N)
// days 갈 수 없는 날
// days[i] (1~N, length: M)

// output
// 모든 날에 입장하기위한 최소비용

function solution(N, days) {
  const MAX_COUPON = 41;
  const dp = Array.from({ length: N + 1 }, () => Array.from({ length: MAX_COUPON }, () => Infinity));

  dp[0][0] = 0;

  for (let i = 1; i <= N; i++) {
    // 쿠폰 사용
    for (let j = 3; j < MAX_COUPON; j++) {
      dp[i][j - 3] = Math.min(dp[i][j - 3], dp[i - 1][j]);
    }

    for (let j = 0; j < MAX_COUPON; j++) {
      dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 10000);
      if (i >= 3 && j + 1 < MAX_COUPON) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i - 3][j] + 25000);
      if (i >= 5 && j + 2 < MAX_COUPON) dp[i][j + 2] = Math.min(dp[i][j + 2], dp[i - 5][j] + 37000);
    }

    if (!days.includes(i)) continue;

    for (let j = 0; j < MAX_COUPON; j++) {
      dp[i][j] = Math.min(dp[i][j], dp[i - 1][j]);
    }
  }

  let answer = Infinity;

  for (let i = 0; i < MAX_COUPON; i++) {
    answer = Math.min(answer, dp[N][i]);
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

if (M === 0)
  console.log(
    solution(
      N,
      Array(N).map((_, index) => index + 1)
    )
  );
else {
  const days = input[1].split(" ").map(Number).slice(0, M);
  console.log(solution(N, days));
}

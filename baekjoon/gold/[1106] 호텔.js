// 분류: DP
// 풀이시간: 4;57~5:14

// 홍보할 수 있는 도시, 도시별 홍보 비용과 늘어나는 호텔 고객수에 대한 정보
// 금액에 *정수배*만큼 투자 가능
// 무한 명의 잠재적인 고객이 있음, 이때 호텔의 고객을 적어도 C명 늘이기위해 투자해야하는 돈의 최소값

// input
// C 타겟 고객 수 (1~1,000) N 도시 개수 (1~20)
// cities[i] cost 비용 (1~100) customer 고객 수 (1~100)

// output
// 적어도 C명 늘이기위해 필요한 최소 비용

function solution(C, N, cities) {
  const dp = Array.from({ length: C + 1 }, () => Infinity);
  dp[0] = 0;

  for (let i = 0; i < N; i++) {
    const [cost, customer] = cities[i];

    for (let j = 1; j <= Math.ceil(C / customer); j++) {
      for (let k = 0; k <= C; k++) {
        let c = Math.min(C, k + customer * j);
        dp[c] = Math.min(dp[c], dp[k] + cost * j);
      }
    }
  }

  return dp[C];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [C, N] = input[0].split(" ").map(Number);
const cities = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(C, N, cities));

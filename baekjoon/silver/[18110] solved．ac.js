// 4:04~4:17

// 난의도 의견 => 정수 하나
// 난이도 결정 방식

// 의견 X => 난이도 0
// 의견 하나 이상 => 모든 사람의 난이도 의견의 30% 절사평균
// * 절사평균: 가장 큰 값, 가장 작은 값 제외하고 평균
// 30% 절사평균 => 위 15 아래 15 제외한 평균을 계산
// 제외되는 사람의 수는 반올림, 25의 15% => 3.75이지만 4로 계산

// 계산된 평균 반올림

// input
// n(0~300,000)
// 난이도 의견 1~30

// output
// 30% 절사평균

function solution(N, ranks) {
  if (N === 0) return 0;

  ranks.sort((a, b) => a - b);
  const K = Math.round((N * 15) / 100);

  const S = K,
    E = N - K - 1;

  let answer = 0;
  for (let i = S; i <= E; i++) {
    answer += ranks[i];
  }
  return Math.round(answer / (E - S + 1));
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const ranks = input.slice(1).map(Number);

console.log(solution(N, ranks));

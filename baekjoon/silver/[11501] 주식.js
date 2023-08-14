// 분류: 그리디
// 풀이시간: 3:20~4:16

// 1. 주식 매입 2. 원하는 만큼 보유 주식 팔기 3. 아무것도 안함

// 날 별로 주식 가격을 알려주었을 때, 최대 이익 계산

// input
// T
// N 날의 수 (2~1,00,000)
// price[i] 주가 (0~10,000)

// output
// 최대 이익 (64bit)

function solution(N, stocks) {
  const max = Array.from({ length: N }, () => 0);
  let curMax = -1;

  let value = 0;

  for (let i = N - 1; i >= 0; i--) {
    curMax = Math.max(curMax, stocks[i]);
    value += curMax - stocks[i];
    max[i] = curMax;
  }

  return value;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0;
let T = Number(input[idx++]);

let answer = "";

while (T--) {
  const N = Number(input[idx++]);
  const stocks = input[idx++].split(" ").map(Number);

  answer += solution(N, stocks) + "\n";
}

console.log(answer);

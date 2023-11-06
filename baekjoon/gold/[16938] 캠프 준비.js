// 분류: dfs
// 풀이시간: 12:11~12:32

// N개의 문제, 문제의 정수 난이도
// i번째 문제 난이도 Ai

// 두 문제 이상을 캠프에 사용
// 문제 난이도의 합은 L보다 크거나 같고, R보다 작거나 같다
// 가장 어려운 문제, 가장 쉬운 문제의 난이도 차이는 X보다 크거나 같다

// 방법의 수

// input
// N(1~15) L(1~10^9) R(1~10^9) X(1~10^6)
// A 문제의 난이도
// A[i] (1~10^6)

// output

function solution(N, L, R, X, scores) {
  let highest = -Infinity;
  let lowest = Infinity;

  let answer = 0;
  const hist = [];

  dfs(0, 0, 0);

  return answer;

  function dfs(k, d, sum) {
    if (d >= 2) {
      if (X <= highest - lowest && L <= sum && sum <= R) {
        answer++;
      }
    }

    for (let i = k; i < N; i++) {
      hist.push(i);

      let temp1 = highest;
      let temp2 = lowest;
      highest = Math.max(highest, scores[i]);
      lowest = Math.min(lowest, scores[i]);

      dfs(i + 1, d + 1, sum + scores[i]);
      hist.pop();

      highest = temp1;
      lowest = temp2;
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, L, R, X] = input[0].split(" ").map(Number);
const scores = input[1].split(" ").map(Number);

console.log(solution(N, L, R, X, scores));

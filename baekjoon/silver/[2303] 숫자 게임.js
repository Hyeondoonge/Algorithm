// 분류: 구현
// 풀이시간: 2:36~2:50

// N명, 개인 당 1~10 수 중 다섯 장의 카드
// 다섯 장에서 세 장의 카드의 합 => 일의 자리수가 가장 큰 사람이 게임 윈

// 세 장의 카드 선택 시, 카드 합의 일의 자리수가 가장 크게 되도록 선택

// input
// N (2~1,000) 사람 수
// 1~N번 사람의 카드 cards[i][j] (1~10), length: 5

// output
// winner의 번호, 여러 명인 경우 번호가 가장 **큰** 사람

function solution(cards) {
  const answer = [0, 0];

  for (let i = 0; i < N; i++) {
    let score = 0;
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (j === k) continue;
        for (let l = 0; l < 5; l++) {
          if (k === l || j === l) continue;
          const num = cards[i][j] + cards[i][k] + cards[i][l];

          const len = num.toString().length;
          score = Math.max(score, num.toString()[len - 1]);
        }
      }
    }
    if (answer[1] <= score) {
      answer[0] = i + 1;
      answer[1] = score;
    }
  }
  return answer[0];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const cards = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(cards));

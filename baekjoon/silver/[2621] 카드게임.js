// 분류: 구현
// 풀이시간: 4:21~5:25

// 카드 R, B, G, Y
// 깔별로 1~9가 작성된 숫자 => 총 36장 카드

// 36장 => 5장 뽑기
// 규칙에 따라 정수를 계산
// 1. 5장이 모두 같은 색이고 *연속적*인 숫자 => 가장 높은 숫자 + 900
// 2. 카드 5장 중 4장의 숫자가 같을 때 => 같은 숫자 + 800
// 3. 3장의 숫자 같고, 나머지 2장 숫자가 같을 때 => 3장 같은 숫자 * 10 + 2장 같은 숫자 + 700
// 4. 5장 모두 같은 색깔 => 가장 높은 숫자 + 600
// 5. 숫자가 연속적일 때 => 가장 높은 숫자 + 500
// 6. 3장의 숫자가 같을 때 => 같은 숫자 + 400
// 7. 2장의 숫자 같고, 다른 2장 숫자가 같을 때 => 같은 숫자 중 큰 숫자 * 10 + 같은 숫자 중 작은 숫자 + 300
// 8. 2장의 숫자 같을 때 => 같은 숫자 + 200
// 9. 아무 경우도 아닐 때 => 가장 큰 숫자 + 100

// input
// [COLOR] [NUMBER] 카드 입력 5줄

// output
// 카드 게임의 점수
// 두 가지 이상 규칙 적용가능하면 가장 높은 점수가 카드게임 점수

// 실수하기 매우 쉬운 문제

function solution(cards) {
  let score = 100 + maxNumber(); // 최소 점수

  const set = findSet(); // [cnt, number]

  if (sameColor() && linear()) {
    score = Math.max(score, 900 + maxNumber());
  }

  if (set.length === 1 && set[0][0] === 4) {
    score = Math.max(score, 800 + set[0][1]);
  }

  if (set.length === 2 && set[0][0] === 3) {
    score = Math.max(score, set[0][1] * 10 + set[1][1] + 700);
  }

  if (sameColor()) {
    score = Math.max(score, 600 + maxNumber());
  }

  if (linear()) {
    score = Math.max(score, 500 + maxNumber());
  }

  if (set.length === 1 && set[0][0] === 3) {
    score = Math.max(score, 400 + set[0][1]);
  }

  if (set.length === 2 && set[0][0] === 2) {
    score = Math.max(score, 300 + set[0][1] * 10 + set[1][1]);
  }

  if (set.length === 1 && set[0][0] === 2) {
    score = Math.max(score, 200 + set[0][1]);
  }

  return score;

  function sameColor() {
    for (let i = 1; i < 5; i++) {
      if (cards[i][0] !== cards[i - 1][0]) return false;
    }
    return true;
  }

  function maxNumber() {
    return Math.max(...cards.map((card) => card[1]));
  }

  function findSet() {
    cards.sort((a, b) => a[1] - b[1]);
    const set = [];
    let cnt = 0;

    for (let i = 0; i < 5; i++) {
      if (i !== 0 && cards[i][1] !== cards[i - 1][1]) {
        if (cnt !== 1) set.push([cnt, cards[i - 1][1]]);
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt !== 1) set.push([cnt, cards[4][1]]);

    set.sort((a, b) => {
      if (a[0] > b[0]) return -1;
      if (a[0] < b[0]) return 1;
      if (a[0] === b[0]) return b[1] - a[1];
    });
    return set;
  }

  function linear() {
    cards.sort((a, b) => a[1] - b[1]);
    for (let i = 1; i < 5; i++) {
      if (cards[i][1] - cards[i - 1][1] !== 1) return false;
    }
    return true;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const cards = input.map((row) => {
  const [c, n] = row.split(" ");
  return [c, Number(n)];
});

console.log(solution(cards));

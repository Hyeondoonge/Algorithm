// 1~6이 적혀있는 주사위
// 주사위 번호 순서대로 쌓는 게임
// 아래 주사위, 위 주사위 맞닿는 면의 숫자 동일
// 1번 주사위는 맘대로 놓는다.

// 주사위 4옆면 중 한 면의 숫자 합이 최대가 되야함

// 주사위를 90도, 180도, 270도 돌릴 수 있음. 최대로하기위해서!

// input
// 주사위개수 (1~10,000)
// 주사위 종류(1번부터) 각 면에 쓰여진 숫자

// output

function solution(N, dices) {
  let answer = 0;

  for (let i = 0; i < 6; i++) {
    let top = dices[0][i];

    let sum = 0;
    let max = 0;

    for (let k = 0; k < 6; k++) {
      if (k === i || k === opposite(i)) continue;
      max = Math.max(max, dices[0][k]);
    }
    sum += max;

    for (let j = 1; j < N; j++) {
      let max = 0;
      let topIdx = -1;

      // down이 될 수 있는 값 찾기
      for (let k = 0; k < 6; k++) {
        if (top === dices[j][k]) {
          top = dices[j][opposite(k)];
          topIdx = opposite(k);
          break;
        }
      }

      for (let k = 0; k < 6; k++) {
        if (k === topIdx || k === opposite(topIdx)) continue;
        max = Math.max(max, dices[j][k]);
      }
      sum += max;
    }

    answer = Math.max(answer, sum);
  }

  return answer;

  function opposite(index) {
    if (index === 0) return 5;
    if (index === 5) return 0;
    if (index === 1) return 3;
    if (index === 3) return 1;
    if (index === 2) return 4;
    if (index === 4) return 2;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const dices = input.slice(1).map((dice) => dice.split(' ').map(Number));

console.log(solution(N, dices));

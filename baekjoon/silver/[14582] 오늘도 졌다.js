// 분류: 구현
// 풀이시간: 4:31~4:42

// 역전패를 했는지 구하기
// 경기 도중 이기는 순간이 있어야지 성립함

// input
// ulim 득점 (0~20)
// startlink 득점 (0~20)

// 1회초->1회말.... 9회초->9회말 순서로 진행

// output
// Yes or No

function solution() {
  const score = [0, 0];

  let winAndlose = false;
  for (let k = 0; k < 9; k++) {
    for (let i = 0; i < ulim[k]; i++) {
      score[0]++;
      if (score[0] > score[1]) {
        winAndlose = true;
      }
    }

    for (let j = 0; j < startlink[k]; j++) {
      score[1]++;
      if (score[0] > score[1]) {
        winAndlose = true;
      }
    }
  }
  return winAndlose ? "Yes" : "No";
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const ulim = input[0].split(" ").map(Number);
const startlink = input[1].split(" ").map(Number);

console.log(solution(ulim, startlink));

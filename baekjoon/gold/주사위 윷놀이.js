// '시작'칸 4개의 말
// 파란색 칸 이동 시작 => 파란색 방향
// 빨간색 칸 이동 시작 => 빨간색 방향
// '도착'칸 or 그 너머에 도착하면 이동 종료
// 총 10개의 턴, 한 턴마다 1~5까지 랜덤, 도착하지 않은 말중 하나를 주사위 수만큼 이동시킴
// 이동마치는 칸에 다른 말 있으면 선택 불가능, 도착 칸은 상관없음
// 이동 마친 위치의 점수를 추가함

// 얻을 수 있는 최대 점수

// input
// 10개의 수

// output
// 최대 점수

function solution(diceNumbers) {
  const map = makeMap();
  const horse = [map, map, map, map];
  let answer = 0;

  comb(0, 0);

  return answer;

  function comb(d, score) {
    if (d === 10) {
      answer = Math.max(answer, score);
      return;
    }

    const number = diceNumbers[d];

    for (let i = 0; i < 4; i++) {
      let valid = true;
      let prev = (cur = horse[i]);

      if (cur.score === 0) continue; // 이미 도착칸이므로 말 이동 X

      cur = cur.next.length === 2 ? cur.next[1] : cur.next[0];

      for (let k = 1; k < number; k++) {
        if (cur.score === 0) break;
        cur = cur.next[0];
      }

      // 다른 말과 비교
      for (let j = 0; j < 4; j++) {
        if (i === j) continue;
        if (cur.score !== 0 && cur === horse[j]) {
          valid = false;
          break;
        }
      }

      if (!valid) continue; // 동일한 위치에 말 O
      horse[i] = cur;
      comb(d + 1, score + horse[i].score);
      horse[i] = prev;
    }
  }
}

function makeMap() {
  const map = { score: -1, next: [] };

  const end = { score: 0, next: [] };
  const last = { score: 40, next: [] };
  last.next[0] = end;

  const midList = { score: 25, next: [] };

  let prev = midList;

  for (let i = 1; i <= 2; i++) {
    const newNode = { score: 25 + 5 * i, next: [] };

    prev.next[0] = newNode;
    prev = newNode;
  }
  prev.next[0] = last;

  prev = map;

  for (let i = 1; i <= 19; i++) {
    const newNode = { score: i * 2, next: [] };

    prev.next[0] = newNode;
    prev = newNode;

    if (i === 5) {
      link(prev, 13, 3, 3, midList);
    } else if (i === 10) {
      link(prev, 22, 2, 2, midList);
    } else if (i === 15) {
      link(prev, 28, -1, 3, midList);
    }
  }
  prev.next[0] = last;

  return map;
}

function link(prev, init, s, loop, next) {
  for (let k = 0; k < loop; k++) {
    const newNode = { score: init + s * k, next: [] };

    if (k === 0) prev.next[1] = newNode;
    else prev.next[0] = newNode;
    prev = newNode;
  }
  prev.next[0] = next;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const diceNumbers = input[0].split(" ").map(Number);

console.log(solution(diceNumbers));

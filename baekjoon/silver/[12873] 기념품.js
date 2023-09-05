// 분류:
// 풀이시간: 11:32~

// N명, 원판위에
// 1번~N번 티셔츠를 시계방향으로 착용

// 1단계부터 시작하고 이때 백준이가 1번 참가자 앞에 서있음.
// 하나를 외침.
// 시계방향으로 다음 사람에 이동하며 둘을 외침
// t단계인 경우 t^3 외칠때까지 진행

// 각 단계 끝난 경우, 백준이 앞에서있는 사람은 게임에서 제외.
// 제거 시, 시계 방향으로 다음 사람에게 이동
// 한명이 남을때까지 게임 진행하고 이 사람을 출력

// input
// N(1~5,000) 참가자수

// output
// 티셔츠 번호

function solution(N) {
  const head = { next: null, prev: null, element: 1 };
  let prev = head;

  for (let i = 2; i <= N; i++) {
    const node = { next: null, prev, element: i };
    prev.next = node;

    prev = node;

    if (i === N) {
      node.next = head;
      head.prev = node;
    }
  }

  let size = N;
  let round = 1;
  let cur = head;

  while (size !== 1) {
    const r = (Math.pow(round, 3) - 1) % size;

    for (let i = 0; i < r; i++) {
      // 이동
      cur = cur.next;
    }
    const temp = cur.next;
    remove(cur);
    size--;
    round++;
    cur = temp;
  }

  return cur.element;

  function remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);

console.log(solution(N));

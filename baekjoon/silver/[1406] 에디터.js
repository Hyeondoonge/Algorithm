// 분류: 연결리스트
// 풀이시간: 11:32~12:30

// 영어 소문자를 기록, 최대 600,000 글자
// 커서의 위치 문장 맨 앞, 문장 맨 뒤, 문장 중간 임의의 곳(L-1)
// L 커서를 왼쪽으로 한 칸 (맨 앞이면 무시)
// D 커서를 오른쪽으로 한 칸 (맨 뒤면 무시)
// B 커서 왼쪽문자 삭제 (맨 앞이면 무시) ?? ,
// P $ $라는 문자를 커서 왼쪽에 추가

// input
// 초기 문자열 (length: 1~100,000, 영어 소문자로 구성)
// M 명령어 개수 (1~500,000)
// 4가지 중 하나 명령어

// output
// 명령어수행후 결과

function solution(str, commands) {
  const head = { next: null, prev: null, element: null }; // 모두 지워지면 head만 남음
  let prev = head;

  // 초기 연결리스트 생성
  let cursor = head;

  for (let i = 0; i < str.length; i++) {
    const newNode = { next: null, prev, element: str[i] };
    prev.next = newNode;
    prev = newNode;
    cursor = newNode;
  }

  for (const command of commands) {
    const [c, value] = command.split(" ");
    switch (c) {
      case "L":
        moveLeft();
        break;
      case "D":
        moveRight();
        break;
      case "B":
        remove();
        break;
      case "P":
        add(value);
        break;
    }
  }

  return getString();

  function add(value) {
    const newNode = { next: cursor.next, prev: cursor, element: value };
    if (cursor.next) {
      cursor.next = cursor.next.prev = newNode;
    } else {
      cursor.next = newNode;
    }
    cursor = newNode;
  }
  function remove() {
    if (!cursor.prev) return; // 문자 X
    cursor.prev.next = cursor.next;
    if (cursor.next) cursor.next.prev = cursor.prev;
    cursor = cursor.prev;
  }
  function moveLeft() {
    if (!cursor.prev) return;
    cursor = cursor.prev;
  }
  function moveRight() {
    if (!cursor.next) return;
    cursor = cursor.next;
  }

  function getString() {
    let str = "";
    for (let node = head.next; node !== null; node = node.next) {
      str += node.element;
    }
    return str;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const str = input[0];
const commands = input.slice(2);

console.log(solution(str, commands));

// 분류: 구현
// 풀이시간: 1:57~2:11

// 사회적 거리두기, 미튜브 스트리밍
// 출석부 관리
// 개강총회 시작 전, 학회원 입장 확인 여부 확인
// - 시작 전 대화를 한 적 있는 학회원의 닉네임., 시작하자마자 남긴 것도 입장 확인 됨

// 개강총회 끝낸 후, 스트리밍 끝낼 때 까지 학회원의 퇴장 확인 여부 확인
// - 개강총회 종료~스트리밍 종료까지 대화를 한적이 있는 학회원 닉네임, 개총 or 스티리밍 끝나자마자 남긴 학회원도 OK

// 00:00부터 대기시간 시작

// 입장, 퇴장 모두 확인된 학회원

// input
// S 시작 시간, E 종료 시간, Q 스트리밍 종료 시간 (00:00~23:59), S !== E !== Q
// chats[i] 채팅 기록 (HH:MM nickname, length: 최대 100,000)

// output

function solution(S, E, Q, chats) {
  const start = timeToNumber(S);
  const end = timeToNumber(E);
  const quit = timeToNumber(Q);
  const records = {};

  for (let i = 0; i < chats.length; i++) {
    const [time, name] = chats[i].split(" ");
    const format = timeToNumber(time);

    if (!records[name]) {
      records[name] = [0, 0];
    }

    if (format <= start) {
      records[name][0] = 1;
    }
    if (end <= format && format <= quit) {
      records[name][1] = 1;
    }
  }

  let cnt = 0;

  for (const name in records) {
    if (records[name][0] && records[name][1]) {
      cnt++;
    }
  }

  return cnt;

  function timeToNumber(time) {
    const [HH, MM] = time.split(":").map(Number);
    return HH * 60 + MM;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [S, E, Q] = input[0].split(" ");
const chats = input.slice(1);

console.log(solution(S, E, Q, chats));

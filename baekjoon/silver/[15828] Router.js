// 분류: 큐
// 풀이시간: 9:03~9:19

// 연결된 네트워크를 통해 컴퓨터 통신 가능
// 요청 => 목적지, 라우터를 통해 패킷이 전달됨.
// 라우터에 버퍼 존재, 입력된 패킷들이 순서대로 위치하고, 먼저 온 패킷부터 하나씩 처리하여 버퍼에서 제거
// overflow발생. 패킷 처리 속도 < 패킷 들어오는 속도, 이때 넘치는 패킷들이 버려짐
// 작동원리 구현, 하나의 라우터 존재한다고 가정
//  라우터 입출력이 주어질 때 버퍼의 상태

// input
// N 버퍼의 크기 (1~100,000)
// 발생한 시간순으로 정보들 입력됨 (양의 정수: 패킷번호 or 0: 패킷 하나 처리 or -1: 입력 끝)

// output
// 남아있는 패킷 or empty

function solution(N, params) {
  const queue = [];
  let f = 0;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (param === -1) continue;
    if (!param) {
      f++;
    } else {
      if (N === queue.length - f) continue;
      queue.push(param);
    }
  }

  let answer = "";
  for (let i = f; i < queue.length; i++) {
    answer += queue[i] + " ";
  }

  return !answer ? "empty" : answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const params = input.slice(1).map(Number);

console.log(solution(N, params));

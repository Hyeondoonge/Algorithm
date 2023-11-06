// 분류: 백트래킹
// 풀이시간: 11:18~11:26

// 3개 숫자 0, 1, 2만 가지고
// N자리 3의 배수 자연수 만들기

// 0으로 시작하는 수 X, 3의 배수 개수 구하기

// input
// N (1~9)

// output
// N자리 3의 배수 개수

function solution(N) {
  let answer = 0;
  let value = 0;

  perm(0);

  return answer;

  function perm(d) {
    if (d === N) {
      answer += value % 3 === 0 ? 1 : 0;
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (d === 0 && i === 0) continue;
      value += i;
      perm(d + 1);
      value -= i;
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);

console.log(solution(N));

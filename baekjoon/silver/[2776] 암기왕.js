// 분류: hash
// 풀이시간: 1:43~1:53

// 수첩1 - 하루동안 본 정수
// M개의 질문 - X라는 정수를 오늘 본 적 있는지?
// 수첩2 - 대답한 정수들
// 수첩2에 *적힌 순서*대로 수첩1에 있으면 1, 없으면 0출력

// input
// T testcase
// 수첩1의 정수 개수 (1~1,000,000)
// numbers1[i]
// 수첩2의 정수 개수 (1~1,000,000)
// numbers1[i]

// 정수 범위 int

// output
// 수첩2에 적힌 정수 순서대로 1에 있으면 1, 없으면 0출력

function solution(note1, note2) {
  const hash = {};

  for (let i = 0; i < note1.length; i++) {
    hash[note1[i]] = true;
  }

  let result = "";
  for (let i = 0; i < note2.length; i++) {
    if (hash[note2[i]]) {
      result += "1\n";
    } else {
      result += "0\n";
    }
  }
  return result;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0;
let T = Number(input[idx++]);

let answer = "";

while (T--) {
  const N = Number(input[idx++]);
  const note1 = input[idx++].split(" ").map(Number);
  const M = Number(input[idx++]);
  const note2 = input[idx++].split(" ").map(Number);

  answer += solution(note1, note2);
}
console.log(answer);

// 분류: 구현
// 풀이시간: 4:55~5:18

// 발음이 가능한 패스워드 만들기
// 비밀번호 조건
// 1. a, e, i, o, u 중 하나 포함
// 2. 모임이 3개 혹은 자음이 3개 연속 X
// 3. 같은 글자 연속 2번 X, ee or oo는 허용

// input
// password 테스트 키워드 (1~20) or 'end'
// * 모든 문자는 대문자 포함 X

// output
// <{passowrd}>is [''|'not'] acceptable.

function solution(strs) {
  let answer = "";
  const set = new Set(["a", "e", "i", "o", "u"]);

  for (let i = 0; i < strs.length - 1; i++) {
    const l = strs[i].length;
    let valid = false;

    for (let k = 0; k < l; k++) {
      if (set.has(strs[i][k])) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      answer += message(strs[i], false) + "\n";
      continue;
    }

    for (let k = 2; k < l; k++) {
      if (set.has(strs[i][k]) === set.has(strs[i][k - 1]) && set.has(strs[i][k]) === set.has(strs[i][k - 2])) {
        valid = false;
        break;
      }
    }

    if (!valid) {
      answer += message(strs[i], false) + "\n";
      continue;
    }

    for (let k = 1; k < l; k++) {
      if (strs[i][k] === strs[i][k - 1] && strs[i][k] !== "e" && strs[i][k] !== "o") {
        valid = false;
        break;
      }
    }

    if (!valid) {
      answer += message(strs[i], false) + "\n";
      continue;
    }
    answer += message(strs[i], true) + "\n";
  }

  return answer;

  function message(input, isValid) {
    return `<${input}> is${isValid ? "" : " not"} acceptable.`;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const strs = input;

console.log(solution(strs));

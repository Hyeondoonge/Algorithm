// 분류: 그리디
// 풀이시간: 1:43~2:37

// 팰린드롬
// 현재 100000
// + 1km, 100001
// 몇 km을 더하면 팰린드롬이 되는지 구하기

// input
// number (자릿수: 2자리~9자리)

// output
// 주행 최소 거리

function solution(strs) {
  let answer = [];

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    let temp = Number(str);

    while (!isPalindrome(temp, str.length)) {
      temp++;
    }

    answer.push(temp - Number(str));
  }

  function isPalindrome(strNumber, len) {
    strNumber = String(strNumber).padStart(len, "0");

    for (let i = 0; i < Math.floor(strNumber.length / 2); i++) {
      if (strNumber[i] !== strNumber[strNumber.length - i - 1]) return false;
    }
    return true;
  }

  return answer.join("\n");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const strs = input.slice(0, input.length - 1);

console.log(solution(strs));

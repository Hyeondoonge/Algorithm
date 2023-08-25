// 분류: 구현
// 풀이시간: 2:19~3:09

// 7개의 기호와 값
// 큰 숫자왼쪽 작은 숫자 오른쪽, 모든 숫자의 값을 더한 값이 값
// V, L, D 한 번 사용 I, X, C, M 연속해서 세 번까지사용
// 같은 숫자 반복 시, 그 값은 모든 숫자의 값을 더한 값

// 작은 숫자가 큰 숫자의 왼쪽에 오는 경우
// IV = 4, IX = 9... 한 번씩만 사용 가능
// IV, IX / XL, XC / CD, CM 함께 사용 X
// 이외 작은 숫자가 큰 숫자 왼쪽(어디에도) 올 수 없음

// * 모든 수는 가장 적은 개수의 로마 숫자들로 표현

/// 두 수를 입력받아 둘을 더한 값을 아라이아 숫자와 로마 숫자로 출력

// input
// 로마숫자로 표현된 두개의 수 (각각 1~2000 => 합은 ~4000)

// output

function solution(A, B) {
  let number = getNumber(A) + getNumber(B);

  const answer = [number, 0];
  const char = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
  const value = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

  const used = new Array(char.length).fill(false);
  let roman = "";

  for (let i = char.length - 1; i >= 0; i--) {
    if (char[i] === "I" || char[i] === "X" || char[i] === "C" || char[i] === "M") {
      const n = Math.min(Math.floor(number / value[i]), 3); // 최대 3번
      roman += char[i].repeat(n);
      number -= n * value[i];
    } else if (char[i] === "V" || char[i] === "L" || char[i] === "D") {
      if (number < value[i]) continue;
      roman += char[i];
      number -= value[i];
    } else {
      if ((i === 1 || i === 5 || i === 9) && used[i + 2]) continue;
      if (number < value[i]) continue;

      used[i] = true;
      roman += char[i];
      number -= value[i];
    }
  }

  answer[1] = roman;

  return answer.join("\n");

  function getNumber(roman) {
    let number = 0;
    // 두 자리인지 확인
    for (let i = 0; i < roman.length; i++) {
      if (i + 1 < roman.length && roman[i] === "I" && roman[i + 1] === "V") {
        number += 4;
        i++;
      } else if (i + 1 < roman.length && roman[i] === "I" && roman[i + 1] === "X") {
        number += 9;
        i++;
      } else if (i + 1 < roman.length && roman[i] === "X" && roman[i + 1] === "L") {
        number += 40;
        i++;
      } else if (i + 1 < roman.length && roman[i] === "X" && roman[i + 1] === "C") {
        number += 90;
        i++;
      } else if (i + 1 < roman.length && roman[i] === "C" && roman[i + 1] === "D") {
        number += 400;
        i++;
      } else if (i + 1 < roman.length && roman[i] === "C" && roman[i + 1] === "M") {
        number += 900;
        i++;
      } else if (roman[i] === "V") {
        number += 5;
      } else if (roman[i] === "L") {
        number += 50;
      } else if (roman[i] === "D") {
        number += 500;
      } else if (roman[i] === "I") {
        number += 1;
      } else if (roman[i] === "X") {
        number += 10;
      } else if (roman[i] === "C") {
        number += 100;
      } else if (roman[i] === "M") {
        number += 1000;
      }
    }
    return number;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [A, B] = input;

console.log(solution(A, B));

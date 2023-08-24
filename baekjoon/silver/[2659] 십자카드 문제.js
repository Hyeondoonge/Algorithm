// 분류: 구현
// 풀이시간: 10:05~10:44

// 네 모서리에 1~9 숫자가 하나씩 작성됨. 서로 같을 수도 있음
// 십자카드가 주어지고, '시계수' 번호를 가짐
// 시계수: 시계 방향으로 읽어서 만들어지는 네 자리 숫자 중 가장 작은 수

// 시계수 계산 후, 모든 시계수들 중 몇 번째로 작은 시계수인지 알아내기

function solution(numbers) {
  const inputClockNumber = getClockNumber(numbers);

  let cnt = 1;

  let number = 1111;

  while (number < inputClockNumber) {
    let temp = number;

    const a = Math.floor(temp / 1000);
    temp %= 1000;
    const b = Math.floor(temp / 100);
    temp %= 100;
    const c = Math.floor(temp / 10);
    temp %= 10;
    const d = temp;

    if ([a, b, c, d].some((v) => v === 0)) {
      number++;
      continue;
    }

    if (number === getClockNumber([a, b, c, d])) {
      // 시계수가 맞는지 확인
      cnt++;
    }
    number++;
  }

  return cnt;

  function getClockNumber(numbers) {
    if (numbers.some((number) => number === 0)) return -1;

    let clockNumber = 10000;
    const m = [1000, 100, 10, 1];

    clockNumber = Math.min(clockNumber, numbers[0] * m[0] + numbers[1] * m[1] + numbers[2] * m[2] + numbers[3] * m[3]);
    clockNumber = Math.min(clockNumber, numbers[0] * m[3] + numbers[1] * m[0] + numbers[2] * m[1] + numbers[3] * m[2]);
    clockNumber = Math.min(clockNumber, numbers[0] * m[2] + numbers[1] * m[3] + numbers[2] * m[0] + numbers[3] * m[1]);
    clockNumber = Math.min(clockNumber, numbers[0] * m[1] + numbers[1] * m[2] + numbers[2] * m[3] + numbers[3] * m[0]);

    return clockNumber;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const numbers = input[0].split(" ").map(Number);

console.log(solution(numbers));

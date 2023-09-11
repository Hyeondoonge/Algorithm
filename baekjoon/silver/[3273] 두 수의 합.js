// 분류: 구현
// 풀이시간: 5:10~5:37

// input
// n개의 서로 다른 양의 정수 (1~1,000,000)
// ai + aj = x를 만족하는 쌍의 수 (1 <= i < j <= n)

// input
// n (1~100,000)
// x (1~2,000,000)
// arr[i] (1~1,000,000)

// output
// 쌍의 개수

function solution(arr, x) {
  const MAX = Math.pow(10, 6);
  const count = Array.from({ length: MAX + 1 }, () => 0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]] += 1;
  }

  let answer = 0;

  for (let i = 1; i <= MAX; i++) {
    if (i > x - i) break;
    if (MAX < x - i) continue;
    if (i < x - i) {
      answer += count[i] * count[x - i];
    } else if (i === x - i) {
      answer += ((count[i] - 1) * count[i]) / 2;
    }
  }
  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const arr = input[1].split(" ").map(Number);
const x = Number(input[2]);

console.log(solution(arr, x));

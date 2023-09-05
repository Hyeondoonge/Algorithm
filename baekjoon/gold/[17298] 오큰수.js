// 분류: 스택
// 풀이시간: 1:50~2:07

// 크기가 N인 수열 A = A1, A2, ..., AN
// 각 원소 Ai에 대해 오큰수 NGE(i) 구하기
// Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중 가장 왼쪽에 있는 수. 없다면 -1

// input
// N 수열의 크기 (1~1,000,000)
// A[i] (1~1,000,0000)

// output
// 각 원소의 오큰수

function solution(N, array) {
  const stack = [];
  const answer = Array.from({ length: N }, () => -1);
  answer[N - 1] = -1;
  stack.push(array[N - 1]);

  for (let i = N - 2; i >= 0; i--) {
    while (1) {
      if (!stack.length) {
        stack.push(array[i]);
        break;
      }
      const top = stack[stack.length - 1];
      if (top > array[i]) {
        stack.push(array[i]);
        answer[i] = top;
        break;
      } else {
        stack.pop();
      }
    }
  }
  return answer.join(" ");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const array = input[1].split(" ").map(Number);

console.log(solution(N, array));

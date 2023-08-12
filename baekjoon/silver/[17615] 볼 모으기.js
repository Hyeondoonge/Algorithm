function solution(N, balls) {
  let answer = Infinity;
  let last = 0;

  for (let i = 1; i < N; i++) {
    if (balls[i - 1] !== balls[i]) {
      break;
    }
    last = i;
  }

  let cnt = 0;
  for (let i = last + 1; i < N; i++) {
    if (balls[i] === balls[last]) {
      cnt++;
    }
  }

  answer = Math.min(answer, cnt);

  cnt = 0;
  for (let i = last + 1; i < N; i++) {
    if (balls[i] === balls[last]) {
      cnt++;
    }
  }
  answer = Math.min(answer, cnt);

  last = N - 1;

  for (let i = N - 2; i >= 0; i--) {
    if (balls[i] !== balls[i + 1]) {
      break;
    }
    last = i;
  }

  cnt = 0;
  for (let i = last - 1; i >= 0; i--) {
    if (balls[i] === balls[last]) {
      cnt++;
    }
  }
  answer = Math.min(answer, cnt);

  cnt = 0;
  for (let i = last - 1; i >= 0; i--) {
    if (balls[i] !== balls[last]) {
      cnt++;
    }
  }
  answer = Math.min(answer, cnt);

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const balls = input[1];

console.log(solution(N, balls));

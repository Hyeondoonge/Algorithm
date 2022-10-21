function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let a_pointer = 0;
  let b_pointer = 0;

  let smaller = Array.from({ length: A.length }, () => 0);

  let answer = 0;

  while (a_pointer < A.length && b_pointer < B.length) {
    if (B[b_pointer] < A[a_pointer]) {
      smaller[a_pointer]++;
      b_pointer++;
    } else {
      answer += smaller[a_pointer];

      a_pointer++;
      if (a_pointer !== A.length) {
        smaller[a_pointer] += smaller[a_pointer - 1];
      }
    }
  }

  if (a_pointer < A.length) answer += (A.length - a_pointer) * smaller[a_pointer];
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let tc = Number(input[0]);
let idx = 1;
let answer = '';

while (tc--) {
  const [n, m] = input[idx++].split(' ').map(Number);
  const A = input[idx++].split(' ').map(Number);
  const B = input[idx++].split(' ').map(Number);

  answer += solution(A, B) + '\n';
}

console.log(answer);

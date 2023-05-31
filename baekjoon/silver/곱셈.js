// A를 B번 곱한 수
// 최종 결과를 C로 나눈 나머지

// input
// A B C (1~2,147,483,647)

function solution(A, B, C) {
  const mod = BigInt(C);
  A = BigInt(A);
  B = BigInt(B);

  return String(divide(B));

  function divide(num) {
    if (num === 1n) {
      return A % mod;
    }

    if (num % 2n === 0n) {
      let result = divide(num / 2n);
      return (result * result) % mod;
    } else {
      let result = divide((num - 1n) / 2n);
      return (((result * result) % mod) * A) % mod;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [A, B, C] = input[0].split(' ').map(Number);

console.log(solution(A, B, C));

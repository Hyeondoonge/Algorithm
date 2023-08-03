function solution(N, numbers) {
  numbers = numbers.map((number, index) => ({ number, index }));
  numbers.sort((a, b) => {
    return a.number - b.number;
  });

  const result = Array.from({ length: N }, () => 0);
  let myIdx = 0;

  for (let i = 0; i < N; i++) {
    const { number, index } = numbers[i];

    if (0 <= i - 1 && numbers[i - 1].number !== number) {
      myIdx += 1;
    }

    result[index] = myIdx;
  }

  let answer = '';
  for (let i = 0; i < N; i++) {
    answer += result[i] + ' ';
  }
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, numbers));

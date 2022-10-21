function solution(N, d, k, c, sushi) {
  let left = 0;
  let right = k;

  const eat = Array.from({ length: d + 1 }, () => 0); // 몇 번째 초밥을 얼마나 먹었는지에 대한 데이터

  let answer = 0;
  let type_count = 0;

  for (let i = 0; i < right; i++) {
    const number = sushi[i];

    if (eat[number] === 0) {
      type_count++;
    }
    eat[number]++;
  }

  if (sushi[c] === 0) {
    type_count += 1;
    answer = Math.max(type_count, answer);
  }

  while (left < N) {
    const left_number = sushi[left];

    if (eat[left_number] === 1) {
      type_count--;
    }
    eat[left_number]--;

    const right_number = sushi[right];
    if (eat[right_number] === 0) {
      type_count++;
    }
    eat[right_number]++;

    answer = Math.max(type_count + (eat[c] === 0 ? 1 : 0), answer);

    left += 1;
    right = (right + 1) % N;
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, d, k, c] = input[0].split(' ').map(Number);
const sushi = input.slice(1).map(Number);

console.log(solution(N, d, k, c, sushi));

// 중복된 학번을 제거하면서 최종 수강신청 학번의 수가 수용가능한 인원의 수보다 적을 수 있는 걸 고려해야한다.
// 중복제거를 직접 구현해도되지만, Set API를 이용할 수 있다.

function solution(K, L, waiting_numbers) {
  const waiting_numbers_no_duplicate = [...new Set(waiting_numbers.reverse())];

  let answer = '';
  const N = waiting_numbers_no_duplicate.length;

  for (let i = 0; i < K; i++) {
    const number = waiting_numbers_no_duplicate[N - i - 1];

    if (!number) break;
    answer += number + '\n';
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [K, L] = input[0].split(' ').map(Number);
const waiting_numbers = input.slice(1);

console.log(solution(K, L, waiting_numbers));

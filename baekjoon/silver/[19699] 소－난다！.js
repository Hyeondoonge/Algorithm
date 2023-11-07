// 분류: dfs
// 풀이시간: 1:56~2:43

// 농장에 N마리의 소
// 소들의 몸무게의 합이 소수가 되도록 M마리 소를 선별
// 가능한 소를 선별했을 경우 몸무게의 합 모두 출력

// input
// N 소들의 수 (1~9) M 선별할 소의 수(1~N)
// H
// H[i] 소의 무게 (1~1,000)

// output
// M마리 소들의 무게 합으로 만들 수 있는 모든 소수를 오름차순 출력, 없다면 -1

function solution(N, M, cows) {
  const MAX = 9000;
  const isPrime = Array.from({ length: MAX + 1 }, () => true);

  isPrime[1] = false;

  for (let i = 2; i <= MAX; i++) {
    for (let j = 2; j <= Math.pow(i, 1 / 2); j++) {
      if (i % j === 0) {
        isPrime[i] = false;
        break;
      }
    }
  }

  let sums = new Set();
  dfs(0, 0, 0);

  if (!sums.size) return -1;

  const answer = [];

  for (const value of sums) {
    answer.push(value);
  }

  return answer.sort((a, b) => a - b).join(" ");

  function dfs(k, d, sum) {
    if (d === M) {
      if (isPrime[sum]) {
        sums.add(sum);
      }
      return;
    }

    for (let i = k; i < N; i++) {
      dfs(i + 1, d + 1, sum + cows[i]);
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const cows = input[1].split(" ").map(Number);

console.log(solution(N, M, cows));

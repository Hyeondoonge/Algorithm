function solution(N, M, gems) {
  const MAX_GEM = 1000000000;

  let s = -1,
    e = MAX_GEM;

  while (s + 1 < e) {
    const m = Math.floor((s + e) / 2);

    if (isValid(m)) {
      e = m;
    } else {
      s = m;
    }
  }

  return e;

  function isValid(k) {
    let students = 0;
    for (let i = 0; i < M; i++) {
      if (gems[i] < k) {
        students += 1;
        continue;
      }
      students += Math.floor(gems[i] / k);
      students += gems[i] % k ? 1 : 0;
    }

    return students <= N;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const gems = input.slice(1).map(Number);

console.log(solution(N, M, gems));

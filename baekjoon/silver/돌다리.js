function solution(A, B, N, M) {
  const MAX = 100000;
  const visitied = Array.from({ length: MAX + 1 }, () => false);

  const q = [];
  visitied[N] = true;
  q.push([N, 0]);

  let idx = 0;

  const move = [1, -1, A, -A, B, -B];

  while (idx < q.length) {
    const [cur, d] = q[idx++];

    if (cur === M) {
      return d;
    }

    for (let i = 0; i < 6; i++) {
      let next = cur + move[i];

      if (isValid(next) && !visitied[next]) {
        visitied[next] = true;
        q.push([next, d + 1]);
      }

      if (i !== 2 && i !== 4) continue;
      next = cur * move[i];
      if (isValid(next) && !visitied[next]) {
        visitied[next] = true;
        q.push([next, d + 1]);
      }
    }
  }

  function isValid(i) {
    return 0 <= i && i <= MAX;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [A, B, N, M] = input[0].split(' ').map(Number);

console.log(solution(A, B, N, M));

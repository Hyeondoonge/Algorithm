function solution(SCV) {
  const N = SCV.length;
  for (let i = 0; i < 3 - N; i++) {
    SCV.push(0);
  }

  const visitied = {};

  const D = [9, 3, 1];

  let idx = 0;
  const q = [];
  visitied[getKey(SCV)] = true;
  q.push({ scv: [...SCV], d: 0 });

  while (idx < q.length) {
    const { scv, d } = q[idx++];

    const a = scv[0],
      b = scv[1],
      c = scv[2];

    if (a <= 0 && b <= 0 && c <= 0) {
      return d;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j) continue;
        for (let k = 0; k < 3; k++) {
          if (j === k || i === k) continue;

          let na = a - D[i];
          let nb = b - D[j];
          let nc = c - D[k];

          if (na < 0) na = 0;
          if (nb < 0) nb = 0;
          if (nc < 0) nc = 0;

          const key = getKey([na, nb, nc]);
          if (visitied[key]) continue;
          visitied[key] = true;
          q.push({ scv: [na, nb, nc], d: d + 1 });
        }
      }
    }
  }

  function getKey(arr) {
    return arr.join(',');
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const SCV = input[1].split(' ').map(Number);

console.log(solution(SCV));

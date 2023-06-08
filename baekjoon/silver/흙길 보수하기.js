function solution(N, L, holes) {
  holes.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    return a[1] - b[1];
  });

  let e1 = 0;
  let count = 0;

  for (let i = 0; i < N; i++) {
    const [s2, e2] = holes[i];

    if (e2 <= e1) continue;

    if (e1 < s2) {
      count += Math.ceil((e2 - s2) / L);
      let k = (e2 - s2) % L;
      e1 = e2 - 1 + (k !== 0 ? L - k : 0);
    } else {
      count += Math.ceil((e2 - (e1 + 1)) / L);
      let k = (e2 - (e1 + 1)) % L;
      e1 = e2 - 1 + (k !== 0 ? L - k : 0);
    }
  }

  return count;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, L] = input[0].split(' ').map(Number);
const holes = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, L, holes));

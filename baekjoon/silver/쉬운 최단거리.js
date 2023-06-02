function solution(N, M, map) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const cost = Array.from({ length: N }, () => Array.from({ length: M }, () => -1));
  const q = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) {
        cost[i][j] = 0;
        q.push([i, j, 0]);
      } else if (map[i][j] === 0) {
        cost[i][j] = 0;
      }
    }
  }

  let idx = 0;

  while (idx < q.length) {
    const [r, c, d] = q[idx++];

    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;
      if (map[nr][nc] === 0) continue;
      if (cost[nr][nc] === -1) {
        cost[nr][nc] = d + 1;
        q.push([nr, nc, d + 1]);
      }
    }
  }

  return cost.map((row) => row.join(' ')).join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, M, map));

function solution(N, M, map) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const path = Array.from({ length: N }, () => Array.from({ length: M }, () => -1));

  return dfs(0, 0);

  function dfs(r, c) {
    if (r === N - 1 && c === M - 1) {
      return 1;
    }

    if (path[r][c] !== -1) {
      return path[r][c];
    }

    path[r][c] = 0;

    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;
      if (map[r][c] <= map[nr][nc]) continue;
      path[r][c] += dfs(nr, nc);
    }

    return path[r][c];
  }
}

const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, M, map));

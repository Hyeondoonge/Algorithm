const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = Number(input[0]);
const map = input.slice(1).map((row) => Array.from(row));

solution();

function solution() {
  const answer = [];
  const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let group = 0,
    blue = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visitied[i][j]) continue;
      visitied[i][j] = true;
      dfs(i, j, false);
      group++;

      if (map[i][j] === 'B') blue++;
    }
  }
  answer.push(group);

  // init
  group = 0;
  initVisitied();

  // 적록색약
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visitied[i][j] || map[i][j] === 'B') continue;
      visitied[i][j] = true;
      dfs(i, j, true);
      group++;
    }
  }
  answer.push(group + blue);

  function dfs(i, j, patient) {
    for (let k = 0; k < 4; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      if (visitied[nr][nc] || (patient && map[nr][nc] === 'B')) continue;
      if (!patient && map[i][j] !== map[nr][nc]) continue;
      visitied[nr][nc] = true;
      dfs(nr, nc, patient);
    }
  }

  console.log(answer.join(' '));

  function initVisitied() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        visitied[i][j] = false;
      }
    }
  }
}

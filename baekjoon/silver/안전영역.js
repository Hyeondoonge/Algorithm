const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const map = input.slice(1).map((e) => e.split(' ').map(Number));

solution();

function solution() {
  let maxSafeArea = 1;
  let maxHeigth = 0;

  map.forEach((e) =>
    e.forEach((e) => {
      maxHeigth = Math.max(e, maxHeigth);
    })
  );

  const areas = Array.from({ length: N }, () => Array.from({ length: N }, () => 1));
  const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let h = 1; h <= maxHeigth; h++) {
    raining(h, areas);

    let safeArea = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visitied[i][j]) continue;
        if (areas[i][j] === 0) continue;
        visitied[i][j] = true;
        dfs(i, j);

        safeArea++;
      }
    }

    maxSafeArea = Math.max(maxSafeArea, safeArea);
    initVisitied();
  }

  console.log(maxSafeArea);

  function raining(h) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] <= h) {
          areas[i][j] = 0;
        }
      }
    }
  }

  function dfs(i, j) {
    for (let k = 0; k < 4; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      if (visitied[nr][nc]) continue;
      if (areas[nr][nc] === 0) continue;
      visitied[nr][nc] = true;
      dfs(nr, nc);
    }
  }

  function initVisitied() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        visitied[i][j] = false;
      }
    }
  }
}

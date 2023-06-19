function solution(grid) {
  const N = grid.length;
  const M = grid[0].length;

  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const answer = [];
  const visitied = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false, false, false])
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let k = 0; k < 4; k++) {
        const path = move(i, j, k);
        if (path !== 0) answer.push(path);
      }
    }
  }

  return answer.sort((a, b) => a - b);

  function move(r, c, dir) {
    let path = 0;

    const cur = { r, c, dir };

    while (!visitied[cur.r][cur.c][cur.dir]) {
      visitied[cur.r][cur.c][cur.dir] = true;
      path++;

      let nr = cur.r + dr[cur.dir];
      let nc = cur.c + dc[cur.dir];

      if (nr < 0) nr = N - 1;
      else if (N <= nr) nr = 0;
      else if (nc < 0) nc = M - 1;
      else if (M <= nc) nc = 0;

      if (grid[nr][nc] === 'R') {
        cur.dir = cur.dir + 1 === 4 ? 0 : cur.dir + 1;
      } else if (grid[nr][nc] === 'L') {
        cur.dir = cur.dir - 1 === -1 ? 3 : cur.dir - 1;
      }

      cur.r = nr;
      cur.c = nc;
    }

    return path;
  }
}

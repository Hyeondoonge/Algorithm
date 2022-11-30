function solution(board, r, c) {
  const character_coords = Array.from({ length: 7 }, () => []);
  // 캐릭터의 위치를 집어넣는다.
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] !== 0) {
        const character = board[i][j];
        character_coords[character].push([i, j]);
      }
    }
  }

  const visitied = Array.from({ length: 7 }, () => false);

  const order = [];

  let answer = Infinity;
  perm(r, c, 0, 0);

  return answer;

  function perm(r, c, d, cost) {
    if (d === 6) {
      answer = Math.min(answer, cost);
      return;
    }
    // 캐릭터의 순서
    for (let k = 1; k < 7; k++) {
      if (visitied[k]) continue;
      visitied[k] = true;

      if (character_coords[k].length === 0) {
        perm(r, c, d + 1, cost);
        visitied[k] = false;
        continue;
      }

      const [f, s] = character_coords[k];
      const cost1 = getPath(r, c, s[0], s[1]) + getPath(s[0], s[1], f[0], f[1]) + 2;
      const cost2 = getPath(r, c, f[0], f[1]) + getPath(f[0], f[1], s[0], s[1]) + 2;

      board[f[0]][f[1]] = board[s[0]][s[1]] = 0;

      perm(f[0], f[1], d + 1, cost + cost1);
      perm(s[0], s[1], d + 1, cost + cost2);

      board[f[0]][f[1]] = k;
      board[s[0]][s[1]] = k;
      visitied[k] = false;
    }
  }

  function getPath(r1, c1, r2, c2) {
    const visitied = Array.from(
      { length: 4 },
      () => Array.from({ length: 4 }),
      () => false
    );

    const q = [];
    let idx = 0;

    visitied[r1][c1] = true;
    q.push({ r: r1, c: c1, d: 0 });

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    while (idx < q.length) {
      const { r, c, d } = q[idx++];

      if (r === r2 && c === c2) {
        return d;
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];
        if (nr < 0 || 4 <= nr || nc < 0 || 4 <= nc) continue;
        if (visitied[nr][nc]) continue;
        visitied[nr][nc] = true;
        q.push({ r: nr, c: nc, d: d + 1 });
      }

      for (let k = 0; k < 4; k++) {
        let nr = r;
        let nc = c;
        for (let m = 1; m < 4; m++) {
          const tr = r + dr[k] * m;
          const tc = c + dc[k] * m;

          if (tr < 0 || 4 <= tr || tc < 0 || 4 <= tc) break;
          (nr = tr), (nc = tc);
          if (board[tr][tc] !== 0) {
            break;
          }
        }
        if (visitied[nr][nc]) continue;
        visitied[nr][nc] = true;
        q.push({ r: nr, c: nc, d: d + 1 });
      }
    }
  }
}

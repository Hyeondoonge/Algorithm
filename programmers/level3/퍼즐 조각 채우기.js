function solution(game_board, table) {
  const N = table.length;
  const block = [];
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let answer = 0;

  let m = 1;
  numberingBlock(0, 0);
  const usedBlock = Array.from({ length: m }, () => false);

  // 90, 180, 270 회전

  const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

  for (let k = 0; k < 4; k++) {
    const block = [];

    // 블록 찾기
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const idx = table[i][j];
        if (usedBlock[idx] || visitied[i][j] || table[i][j] === 0) continue;
        visitied[i][j] = true;

        const coords = [];
        findBlock(i, j, coords);
        block.push({ idx, coords });
      }
    }

    initVisitied();

    // 빈 공간 찾기
    const place = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visitied[i][j] || game_board[i][j] === 1) continue;
        visitied[i][j] = true;

        const coords = [];
        findPlace(i, j, coords);
        place.push(coords);
      }
    }

    initVisitied();

    for (let i = 0; i < place.length; i++) {
      const coords = place[i];
      for (let j = 0; j < block.length; j++) {
        const { idx, coords: blockCoords } = block[j];
        if (usedBlock[idx] || coords.length !== blockCoords.length) continue;

        const diff = { r: Infinity, c: Infinity };
        let find = true;

        for (let m = 0; m < coords.length; m++) {
          const newDiff = {
            r: coords[m].i - blockCoords[m].i,
            c: coords[m].j - blockCoords[m].j
          };
          if (diff.r === Infinity) {
            diff.r = newDiff.r;
            diff.c = newDiff.c;
          } else if (diff.r !== newDiff.r || diff.c !== newDiff.c) {
            find = false;
            break;
          }
        }

        if (!find) continue;

        usedBlock[idx] = true;
        answer += coords.length;

        for (let m = 0; m < coords.length; m++) {
          const { i, j } = coords[m];
          game_board[i][j] = 1;
        }
        break;
      }
    }

    table = rotated(table);
  }

  return answer;

  function numberingBlock() {
    const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visitied[i][j] || table[i][j] === 0) continue;
        visitied[i][j] = true;
        table[i][j] = m;
        dfs(i, j, m++);
      }
    }

    function dfs(i, j, m) {
      for (let k = 0; k < 4; k++) {
        const nr = i + dr[k];
        const nc = j + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
        if (visitied[nr][nc] || table[nr][nc] === 0) continue;
        visitied[nr][nc] = true;
        table[nr][nc] = m;
        dfs(nr, nc, m);
      }
    }
  }

  function findBlock(i, j, coords) {
    coords.push({ i, j });

    for (let k = 0; k < 4; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      if (visitied[nr][nc] || table[nr][nc] === 0) continue;
      visitied[nr][nc] = true;
      findBlock(nr, nc, coords);
    }
  }

  function findPlace(i, j, coords) {
    coords.push({ i, j });

    for (let k = 0; k < 4; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      if (visitied[nr][nc] || game_board[nr][nc] === 1) continue;
      visitied[nr][nc] = true;
      findPlace(nr, nc, coords);
    }
  }

  function rotated(table) {
    const new_table = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        new_table[j][N - i - 1] = table[i][j];
      }
    }
    return new_table;
  }

  function initVisitied() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        visitied[i][j] = false;
      }
    }
  }
}

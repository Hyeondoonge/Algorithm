function solution(n, build_frame) {
  const state = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => [false, false, false, false])
  );

  for (const [x, y, a, b] of build_frame) {
    const r = n - y;
    const c = x;

    if (a === 0 && b === 0) {
      deleteCol(r, c);
    }
    if (a === 0 && b === 1) {
      createCol(r, c);
    }
    if (a === 1 && b === 0) {
      deleteRow(r, c);
    }
    if (a === 1 && b === 1) {
      createRow(r, c);
    }
  }

  const answer = [];

  for (let j = 0; j <= n; j++) {
    for (let i = n; i >= 0; i--) {
      if (state[i][j][0]) {
        answer.push([j, n - i, 0]);
      }

      if (state[i][j][1]) {
        answer.push([j, n - i, 1]);
      }
    }
  }

  return answer;

  // 보
  function createRow(r, c) {
    state[r][c][1] = state[r][c + 1][3] = true;
    if (ok()) return;

    state[r][c][1] = state[r][c + 1][3] = false;
  }
  function deleteRow(r, c) {
    state[r][c][1] = state[r][c + 1][3] = false;
    if (ok()) return;
    state[r][c][1] = state[r][c + 1][3] = true;
  }

  // 기둥
  function createCol(r, c) {
    state[r][c][0] = state[r - 1][c][2] = true;
    if (ok()) return;
    state[r][c][0] = state[r - 1][c][2] = false;
  }
  function deleteCol(r, c) {
    state[r][c][0] = state[r - 1][c][2] = false;
    if (ok()) return;
    state[r][c][0] = state[r - 1][c][2] = true;
  }

  function ok() {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (state[i][j][0]) {
          if (i < n && !state[i][j][2] && !state[i][j][1] && !state[i][j][3]) {
            return false;
          }
        }
        if (state[i][j][1]) {
          if (!state[i][j][2] && !state[i][j + 1][2] && (!state[i][j][3] || !state[i][j + 1][1])) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

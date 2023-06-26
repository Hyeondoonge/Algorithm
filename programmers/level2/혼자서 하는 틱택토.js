function solution(board) {
  const N = 3;
  const temp = Array.from({ length: N }, () => Array.from({ length: N }, () => '.'));
  let answer = 0;

  dfs(0);

  return answer;

  function dfs(d) {
    // board와 비교
    if (!compare(board, temp)) {
      answer = 1;
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (temp[i][j] !== '.') continue;
        if (isOver()) continue;
        temp[i][j] = d % 2 ? 'X' : 'O';
        dfs(d + 1);
        temp[i][j] = '.';
      }
    }
  }

  function isOver() {
    // 가로 빙고
    for (let i = 0; i < N; i++) {
      if (temp[i][0] === '.') continue;
      if (temp[i][0] !== temp[i][1]) continue;
      if (temp[i][1] !== temp[i][2]) continue;
      return true;
    }
    // 세로 빙고
    for (let j = 0; j < N; j++) {
      if (temp[0][j] === '.') continue;
      if (temp[0][j] !== temp[1][j]) continue;
      if (temp[1][j] !== temp[2][j]) continue;

      return true;
    }

    // 대각선 빙고
    if (temp[0][0] !== '.' && temp[0][0] === temp[1][1] && temp[1][1] === temp[2][2]) return true;
    if (temp[0][2] !== '.' && temp[0][2] === temp[1][1] && temp[1][1] === temp[2][0]) return true;
    return false;
  }

  function compare() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (board[i][j] !== temp[i][j]) return 1;
      }
    }
    return 0;
  }
}

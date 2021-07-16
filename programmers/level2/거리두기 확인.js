const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const answer = [1, 1, 1, 1, 1];
const visitied = Array.from(new Array(5), () => new Array(5).fill(false));

let board;

const dfs = (o, r, c, depth) => {
  if (depth === 2) return;

  for(let i = 0; i < 4; i++) {
    let nr = r + dr[i];
    let nc = c + dc[i];

    if (nr < 0 || nr >= 5 || nc < 0 || nc >= 5) continue;
    if (visitied[nr][nc]) continue;

    visitied[nr][nc] = true;

    if (board[o][nr][nc] === 'O') dfs(o, nr, nc, depth + 1);
    else if (board[o][nr][nc] === 'P') answer[o] = 0;

    visitied[nr][nc] = false;
  }
};

const solution = (places) => {
  board = places;

  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      for(let k = 0; k < board[i][j].length; k++) {
        if (board[i][j][k] !== 'P') continue;

        visitied[j][k] = true;
        dfs(i, j, k, 0);
        visitied[j][k] = false;
      }
    }
  }
  
  return answer;
};
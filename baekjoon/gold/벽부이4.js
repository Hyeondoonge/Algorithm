const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input[0].split(' ').map((e) => parseInt(e));
const map = [];
const visitied = Array.from(new Array(N), () => new Array(M).fill(false));
const answer = Array.from(new Array(N), () => new Array(M).fill(0));

for(let i = 0; i < N; i++) {
  map.push(Array.from(input[i + 1]));

  for(let j = 0; j < M; j++) {
    if (map[i][j] === '1') {
      answer[i][j] = 1;
    }
  }
}

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
let size = 0;
let adjVertexes = [];

for(let i = 0; i < N; i++) {
  for(let j = 0; j < M; j++) {
    if (map[i][j] === '1') continue;
    if (visitied[i][j]) continue;
    visitied[i][j] = true;
    dfs(i, j);

    console.log(adjVertexes.length);
    for(let k = 0; k < adjVertexes.length; k++) {
      const {r, c} = adjVertexes[k];
      answer[r][c] += size;
    }
    adjVertexes = [];
    size = 0;
  } 
}

console.log(answer.map((e) => e.map((n) => n % 10).join('')).join('\n'));

function dfs (r, c) {
  for(let v = 0; v < 4; v++) {
    const adjR = r + dr[v];
    const adjC = c + dc[v];

    if (adjR < 0 || adjR >= N || adjC < 0 || adjC >= M) continue;
    if (map[adjR][adjC] === '0') continue;

    if (!adjVertexes.find(({ r, c }) => adjR === r && adjC === c)) {
      adjVertexes.push({ r: adjR, c: adjC });
    }
  }
  size++;

  for(let k = 0; k < 4; k++) {
    const nr = r + dr[k];
    const nc = c + dc[k];

    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
    if (map[nr][nc] === '1') continue;
    if (visitied[nr][nc]) continue;
    visitied[nr][nc] = true;
    dfs(nr, nc);
  }
}
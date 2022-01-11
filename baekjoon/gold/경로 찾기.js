const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [m, n] = input[0].split(' ').map((e) => parseInt(e));

const graph = Array.from(new Array(m), () => new Array(m).fill(Infinity));

for(let i = 0; i < m; i++) {
  graph[i] = input[i + 1].split(' ').map((e) => parseInt(e));
}

const path = Array.from(new Array(m), () => new Array(n).fill(-1));

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function dfs (r, c) {
  if (r === m - 1 && c === n - 1) return 1;
  if (path[r][c] !== -1) return path[r][c];
  path[r][c] = 0; // 처음 방문한 상태

  for(let k = 0; k < 4; k++) {
    const nr = dr[k] + r; 
    const nc = dc[k] + c;

    if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
    if (graph[r][c] <= graph[nr][nc]) continue;
    path[r][c] += dfs(nr, nc);
  } 
  return path[r][c];
}

// console.log(hasPath[1][3]);
// console.log(hasPath[3][3]);

console.log(dfs(0, 0));
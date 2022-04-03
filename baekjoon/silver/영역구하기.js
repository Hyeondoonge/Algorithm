const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [M, N, K] = input[0].split(' ').map((e) => parseInt(e));
const map = Array.from(new Array(M), () => new Array(N).fill(0));
const visitied = Array.from(new Array(M), () => new Array(N).fill(false));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for(let i = 0; i < K; i++) {
  const [x1, y1, x2, y2] = input[i + 1].split(' ').map((e) => parseInt(e));
  draw(x1, y1, x2, y2);
}

let count = 0;
let widths = [];

for(let i = 0; i < M; i++) {
  for(let j = 0; j < N; j++) {
    if (visitied[i][j]) continue;
    if (map[i][j] === 1) continue;
    visitied[i][j] = true;
    const width = findConnection(i, j);
    count++;

    widths.push(width);
  } 
}

console.log(count);
console.log(widths.sort((a, b) => a - b).join(' '));

function draw (x1, y1, x2, y2) {
  x2 = x2 - 1;
  y1 = M - y1 - 1;
  y2 = M - y2;

  for(let x = x1; x <= x2; x++) {
    for(let y = y2; y <= y1; y++) {
      map[y][x] = 1;
    }
  }
}

function findConnection (y, x) {
  let width = 1;

  for(let k = 0; k < 4; k++) {
    const ny = y + dy[k];
    const nx = x + dx[k];

    if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue;
    if (visitied[ny][nx]) continue;
    if (map[ny][nx] === 1) continue;
    visitied[ny][nx] = true;
    width += findConnection(ny, nx);
  }

  return width;
}
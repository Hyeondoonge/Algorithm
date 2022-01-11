const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m] = input[0].split(' ').map((e) => parseInt(e));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const arr = Array.from(new Array(501), () => new Array(501));

for(let i = 1; i <= n; i++) {
  const line = input[i].split(' ').map((e) => parseInt(e));
  for(let j = 0; j < m; j++) {
    arr[i][j + 1] = line[j];
  }
}

let answer = 0;

const q = [];
const visitied = Array.from(new Array(501), () => new Array(501).fill(false));
q.push([1, 1]);
visitied[1][1] = true;

while(q.length) {
  const [x, y] = q.shift();
  console.log(x, y);
  const h = arr[x][y];

  if (x === n && y === m) answer += 1;

  for(let k = 0; k < 4; k++) {
    const nx = x + dx[k];
    const ny = y + dy[k];

    if (nx <= 0 || nx > n || ny <= 0 || ny > m) continue;
    if (visitied[nx][ny] ) continue;

    if (arr[nx][ny] < h) {
      q.push([nx, ny]);
    }
  }
}

console.log(answer);
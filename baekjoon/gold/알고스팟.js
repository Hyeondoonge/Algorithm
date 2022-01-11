const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [ m, n ] = input[0].split(' ').map((e) => parseInt(e));
const arr = new Array(101);

for(let i = 0; i < n; i++) {
  arr[i] = Array.from(input[i + 1]);
}

const visitied = Array.from(new Array(101), () => new Array(101).fill(false));
const brokenWall = Array.from(new Array(101), () => new Array(101).fill(10000)); // 최소 부셔야 되는 벽

const q = [];
// 좌, 우, 상, 하
const dx = [ 0, 0, -1, 1 ];
const dy = [ -1, 1, 0, 0 ];

q.push({ x: 0, y: 0, w: 0 });
visitied[0][0] = true;
brokenWall[0][0] = 0;
 
while(q.length) {
  const { x, y, w } = q.shift();
  const nw = arr[x][y] == '1' ? w + 1 : w;

  for(let k = 0; k < 4; k++) {
    const nx = x + dx[k];
    const ny = y + dy[k];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

    if (visitied[nx][ny] && brokenWall[nx][ny] <= nw ) continue; // 이렇게 최소값을 위해 제한걸어주면,, 방향을 위한 메모리 필요 x
    brokenWall[nx][ny] = nw;
    q.push({ x: nx, y: ny, w: nw });
    visitied[nx][ny] = true;
  }
}

console.log(brokenWall[n - 1][m - 1]);

// console.log(answer);

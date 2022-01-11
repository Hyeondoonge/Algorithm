const dr = [ -2, -2, -1, -1, 1, 1, 2, 2 ];
const dc = [ -1, 1, -2, 2, -2, 2, -1, 1 ];

const solution = (l, curR, curC, tarR, tarC) => {
  const q = [];
  const visitied = Array.from(new Array(l), () => new Array(l).fill(false));

  visitied[curR][curC] = true;
  q.push({ r: curR, c: curC, d: 0 });

  while (q.length) {
    const { r, c, d } = q.shift();

    if (r === tarR && c === tarC) {
      return d;
    }

    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nr >= l || nc < 0 || nc >= l) continue;
      if (visitied[nr][nc]) continue;
      visitied[nr][nc] = true;
      q.push({ r: nr, c: nc, d: d + 1 });
    }
  }
  return -1;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const tc = parseInt(input[0]);

for(let i = 1; i <= tc; i++) {
  const l = parseInt(input[3 * i - 2]);
  const [curR, curC] = input[3 * i - 1].split(' ').map((e) => parseInt(e));
  const [tarR, tarC] = input[3 * i].split(' ').map((e) => parseInt(e));
  const answer = solution(l, curR, curC, tarR, tarC);
  console.log(answer);
}
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((e) => Array.from(e).map(Number));

solution();

function solution() {
  // 미로 탐색
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let idx = 0;
  const q = [];
  q.push({ r: 0, c: 0 });

  while (idx < q.length) {
    const { r, c } = q[idx++];

    if (r === N - 1 && c === M - 1) {
      break;
    }

    for (let k = 0; k < 4; k++) {
      const nr = dr[k] + r;
      const nc = dc[k] + c;

      if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;
      if (map[nr][nc] !== 1) continue;
      if (nr === 0 && nc === 0) continue;
      map[nr][nc] = map[r][c] + 1;
      q.push({ r: nr, c: nc });
    }
  }

  console.log(map[N - 1][M - 1]);
}

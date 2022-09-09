const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

solution(input);

function solution(input) {
  const [M, N] = input[0].split(' ').map(Number);
  const map = [];
  let freshTomatoCount = 0;
  const q = [];
  let day = 0;

  for (let i = 0; i < N; i++) {
    const row = input[i + 1].split(' ').map((e) => Number(e));
    map.push(row);

    // 익은 토마토 넣기
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1) {
        q.push({ r: i, c: j, d: 0 });
      } else if (map[i][j] === 0) {
        freshTomatoCount++;
      }
    }
  }

  if (freshTomatoCount === 0) {
    console.log(day);
    return;
  }

  let idx = 0;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (q.length !== idx) {
    const { r, c, d } = q[idx++];
    day = d;
    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;
      if (map[nr][nc] !== 0) continue;
      map[nr][nc] = 1;
      freshTomatoCount--;
      q.push({ r: nr, c: nc, d: d + 1 });
    }
  }

  console.log(freshTomatoCount === 0 ? day : -1);
}

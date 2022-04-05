const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input[0].split(' ').map((e) => parseInt(e));
const group_size = {};
const map = [];

for(let i = 0; i < N; i++) {
  map.push(Array.from(input[i + 1]).map((e) => parseInt(e)));
}

let number = 2;

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

for(let i = 0; i < N; i++) {
  for(let j = 0; j < M; j++) {
    if (map[i][j] !== 0) continue;
    const size = grouping(i, j, number);
    group_size[number++] = size;
  }
}

const answer = Array.from(new Array(N), () => new Array(M).fill(0));

for(let i = 0; i < N; i++) {
  for(let j = 0; j < M; j++) {
    if (map[i][j] !== 1) continue;
    answer[i][j] = 1;
    const adjNumbers = [];
    for(let k = 0; k < 4; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];
      if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;

      const adjNumber = map[nr][nc];
      if (adjNumber === 1 || adjNumbers.includes(adjNumber)) continue;
      answer[i][j] += group_size[adjNumber];
      adjNumbers.push(adjNumber);
    }
    answer[i][j] %= 10;
  }
}

console.log(answer.map((e) => e.join('')).join('\n'));

function grouping (r, c, number) {
  map[r][c] = number;

  let cnt = 1;

  for(let k = 0; k < 4; k++) {
    const nr = r + dr[k];
    const nc = c + dc[k];
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
    if (map[nr][nc] !== 0) continue; // 이미 방문 or 방문할 수 없는 벽
    cnt += grouping(nr, nc, number);
  }
  return cnt;
}
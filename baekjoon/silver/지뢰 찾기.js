function solution(N, map1, map2) {
  const answer = Array.from({ length: N }, () => Array.from({ length: N }, () => '.'));

  let find = false;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map2[i][j] !== 'x') continue;
      const cnt = count(i, j); // 인접한 지뢰개수
      answer[i][j] = cnt;

      if (map1[i][j] === '*') {
        // 지뢰찾음
        find = true;
      }
    }
  }

  if (!find) return answer.map((row) => row.join('')).join('\n');

  // 지뢰 표시
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map1[i][j] === '*') {
        answer[i][j] = '*';
      }
    }
  }

  return answer.map((row) => row.join('')).join('\n');

  function count(i, j) {
    let dr = [-1, -1, -1, 0, 0, 1, 1, 1];
    let dc = [-1, 0, 1, -1, 1, -1, 0, 1];

    let cnt = 0;

    for (let k = 0; k < 8; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      if (map1[nr][nc] === '*') {
        cnt++;
      }
    }

    return cnt;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const map1 = input.slice(1, N + 1);
const map2 = input.slice(N + 1);

console.log(solution(N, map1, map2));

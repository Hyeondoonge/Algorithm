// 분류: BFS
// 풀이시간: 9:13~10:46

// 지훈이의 위치. 불이 붙은 위치
// 불은 각 지점에서 네 방향으로 확산
// 매분마다 불 지훈은 수평또는수직으로 이동

// 미로의 가장자리에 접한 공간에서 탈출
// 지훈, 불은 벽이 잇는 공간은 통과 X

// input
// R 행 (1~1,000) C 열 (1~1,000)
// #(벽) or . or J(초기위치) or F(불)

// output
// IMPOSSIBLE or 가장 빠른 탈출시간

function solution(R, C, map) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let curTime = 0;
  let fire = { q: [], idx: 0, visitied: Array.from({ length: R }, () => Array.from({ length: C }, () => false)) };
  let man = { q: [], idx: 0, visitied: Array.from({ length: R }, () => Array.from({ length: C }, () => false)) };

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (map[i][j] === "F") {
        fire.q.push([i, j, 0]);
      }
      if (map[i][j] === "J") {
        man.q.push([i, j, 0]);
        map[i][j] = ".";
      }
    }
  }

  while (man.idx < man.q.length) {
    const [r, c, t] = man.q[man.idx++];

    if (curTime === t) {
      spread(curTime);
      curTime++;
    }

    if (!isInScope(r, c) || man.visitied[r][c]) continue;
    if (map[r][c] === "F" || map[r][c] === "#") continue;
    man.visitied[r][c] = true;

    if (exit(r, c)) return t + 1;

    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];
      man.q.push([nr, nc, t + 1]);
    }
  }

  return "IMPOSSIBLE";

  function exit(r, c) {
    return r === 0 || c === 0 || r === R - 1 || c === C - 1;
  }

  function spread(curTime) {
    while (fire.idx < fire.q.length) {
      const [r, c, t] = fire.q[fire.idx];

      if (curTime !== t) {
        break;
      }

      fire.idx += 1;

      if (!isInScope(r, c) || fire.visitied[r][c]) continue;
      if (map[r][c] === "#") continue;
      fire.visitied[r][c] = true;
      map[r][c] = "F";

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];
        fire.q.push([nr, nc, t + 1]);
      }
    }
  }

  function isInScope(r, c) {
    return !(r < 0 || R <= r || c < 0 || C <= c);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((row) => Array.from(row));

console.log(solution(R, C, map));

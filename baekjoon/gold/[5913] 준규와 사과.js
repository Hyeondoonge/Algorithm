// 분류: 백트래킹
// 풀이시간: 3:00~4:05

function solution(K, stones) {
  const map = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => "."));

  stones.forEach(([r, c]) => {
    map[r - 1][c - 1] = "x";
  });

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let answer = 0;

  move(0, 0, 4, 4, 0);

  return answer;

  function move(r1, c1, r2, c2, tree) {
    if (r1 === r2 && c1 === c2) {
      if (tree + 1 === 25 - K) {
        answer++;
      }
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nr1 = r1 + dr[i];
      const nc1 = c1 + dc[i];

      if (!isInScope(nr1, nc1) || map[nr1][nc1] === "x") continue;
      map[r1][c1] = "x";

      for (let j = 0; j < 4; j++) {
        const nr2 = r2 + dr[j];
        const nc2 = c2 + dc[j];

        if (!isInScope(nr2, nc2) || map[nr2][nc2] === "x") continue;
        map[r2][c2] = "x";

        move(nr1, nc1, nr2, nc2, tree + 2);
        map[r2][c2] = ".";
      }
      map[r1][c1] = ".";
    }
  }
  function isInScope(r, c) {
    return !(r < 0 || 5 <= r || c < 0 || 5 <= c);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const K = Number(input[0]);
const stones = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(K, stones));

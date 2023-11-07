// 분류: backtracking
// 풀이시간: 9:20~10:51

// NxM보드, 빈 칸 또는 장애물(검은 사각형)
// 빈 칸 위에 공 하나 (회색 점)
// 게임은 단계로 이루어짐, 아래와 같이 구성
// 상하좌우 방향 하나 고른 후, 그 방향으로 공을 계속 이동
// 더 이상 갈 수 없을 때까지 계속 이동

// 더 이상 이동 불가능할 때 끝남, 이때 모든 빈 칸을 공이 방문한 적 있어야함

// 모든 칸을 방문하기 위한 이동 횟수의 최소값?

// input
// 다수개의 TC
// N 세로 (1~30) M 가로 (1~30)
// board
// board[i][j] 보드 상태 (*: 장애물, .: 빈 칸)

// output
// Case {TC}: {모든 빈 칸 방문하기위한 최소 이동 횟수 or -1}

function solution(TC, N, M, board) {
  let answer = Infinity;
  let empty = 0;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === ".") {
        empty++;
      }
    }
  }

  const hist = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === "*") continue;
      // 출발 지점
      board[i][j] = "x";
      hist.push([i, j]);
      dfs(i, j, 1, 0);
      board[i][j] = ".";
    }
  }

  return `Case ${TC}: ${answer === Infinity ? -1 : answer}`;

  function dfs(i, j, v, d) {
    if (v === empty) {
      answer = Math.min(answer, d);

      return;
    }

    for (let k = 0; k < 4; k++) {
      // 한 방향으로 쭉 이동
      let nr = i;
      let nc = j;

      while (isInScope(nr + dr[k], nc + dc[k])) {
        if (board[nr + dr[k]][nc + dc[k]] === "*" || board[nr + dr[k]][nc + dc[k]] === "x") break;
        // 유효함
        nr += dr[k];
        nc += dc[k];

        hist.push([nr, nc]);
        board[nr][nc] = "x";
        v += 1;
      }

      if (nr === i && nc === j) continue; // 움직임 X
      dfs(nr, nc, v, d + 1);

      // 원상 복구
      let hr = i;
      let hc = j;

      while (nr !== hr + dr[k] || nc !== hc + dc[k]) {
        hr += dr[k];
        hc += dc[k];

        hist.pop();
        board[hr][hc] = ".";
        v -= 1;
      }
      hr += dr[k];
      hc += dc[k];
      hist.pop();
      board[hr][hc] = ".";
      v -= 1;
    }
  }

  function isInScope(r, c) {
    return !(r < 0 || N <= r || c < 0 || M <= c);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let t = 1;
let idx = 0;

while (idx < input.length) {
  const [N, M] = input[idx++].split(" ").map(Number);
  const board = input.slice(idx, idx + N).map((row) => Array.from(row));
  idx += N;

  console.log(solution(t, N, M, board));
  t += 1;
}

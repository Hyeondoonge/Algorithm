// 분류: dfs
// 풀이시간: 11:27~11:48

// 5*5
// 사과 1개, 장애물, 빈칸
// 각 칸 => (r, c) => (행, 열) => 행: 맨 위가 0, 아래로 1씩 증가 , 열: 맨 왼쪽 0, 오른쪽으로 1씩 증가

// 현재 한 명 학생이 (r, c)에 있음. 한 번의 이동으로 상하좌우 이동 방향 한 칸 이동 가능
// 사과있는 칸 이동 시, 사과를 먹음. 장애물칸 이동 불가능
// 학생 지나가면, 떠나는 즉시 장애물칸으로 벽녕
// (r, c)에서 세번 이하의 이동으로 사과 2개이상 먹을 수 있으면 1 그렇지 않으면 0

// input
// board
// board[i][j] (1: 사과, 0: 빈칸, -1: 장애물)

// r c 학생의 현재 위치 (r: 0~4, c: 0~4)

// output
// 1(조건에 맞게 먹을 수 있을 때) or 0(먹을 수 없을 때)

function solution(map, r, c) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const N = 5;

  let answer = 0;
  dfs(r, c, 0, 0);

  return answer;

  function dfs(i, j, d, ate) {
    if (map[i][j] === 1) ate++;

    if (ate >= 2) {
      answer = 1;
    }
    if (d === 3) {
      return;
    }

    let temp = map[i][j];
    map[i][j] = -1;

    for (let k = 0; k < 4; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      if (map[nr][nc] === -1) continue;
      dfs(nr, nc, d + 1, ate);
    }
    map[i][j] = temp;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const map = input.slice(0, 5).map((row) => row.split(" ").map(Number));
const [r, c] = input[5].split(" ").map(Number);

console.log(solution(map, r, c));

// 17:22 ~ 18:35

// 상어 1~M 사이의 자연수, unique
// 상어1은 나머지 모두 쫓아낼 수 있음

// N&N 격자, M개의 칸에 상어가 한 마리

// 루틴
// 모든 상어가 자신의 위치에 냄새를 뿌림
// 1초마다 모든 상어가 동시에 상하좌우 중 인접한 칸 하나로 이동하고 냄새를 뿌림
// 냄새는 상어가 k번 이동후 사라짐

// 이동방향 => 1. 인접한 칸 중, 냄새없는 칸 2. 자신의 냄새가 있는 칸 3. * 가능한 칸이 여러개일 경우 우선순위에 따라

// 상어가 보고 있는 방향 (초기값 주어짐) => 최근에 이동한 방향이 바라보고있는 방향

// 상어 이동 후 한 칸에 여러 마리 상어있으면 작은 번호 상어 제외하고 격자 밖으로 쫓겨남

// input
// N 격자 크기 (2~20), M 상어 수 (2~N^2), k 냄새 유지 기간 (1~1000)
// map (N*N)
// map[i][j] 0 빈 칸, x번 상어

// priority
// 상어 당 4줄씩 (위, 아래, 왼쪽, 오른쪽 일때 우선순위로 1~4)

// output
// 1번 상어만 남는데 까지 걸리는 시간
// 1,000초 초과시 -1
function solution(N, M, k, shark, priority) {
  // 모두 0번부터 시작
  const smell = Array.from({ length: N }, () => Array.from({ length: N }, () => ({ id: -1, time: 0 })));

  const dr = [0, -1, 1, 0, 0];
  const dc = [0, 0, 0, -1, 1];

  let t = 0;
  // 냄새 뿌리기
  spread(t);

  while (t < 1000) {
    // 시간 지난 냄새 없애기
    // 이동
    move();

    t++;
    disappear(t);
    // 냄새 뿌리기
    spread(t);

    if (isOneLeft()) {
      return t;
    }
  }

  return -1;

  function move() {
    const newShark = Array.from({ length: N }, () => Array.from({ length: N }, () => ({ id: -1, d: -1 })));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (shark[i][j].id === -1) continue;

        const { id, d } = shark[i][j];

        let empty = null;
        let mine = null;

        for (let k = 0; k < 4; k++) {
          const nd = priority[(id - 1) * 4 + (d - 1)][k];
          const ni = i + dr[nd];
          const nj = j + dc[nd];
          // 우선순위에 따라 이동
          if (ni < 0 || N <= ni || nj < 0 || N <= nj) continue;
          if (!empty && smell[ni][nj].id === -1) {
            empty = { i: ni, j: nj, d: nd };
          }
          if (!mine && smell[ni][nj].id === id) {
            mine = { i: ni, j: nj, d: nd };
          }
        }

        if (empty) {
          const { id: oid } = newShark[empty.i][empty.j];

          if (oid === -1 || id < oid) {
            newShark[empty.i][empty.j] = { id, d: empty.d };
          }
          continue;
        }
        if (mine) {
          const { id: oid } = newShark[mine.i][mine.j];
          if (oid === -1 || id < oid) {
            newShark[mine.i][mine.j] = { id, d: mine.d };
          }
          continue;
        }
        const { id: oid } = newShark[i][j];
        if (oid === -1 || id < oid) {
          newShark[i][j] = { id, d };
        }
      }
    }
    // 복사

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        shark[i][j] = { ...newShark[i][j] };
      }
    }
  }

  function disappear(time) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (smell[i][j].time === time) {
          smell[i][j] = { id: -1, time: -1 };
        }
      }
    }
  }

  function spread(t) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (shark[i][j].id !== -1) {
          smell[i][j].id = shark[i][j].id;
          smell[i][j].time = t + k;
        }
      }
    }
  }

  function isOneLeft() {
    let cnt = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (shark[i][j].id !== -1) {
          cnt++;
        }
      }
    }
    return cnt === 1;
  }
}

function parse(input) {
  input = input.trim().split("\n");
  const [N, M, k] = input[0].split(" ").map(Number);
  const dirs = input
    .slice(N + 1, N + 2)[0]
    .split(" ")
    .map(Number);

  const shark = input.slice(1, N + 1).map((row) =>
    row.split(" ").map((e) => {
      const id = Number(e);
      if (id === 0) return { id: -1, d: -1 };
      else return { id, d: dirs[id - 1] };
    })
  );

  const priority = input.slice(N + 2).map((row) => row.split(" ").map(Number));

  return [N, M, k, shark, priority];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();
const [N, M, k, shark, priority] = parse(input);
console.log(solution(N, M, k, shark, priority));


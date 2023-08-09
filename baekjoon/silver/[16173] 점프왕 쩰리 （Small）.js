// 분류: 구현, DFS
// 풀이시간: 4:44~4:58

// 1. 정사각형 내부에서 움직임, 외부로 나갈경우 게임에서 패배
// 2. 출발점은 0,0
// 3. 오른쪽, 아래 방향으로만 이동
// 4. 도착점은 N, N => 승리
// 5. 밟고 있는 칸 위의 수만큼 한 번에 이동 가능, 그보다 넘어서 또는 부족하게 이동 불가능

// input
// N 게임 구역 크기 (2~3)
// arr[i][j] (0 ~ 100, 단 도착점은 -1)

// output
// HaruHaru (도달가능) or Hing (도달 불가능)

function solution(N, map) {
  let answer = "Hing";

  const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));
  const di = [1, 0];
  const dj = [0, 1];

  dfs(0, 0);

  return answer;

  function dfs(i, j) {
    if (i === N - 1 && j === N - 1) {
      answer = "HaruHaru";
      return;
    }

    if (visitied[i][j]) return;
    visitied[i][j] = true;

    for (let k = 0; k < 2; k++) {
      const ni = i + di[k] * map[i][j];
      const nj = j + dj[k] * map[i][j];
      if (ni < 0 || N <= ni || nj < 0 || N <= nj) continue;

      dfs(ni, nj);
    }

    visitied[i][j] = false;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const map = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(N, map));
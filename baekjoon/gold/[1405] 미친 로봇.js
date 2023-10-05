// 분류: DFS, 확률
// 풀이시간: 1:30~2:13, 2:40~3:05

// N번의 행동
// 행동 => 4개의 방향 중 하나를 임의로 선택하고 그 방향으로 이동
// 같은 곳을 한 번보다 많이 이동하지 않으면 단순한 경로
// 로봇의 이동 경로가 단순할 확률?

// 로봇의 시작 위치 = 처음 방문한 곳

// input
// N 행동의 수 (1~14) percentages 동 서 남 북 각각의 이동확률 (0~100, 자연수이고 모두 더하면 100)

// output
// 로봇의 이동경로가 단순할 확률 (10^-9까지 오차허용)

function solution(N, percentages) {
  for (let i = 0; i < 4; i++) {
    percentages[i] /= 100;
  }
  const visitied = Array.from({ length: N * 2 + 1 }, () => Array.from({ length: N * 2 + 1 }, () => false));

  let answer = 0;

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  visitied[N][N] = true;

  // 최대 N - 2 만큼의 조합에 대한 계산

  dfs(N, N, 0, 1);

  answer = 1 - answer;

  return answer;

  function dfs(r, c, d, per) {
    if (d === N) {
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (visitied[nr][nc]) {
        answer += per * percentages[i];
        continue;
      } else {
        visitied[nr][nc] = true;
        dfs(nr, nc, d + 1, per * percentages[i]);
        visitied[nr][nc] = false;
      }
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, ...percentages] = input[0].split(" ").map(Number);

console.log(solution(N, percentages));

// 분류: DP
// 풀이시간: 5:30~6:01

// 남북 방향 도로 w개, 동서 방향 도로 h개
// 각 방향 도로는 주어진 규칙에 따라 번호 매겨짐.
// 교차로 => (i, j)

// 상근이는 (1, 1) 교차로, (w, h)에 있는 회사에 차로 다님
// 차는 도로로만 이동 가능
// 회사에 가기위해 동쪽 or 북쪽으로만 이동가능.

// 교차로를 돈 차량은 그 다음 교차로에서 방향을 바꿀 수 없음. ***

// 출근 경로의 수

// input
// w (2~100) h (2~100)

// output
// 출근경로 % 100,000

function solution(W, H) {
  const mod = 100000;
  const dp = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => [
      [Infinity, Infinity], // 오른쪽 이동 일 떄, 꺽 X 꺽 O
      [Infinity, Infinity], // 아래 이동 일 떄, 꺽 X 꺽 O
    ])
  );

  dp[H - 2][W - 1] = [
    [0, 0],
    [1, 0],
  ];
  dp[H - 1][W - 2] = [
    [1, 0],
    [0, 0],
  ];

  const dr = [0, 1];
  const dc = [1, 0];

  dfs(0, 0);

  function dfs(i, j) {
    if (dp[i][j][1][1] !== Infinity) return;

    dp[i][j][1][1] = dp[i][j][1][0] = dp[i][j][0][1] = dp[i][j][0][0] = 0;

    for (let k = 0; k < 2; k++) {
      const nr = i + dr[k];
      const nc = j + dc[k];

      if (nr < 0 || H <= nr || nc < 0 || W <= nc) continue;
      dfs(nr, nc);
      // 같은 방향
      dp[i][j][k][0] = (dp[i][j][k][0] + dp[nr][nc][k][0] + dp[nr][nc][k][1]) % mod;
      // 꺽는 경우
      dp[i][j][k][1] = (dp[i][j][k][1] + dp[nr][nc][k === 1 ? 0 : 1][0]) % mod;
    }
  }

  return (dp[0][0][0][1] + dp[0][0][0][0] + dp[0][0][1][1] + dp[0][0][1][0]) % mod;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [W, H] = input[0].split(" ").map(Number);

console.log(solution(W, H));

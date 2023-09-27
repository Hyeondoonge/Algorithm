// 분류: DP
// 풀이시간: 3:42~3:55

// N*N보드에 양의 숫자들(1이상)
// 왼쪽 위 -> 오른쪽 아래, 규칙에 맞게 점프해서 이동하기
// map[i][j]: 현재 위치에서 갈 수 있는 거리
// 오른쪽 or 아래쪽으로만이동 가능. 0은 종착점.

// input
// N (4~100)
// map[i][j] (0~9)

// output
// 경로의 수 (2^63-1보다 클 수 있고, 100자리를 넘지않음)

function solution(N, map) {
  const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));

  const dr = [0, 1];
  const dc = [1, 0];

  return dfs(0, 0).toString();

  function dfs(i, j) {
    if (i === N - 1 && j === N - 1) {
      return (dp[i][j] = 1n);
    }
    if (dp[i][j] !== Infinity) return dp[i][j];
    dp[i][j] = 0n;

    for (let k = 0; k < 2; k++) {
      const nr = i + dr[k] * map[i][j];
      const nc = j + dc[k] * map[i][j];
      if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
      dp[i][j] += dfs(nr, nc);
    }
    return dp[i][j];
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const map = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(N, map));

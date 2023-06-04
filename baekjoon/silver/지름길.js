function solution(N, D, shortcuts) {
  shortcuts.sort((a, b) => a[0] - b[0]);
  let answer = Infinity;

  dfs(0, 0, 0);

  return answer;

  function dfs(e, cost, d) {
    if (d === N) {
      if (e <= D) {
        answer = Math.min(answer, cost + (D - e));
      }
      return;
    }

    dfs(e, cost, d + 1);

    const shortcut = shortcuts[d];
    if (e <= shortcut[0]) {
      dfs(shortcut[1], cost + (shortcut[0] - e) + shortcut[2], d + 1);
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, D] = input[0].split(' ').map(Number);
const shortcuts = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, D, shortcuts));

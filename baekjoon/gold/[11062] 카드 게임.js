function solution(N, cards) {
  const memo = Array.from({ length: N }, () => Array.from({ length: N }, () => -1));

  const result = dfs(0, N - 1, 0);
  return result;

  function dfs(l, r, turn) {
    if (turn === N) return 0;

    if (memo[l][r] !== -1) return memo[l][r];

    if (turn % 2 === 0) {
      return (memo[l][r] = Math.max(
        dfs(l + 1, r, turn + 1) + cards[l],
        dfs(l, r - 1, turn + 1) + cards[r]
      ));
    } else {
      return (memo[l][r] = Math.min(dfs(l + 1, r, turn + 1), dfs(l, r - 1, turn + 1)));
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;
let T = Number(input[idx++]);
let answer = '';

while (T--) {
  const N = Number(input[idx++]);
  const cards = input[idx++].split(' ').map(Number);
  answer += solution(N, cards) + '\n';
}

console.log(answer);

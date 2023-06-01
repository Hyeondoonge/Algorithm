function solution(N, effects) {
  const team = Array.from({ length: N }, () => 'B');
  let answer = Infinity;

  comb(0, 0);

  return answer;

  function comb(idx, d) {
    if (d === Math.floor(N / 2)) {
      return;
    }

    for (let i = idx; i < N; i++) {
      team[i] = 'A';
      answer = Math.min(answer, calculate());
      comb(i + 1, d + 1);
      team[i] = 'B';
    }
  }

  function calculate() {
    let teamA = 0;

    for (let i = 0; i < N - 1; i++) {
      if (team[i] !== 'A') continue;
      for (let j = i + 1; j < N; j++) {
        if (team[j] !== 'A') continue;
        teamA += effects[i][j] + effects[j][i];
      }
    }

    let teamB = 0;

    for (let i = 0; i < N - 1; i++) {
      if (team[i] !== 'B') continue;
      for (let j = i + 1; j < N; j++) {
        if (team[j] !== 'B') continue;
        teamB += effects[i][j] + effects[j][i];
      }
    }
    return Math.abs(teamB - teamA);
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const effects = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, effects));

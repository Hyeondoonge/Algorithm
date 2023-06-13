function solution(N, M, commands) {
  const SEATS = 20;
  const train = Array.from({ length: N }, () => Array.from({ length: SEATS }, () => false));

  for (let i = 0; i < M; i++) {
    const [num, j, x] = commands[i].split(' ').map(Number);

    if (num === 1) {
      train[j - 1][x - 1] = true;
    } else if (num === 2) {
      train[j - 1][x - 1] = false;
    } else if (num === 3) {
      backward(j);
    } else if (num === 4) {
      forward(j);
    }
  }

  const records = new Set();

  for (let i = 0; i < N; i++) {
    records.add(train[i].map((seat) => (seat ? 'O' : 'X')).join(''));
  }

  return records.size;

  function backward(i) {
    train[i - 1][SEATS - 1] = false;
    for (let k = SEATS - 2; k >= 0; k--) {
      train[i - 1][k + 1] = train[i - 1][k];
      train[i - 1][k] = false;
    }
  }

  function forward(i) {
    train[i - 1][0] = false;
    for (let k = 1; k < SEATS; k++) {
      train[i - 1][k - 1] = train[i - 1][k];
      train[i - 1][k] = false;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const commands = input.slice(1);

console.log(solution(N, M, commands));

function solution(stones) {
  let idx = 0;
  const visitied = Array.from({ length: 1501 }, () => Array.from({ length: 1501 }, () => false));
  const q = [];

  stones.sort((a, b) => a - b);
  visitied[stones[0]][stones[1]] = true;
  q.push(stones);

  while (idx < q.length) {
    const stones = q[idx++];

    if (stones[0] === stones[1] && stones[1] === stones[2]) {
      return 1;
    }

    stones.sort((a, b) => a - b);

    for (let i = 0; i < 2; i++) {
      for (let j = i + 1; j < 3; j++) {
        if (stones[i] === stones[j]) continue;

        const new_stones = [...stones];

        new_stones[j] -= new_stones[i];
        new_stones[i] += new_stones[i];

        let r = new_stones[j] < new_stones[i] ? new_stones[j] : new_stones[i];
        let c = new_stones[j] > new_stones[i] ? new_stones[j] : new_stones[i];

        if (visitied[r][c]) continue;
        visitied[r][c] = true;
        q.push(new_stones);
      }
    }
  }

  return 0;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const stones = input[0].split(' ').map(Number);
console.log(solution(stones));

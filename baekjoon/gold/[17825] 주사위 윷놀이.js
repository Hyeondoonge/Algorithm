function solution(numbers) {
  const board = [
    Array.from({ length: 20 }, (_, idx) => idx * 2),
    [13, 16, 19],
    [22, 24],
    [28, 27, 26],
    [25, 30, 35],
    [40, 0]
  ];

  const positions = Array.from({ length: 4 }, () => ({ r: 0, c: 0 }));
  let answer = 0;

  backtracking(0, 0);

  return answer;

  function backtracking(d, score) {
    if (d === 10) {
      answer = Math.max(score, answer);
      return;
    }

    for (let k = 0; k < 4; k++) {
      // k말을 이동시켰을 때 유효한 이동인지 확인후 그렇다면 keep going
      const position = positions[k];

      if (isArrive(position)) continue;

      const newPos = getNewPosition(positions, position, numbers[d]);

      if (!newPos) continue;
      const prevPos = { ...position };

      positions[k] = newPos;
      const { r, c } = newPos;

      backtracking(d + 1, score + board[r][c]);
      positions[k] = prevPos;
    }
  }
}

function isArrive(pos) {
  return pos.r === 5 && pos.c === 1;
}

// 같은 위치의 말이 있다면 null을 반환
function getNewPosition(positions, pos, v) {
  let { r, c } = pos;

  if (r === 0 && c === 5) {
    (r = 1), (c = 0);
    v--;
  } else if (r === 0 && c === 10) {
    (r = 2), (c = 0);
    v--;
  } else if (r === 0 && c === 15) {
    (r = 3), (c = 0);
    v--;
  }

  for (let i = 0; i < v; i++) {
    if (isArrive({ r, c })) return { r, c };
    if ((r === 0 && c === 19) || (r === 4 && c === 2)) {
      (r = 5), (c = 0);
    } else if ((r === 1 && c === 2) || (r === 2 && c === 1) || (r === 3 && c === 2)) {
      (r = 4), (c = 0);
    } else {
      c += 1;
    }
  }

  for (let k = 0; k < 4; k++) {
    const position = positions[k];
    if (position.r === r && position.c === c) return null;
  }

  return { r, c };
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(solution(input[0].split(' ')));

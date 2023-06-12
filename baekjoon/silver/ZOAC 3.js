function solution(sl, sr, str) {
  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  const pos = {};
  const l = [0, 0];
  const r = [0, 0];

  for (let i = 0; i < keyboard.length; i++) {
    for (let j = 0; j < keyboard[i].length; j++) {
      pos[keyboard[i][j]] = [i, j];

      if (keyboard[i][j] === sl) {
        l[0] = i;
        l[1] = j;
      }

      if (keyboard[i][j] === sr) {
        r[0] = i;
        r[1] = j;
      }
    }
  }

  const N = str.length;
  let answer = 0;

  for (let i = 0; i < N; i++) {
    const c = str[i];
    const [y, x] = pos[c];

    if ((x < 4 && y === 2) || (x < 5 && y < 2)) {
      // 자음
      answer += Math.abs(l[1] - x) + Math.abs(l[0] - y);
      l[0] = y;
      l[1] = x;
    } else {
      answer += Math.abs(r[1] - x) + Math.abs(r[0] - y);
      r[0] = y;
      r[1] = x;
    }

    answer += 1;
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [sl, sr] = input[0].split(' ');
const str = input[1];

console.log(solution(sl, sr, str));

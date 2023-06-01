function solution(N, P, melodies) {
  const STRINGS = 6;
  const stack = Array.from({ length: STRINGS + 1 }, () => []);

  let answer = 0;

  for (const melody of melodies) {
    const [string, plat] = melody.split(' ').map(Number);

    let M = stack[string].length;

    if (M === 0) {
      stack[string].push(plat);
      answer++;
      continue;
    }

    if (plat < stack[string][M - 1]) {
      while (M !== 0 && plat < stack[string][M - 1]) {
        stack[string].pop();
        answer++;
        M = stack[string].length;
      }
    }

    if (M !== 0 && plat === stack[string][M - 1]) {
      continue;
    }

    stack[string].push(plat);
    answer++;
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, P] = input[0].split(' ').map(Number);
const melodies = input.slice(1);

console.log(solution(N, P, melodies));

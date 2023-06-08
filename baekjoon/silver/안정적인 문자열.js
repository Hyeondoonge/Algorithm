function solution(strs) {
  let answer = '';

  const stack = [];
  const N = strs.length;

  for (let i = 0; i < N; i++) {
    const str = strs[i];
    const M = str.length;
    for (let j = 0; j < M; j++) {
      const top = stack[stack.length - 1];
      if (!top || top === '}') {
        stack.push(str[j]);
      } else {
        if (str[j] === '}') {
          stack.pop();
        } else {
          stack.push('{');
        }
      }
    }

    let count = 0;

    while (stack.length) {
      const top = stack.pop();
      const topPrev = stack.pop();

      if (top !== '}') {
        count++;
      }

      if (topPrev !== '{') {
        count++;
      }
    }
    answer += `${i + 1}. ${count}\n`;
  }
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const strs = input.slice(0, input.length - 1);

console.log(solution(strs));

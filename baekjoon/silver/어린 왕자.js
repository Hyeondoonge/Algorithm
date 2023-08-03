function solution(x1, y1, x2, y2, planets) {
  let answer = 0;

  for (const [cx, cy, r] of planets) {
    const d1 = Math.pow(Math.pow(x1 - cx, 2) + Math.pow(y1 - cy, 2), 1 / 2);
    const d2 = Math.pow(Math.pow(x2 - cx, 2) + Math.pow(y2 - cy, 2), 1 / 2);
    if (d1 < r && d2 < r) continue;
    if (d1 < r || d2 < r) answer += 1;
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let idx = 0;
let t = Number(input[idx++]);
let answer = '';

while (t--) {
  const [x1, y1, x2, y2] = input[idx++].split(' ').map(Number);
  const N = Number(input[idx++]);
  const planets = input.slice(idx, idx + N).map((row) => row.split(' ').map(Number));
  idx += N;
  answer += solution(x1, y1, x2, y2, planets) + '\n';
}

console.log(answer);

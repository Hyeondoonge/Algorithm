const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);
const dist = input[1].split(' ').map((e) => parseInt(e));
const cost = input[2].split(' ').map((e) => parseInt(e));

let answer = 0;
let left = 0;

let idx = 0;

while () {
  const cur = cost[idx];
  const next = cost[idx + 1];

  if (cur >= next) { // 필요한 만큼 충전
    answer += dist[idx] * cur - left;
    left = 0; // 추가로 필요한 양
    continue;
  }
  for(let j = i + 1; j < cost.length - 1; j++) {
    
  }
}
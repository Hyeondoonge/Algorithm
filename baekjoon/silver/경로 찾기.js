
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = parseInt(input[0]);

const path = Array.from(new Array(n), (_, index) => input[index + 1].split(' ').map((e) => e == 1 ? parseInt(e) : Infinity));

for(let k = 0; k < n; k++) {
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
        if(path[i][k] + path[k][j] < path[i][j]) {
          path[i][j] = path[i][k] + path[k][j];
        }
    }
  }
}
let answer = '';

for(let i = 0; i < n; i++) {
  for(let j = 0; j < n; j++) {
    const v = path[i][j] !== Infinity ? 1 : 0;
    if (j === n - 1) answer += `${v}\n`
    else answer += `${v} `;
  }
}

console.log(answer);
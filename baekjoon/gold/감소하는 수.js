const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);
const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let idx = 0;

while (arr.length <= n) {
  let m = arr.length;

  for(let i = idx; i < m; i++) {
    for(let j = 0; j < arr[i][arr[i].length - 1]; j++) {
      arr.push(arr[i] + j);
    }
  }

  if (arr.length === m) { // 추가된 수 없을 때
    console.log(-1);
    return;
  }

  idx = m;

}

console.log(arr[n]);
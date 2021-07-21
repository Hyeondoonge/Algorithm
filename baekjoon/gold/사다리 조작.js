const arr = Array.from(new Array(31), () => new Array(11).fill(0));

let answer = 4;

const move = (n, h) => {
  // console.log(arr);

  let valid = true;

  for(let j = 1; j <= n; j++) {
    let start = j, end = j;
    for(let i = 1; i <= h; i++) {
      if (j - 1 > 0 && arr[i][j] === j - 1 && arr[i][j - 1] === j) {
        j = end -= 1;
        continue;
      }
      if (j + 1 <= n && arr[i][j] === j + 1 && arr[i][j + 1] === j) {
        j = end += 1;
      };
    }

    if (start !== end) {
      valid = false;
      break;
    }
  }

  return valid;
}

const put = (n, h, d) => {
  if (d === 4) return;

  // 사다리 배치
  for(let i = 1; i <= h; i++) {
    for(let j = 1; j <= n - 1; j++) {
      if (arr[i][j] || arr[i][j + 1]) continue;

      arr[i][j] = j + 1;
      arr[i][j + 1] = j;

      const valid = move(n, h); // 성공 시 answer 

      if (valid) {
        answer = answer < d ? answer : d;
      }

      put(n, h, d + 1);

      arr[i][j] = 0;
      arr[i][j + 1] = 0;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m, h] = input[0].split(' ').map((e) => parseInt(e));

// 초기 사다리 상태
for(let i = 1; i < input.length - 1; i++) {
  const [a, b] = input[i].split(' ').map((e) => parseInt(e));
  arr[a][b] = b + 1;
  arr[a][b + 1] = b;
}

const valid = move(n, h); // 성공 시 answer 

if (valid) answer = 0;
else {
  put(n, h, 1);
  if (answer === 4) answer = -1;
}

console.log(answer);
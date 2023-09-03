const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m, t] = input[0].split(' ').map((e) => parseInt(e));

const top = new Array(n + 1).fill(0);
const circle = new Array(n + 1);

let initialCount = 0;

for(let i = 0; i < n; i++) {
  circle[i + 1] = input[i + 1].split(' ').map((e) => parseInt(e));
  for(let j = 0; j < m; j++) {
    initialCount += circle[i + 1][j];
  }
}

for(let r = 0; r < t; r++) {
  const [x, d, k] = input[n + 1 + r].split(' ').map((e) => parseInt(e));
  rotate(x, d, k);
  const eraseCnt = erase();
  if (eraseCnt === 0) {
    update();
  }
}

const answer = count();
console.log(answer);

function rotate (x, d, k) {
  for(let i = 1; x * i <= n; i++) {
    if (d === 0) {
      top[x * i] -= k;
      if (top[x * i] < 0) {
        top[x * i] = m + top[x * i];
      }
    } else {
      top[x * i] += k;
      if (top[x * i] >= m) {
        top[x * i] = top[x * i] - m;
      }
    }
  }
}

function erase() {
  let eraseCnt = 0;

  const erased = Array.from(new Array(n + 1), () => new Array(m).fill(false));

  for(let i = 1; i <= n; i++) {
    let a_idx = top[i];
    let b_idx = top[i + 1];
  
    if (circle[i][0] === circle[i][m - 1]) {
      erased[i][0]= true;
      erased[i][m - 1] = true;
    }
  
    for(let j = 1; j < m - 1; j++) {
      if (circle[i][j - 1] === circle[i][j]) {
        erased[i][j - 1] = true;
        erased[i][j] = true
      }
      if (circle[i][j] === circle[i][j + 1]) {
        erased[i][j + 1] = true;
        erased[i][j] = true;
      }
    }
  
    if (i === n) continue;
  
    for(let j = 0; j < m; j++) {
      if (circle[i][a_idx] === circle[i+1][b_idx]) {
        erased[i][a_idx] = true;
        erased[i+1][b_idx] = true;
      }
      a_idx++;
      b_idx++;
  
      if (a_idx >= m) a_idx = 0;
      if (b_idx >= m) b_idx = 0;
    }
  }

  for(let i = 1; i <= n; i++) {
    for(let j = 0; j < m; j++) {
      if (erased[i][j] && circle[i][j] !== -1) {
        circle[i][j] = -1;
        eraseCnt ++;
      }
    }
  }
  return eraseCnt;
}

function count () {
  let sum = 0;
  for(let i = 1; i <= n; i++) {
    for(let j = 0; j < m; j++) {
      if (circle[i][j] !== -1) {
        sum += circle[i][j];
      }
    }
  }
  return sum;
}

function update () {
  let sum = 0;
  let cnt = 0;

  for(let i = 1; i <= n; i++) {
    for(let j = 0; j < m; j++) {
      if (circle[i][j] === -1) continue;
      sum += circle[i][j];
      cnt ++;
    }
  }

  const average = sum / cnt;

  for(let i = 1; i <= n; i++) {
    for(let j = 0; j < m; j++) {
      if (circle[i][j] === -1) continue;
      if (circle[i][j] > average) {
        circle[i][j] -= 1;
      } 
      else if (circle[i][j] < average) {
        circle[i][j] += 1;
      }
    }
  }
}
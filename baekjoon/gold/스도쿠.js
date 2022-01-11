const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const board = new Array(9);

let n = 0;
let cord = [];

for(let i = 0; i < 9; i++) {
  board[i] = input[i].split(' ').map((e) => parseInt(e));
  for(let j = 0; j < 9; j++) {
    if (board[i][j] === 0) {
      n += 1;
      cord.push([i, j]);
    }
  }
}

const getScope = (n) => {
  if (n < 3) return [0, 2];
  if (n < 6) return [3, 5];
  return [6, 8];
}

const checkValid = (r, c, number) => {
  // 행, 열 검사
  for(let i = 0; i < 9; i++) {
    if (r === i) continue;
    if (board[i][c] === number) return false;
  }

  for(let j = 0; j < 9; j++) {
    if (c === j) continue;
    if (board[r][j] === number) return false;
  }

  const [rs, re] = getScope(r);
  const [cs, ce] = getScope(c);

  for(let i = rs; i <= re; i++) {
    for(let j = cs; j <= ce; j++) {
      if (i === r && j === c) continue;
      if (board[i][j] === number) return false;
    }
  }

  return true;
};

let answer;

const comb = (d, n) => {
  if (d === n) {
    answer = '';
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        answer += board[i][j] + ' '; 
      }
      answer += '\n';
    }
    console.log(answer);
    process.exit(0);
  }

  for(let i = 1; i <= 9; i++) {
    // 검사
    const r = cord[d][0], c = cord[d][1];
    const valid = checkValid(r, c, i);
    if (valid) {
      board[r][c] = i;
      comb(d + 1, n);
      board[r][c] = 0;
    }
  }
};

comb(0, n);
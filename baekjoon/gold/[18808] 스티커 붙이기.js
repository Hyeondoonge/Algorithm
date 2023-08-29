const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M, K] = input[0].split(' ').map((e) => parseInt(e));
const map = Array.from(new Array(N), () => new Array(M).fill(0));
let inputIdx = 1;

for(let k = 0; k < K; k++) { // 색종이
  const [R, C] = input[inputIdx++].split(' ').map((e) => parseInt(e));
  const original = new Array(R);

  for(let i = 0; i < R; i++) {
    original[i] = (input[inputIdx++].split(' ').map((e) => parseInt(e)));
  }

  let rotated = original;

  for(let d = 1; d <= 4; d++) {
    let pos;

    if (d === 2) {
      rotated = rotate(rotated);
    } else if (d === 3){
      rotated = rotate(rotated);
    } else if (d === 4) {
      rotated = rotate(rotated);
    }

    pos = findPosition(rotated);
    if (!pos) continue;

    locate(pos, rotated);
    break;
  }

}
console.log(count());

function findPosition (paper) {
  for(let i = 0; i <= N - paper.length; i++) {
    for(let j = 0; j <= M - paper[0].length; j++) {
      let find = true;

      for(let r = 0; r < paper.length; r++) {
        for(let c = 0; c < paper[0].length; c++) {
          if (paper[r][c] === 1 && map[i + r][j + c]) {
            find = false;
            break;
          }
        }
        if (!find) break;
      }
      if (find) return { r: i, c: j };
    }
  }
  return null;
}

function locate (pos, paper) {
  // 놓기
      for(let r = 0; r < paper.length; r++) {
        for(let c = 0; c < paper[0].length; c++) {
          if (paper[r][c] !== 1) continue;
          map[pos.r + r][pos.c + c] = paper[r][c];
      }
    }
}

function rotate (paper) {
  const R = paper.length, C = paper[0].length
  const rotated = Array.from(new Array(C), () => new Array(R));
  
  for(let i = 0; i < R; i ++) {
    for(let j = 0; j < C; j++) {
      rotated[j][R - i - 1] = paper[i][j];
    } 
  }
  return rotated;
}

function count () {
  let cnt = 0;
  for(let r = 0; r < N; r++) {
    for(let c = 0; c < M; c++) {
      if (map[r][c] === 1) cnt++;  
    }
  }
  return cnt;
}
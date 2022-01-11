const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [n, m] = input[0].split(' ').map((e) => parseInt(e));

const board = Array.from(new Array(n), () => new Array(m));

let fr = -1, fc = -1;
let sr = -1, sc = -1;

for(let i = 0; i < n; i++) {
  for(let j = 0; j < m; j++) {
    let c = input[i+1].charAt(j);
    board[i][j] = c;
    if (c === 'o') {
      if (firstR === -1 && firstC === -1) {
        fr = i, fc = j;
      } else {
        sr = i, sc = j;
      }
    }
  }
}

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const move = (fr, fc, sr, sc, depth) => {
  if (depth >= 10) return;

  for(let i = 0; i < 4; i++) {
    const nFR = fr + dr[i], nFC = fc + dc[i];
    const nSR = sr + dr[i], nSC = sc + dc[i];

    if ((nFR < 0 || nFR >= n || nFC < 0 || nFC >= m) && (nSR < 0 || nSR >= n || nSC < 0 || nSC >= m)) {
      continue;
    }

    if ((nFR < 0 || nFR >= n || nFC < 0 || nFC >= m)) {
      move(fr, fc, nSR , nSC, depth + 1);
    } else if ((nSR < 0 || nSR >= n || nSC < 0 || nSC >= m)) {
      move(nFR, nFC, sr , sc, depth + 1);
    } else {
      move(nFR, nFC, nSR , nSC, depth + 1);
    }
    
    // 벽이면 못가게 한다.
    // 원상복구
  }
}

move(fr, fc, sr, sc, 0);
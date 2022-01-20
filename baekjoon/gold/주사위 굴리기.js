const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m, r, c, k] = input[0].split(' ').map((e) => parseInt(e));

const board = [];

for(let i = 0; i < n; i++) {
  board.push(input[i + 1].split(' ').map((e) => parseInt(e)));
}

const command = input[n + 1].split(' ').map((e) => parseInt(e));
const dice = [null, 0, 0, 0, 0, 0, 0]; // 1번부터 사용

const dr = [0, 0, -1, 1];
const dc = [1, -1, 0, 0];

let diceR = r, diceC = c;

for(let i = 0; i < k; i++) {
  const dir = command[i];
  
  const nr = diceR + dr[dir - 1];
  const nc = diceC + dc[dir - 1];

  if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;

  // 방향에 따라 주사위 회전
  if (dir === 1 || dir === 2) {
    horizontalRotate(dir);
  } else {
    verticalRotate(dir);
  }

  // 값 복사
  if (board[nr][nc] === 0) {
    board[nr][nc] = dice[6];
  } else {
    dice[6] = board[nr][nc];
    board[nr][nc] = 0;
  }

  diceR = nr;
  diceC = nc;

  console.log(dice[3]);
}

function horizontalRotate (dir) {
  const idx2_value = dice[2];
  const idx3_value = dice[3];
  const idx4_value = dice[4];
  const idx6_value = dice[6];

  if (dir === 1) {
    dice[2] = idx6_value;
    dice[3] = idx2_value;
    dice[4] = idx3_value;
    dice[6] = idx4_value;
    return;
  }
  dice[2] = idx3_value;
  dice[3] = idx4_value;
  dice[4] = idx6_value;
  dice[6] = idx2_value;
}

function verticalRotate (dir) {
  const idx1_value = dice[1];
  const idx3_value = dice[3];
  const idx5_value = dice[5];
  const idx6_value = dice[6];

  if (dir === 3) {
    dice[1] = idx3_value;
    dice[3] = idx5_value;
    dice[5] = idx6_value;
    dice[6] = idx1_value;
    return;
  }
  dice[1] = idx6_value;
  dice[3] = idx1_value;
  dice[5] = idx3_value;
  dice[6] = idx5_value;
}
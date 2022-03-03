const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [R, C, M] = input[0].split(' ').map((e) => parseInt(e));

const sharks = new Array(M + 1);

const sea = Array.from({ length: R + 1 }, (_, i) => Array.from({ length: C + 1 }, (_, j) => i === 0 || j === 0 ? '-' : '~'));

for(let i = 0; i < M; i++) {
  sharks[i + 1] = input[i + 1].split(' ').map((e) => parseInt(e));

  const [r, c, s, d, w] = sharks[i + 1];

  sea[r][c] = i + 1;
}

let answer = 0;

let pos = 1;

while (pos <= C) {
  answer += catchShark(pos);
  moveShark();
  pos++;
}

console.log(answer);

function catchShark (c) {
  let weight = 0;

  for(let i = 1; i <= R; i++) {
    if (sea[i][c] === '~') continue;
    const number = sea[i][c];
    weight = sharks[number][4];
    sharks[number] = null;
    break;
  }
  return weight;
}

function moveShark () {
  for(let i = 1; i <= R; i++) {
    for(let j = 1; j <= C; j++) {
      sea[i][j] = '~';
    }  
  }

  for(let i = 1; i <= M; i++) {
    if (!sharks[i]) continue;
    const shark = sharks[i];

    if (shark[3] === 1 || shark[3] === 2) {
      sharks[i] = moveVertical(shark);
    } else {
      sharks[i] = moveHorizontal(shark);
    }

    const [new_r, new_c] = sharks[i];

    if (sea[new_r][new_c] !== '~') {
      // eat
      const cur_number = sea[new_r][new_c];
      
      if (sharks[cur_number][4] < shark[4]) {
        sea[new_r][new_c] = i;
        sharks[cur_number] = null;
      } else {
        sharks[i] = null;
      }
    }
    else sea[new_r][new_c] = i;
  }

  function moveVertical (shark) {
    let [r, c, s, d, w] = shark;
    let leftMove = s;

    while (leftMove !== 0) {
      if (d === 2) {
        if (r + leftMove <= R) {
          r += leftMove;
          leftMove = 0;
        } else {
          leftMove -= (R - r);
          r = R;
          d = 1;
        }
      }
      else {
        if (1 <= r - leftMove) {
          r -= leftMove;
          leftMove = 0;
        } else {
          leftMove -= (r - 1);
          r = 1;
          d = 2;
        }
      }
    }
    return [r, c, s, d, w];
  }

  function moveHorizontal(shark) {
    let [r, c, s, d, w] = shark;
    let leftMove = s;

    while (leftMove !== 0) {
      if (d === 3) {
        if (c + leftMove <= C) {
          c += leftMove;
          leftMove = 0;
        } else {
          leftMove -= (C - c);
          c = C;
          d = 4;
        }
      }
      else {
        if (1 <= c - leftMove) {
          c -= leftMove;
          leftMove = 0;
        } else {
          leftMove -= (c- 1);
          c = 1;
          d = 3;
        }
      }
    }
    return [r, c, s, d, w];
  }
}

function print () {
  console.log(sea.map((e) => e.join(' ')).join('\n'))
}
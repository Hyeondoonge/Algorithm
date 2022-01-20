// 처음에 

const rotateArray = (arr, dir) => {
  const newArray = [];
  if (dir === 1) {
    for(let i = 0; i < 7; i++) {
      newArray[i + 1] = arr[i];
    }  
    newArray[0] = arr[7];
    return newArray;
  }
  for(let i = 1; i <= 7; i++) {
    newArray[i - 1] = arr[i];
  }  
  newArray[7] = arr[0];
  return newArray;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const tire = [[]];
for(let i = 0; i < 4; i++) {
  tire.push(Array.from(input[i], (e) => parseInt(e)));
}

const k = parseInt(input[4]);

for(let i = 0 ; i < k; i++) {
  const [tire_idx, dir] = input[5 + i].split(' ').map((e) => parseInt(e));
  const rotation_dir = [0, 0, 0, 0, 0];
  const checked = [0, 0, 0, 0, 0];
  rotation_dir[tire_idx] = dir;
  checked[tire_idx] = true; 

  const rotate = (cur_tire_idx) => {
    if (rotation_dir[cur_tire_idx] === 0) return;
    const opps_dir = rotation_dir[cur_tire_idx] === 1 ? -1 : 1;

    if (cur_tire_idx === 1) {
      if (!checked[2] && tire[1][2] !== tire[2][6]) {
        checked[2] = true; 
        rotation_dir[2] = opps_dir;
        rotate(2);
      }
    } else if (cur_tire_idx === 2) {
      if (!checked[1] && tire[1][2] !== tire[2][6]) {
        checked[1] = true; 
        rotation_dir[1] = opps_dir;
        rotate(1);
      }
      if (!checked[3] &&tire[2][2] !== tire[3][6]) {
        checked[3] = true; 
        rotation_dir[3] = opps_dir;
        rotate(3);
      }
    } else if (cur_tire_idx === 3) {
      if (!checked[2] && tire[2][2] !== tire[3][6]) {
        checked[2] = true; 
        rotation_dir[2] = opps_dir;
        rotate(2);
      }
      if (!checked[4] && tire[3][2] !== tire[4][6]) {
        checked[4] = true; 
        rotation_dir[4] = opps_dir;
        rotate(4);
      }
    } else {
      if (!checked[3] && tire[3][2] !== tire[4][6]) {
        checked[3] = true; 
        rotation_dir[3] = opps_dir;
        rotate(3);
      }
    }
  }

  rotate(tire_idx);

  for(let i = 1; i <= 4; i++) {
    // 회전
    if (rotation_dir[i] === 0) continue;
    tire[i] = rotateArray(tire[i], rotation_dir[i]);
  }
}

let answer = 0;

for(let i = 1; i <= 4; i++) {
  if (tire[i][0] === 1) answer += Math.pow(2, i - 1);
}

console.log(answer);
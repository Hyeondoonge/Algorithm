const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);

const permArr = [];

let answer = '';

const perm = (d) => {
  if (d === n) {
    console.log(answer);
    process.exit(0);
  }

  for(let i = 1; i <= 3; i++) {
    permArr.push(i);
    if (!isGoodPerm()) {
      permArr.pop();
      continue;
    }
    answer = permArr.join('');
    perm(d + 1);
    permArr.pop();
  }
};

const isGoodPerm = () => {
  const { length } = permArr;

  for(let i = 1; i <= length / 2; i++) { // 크기
    for(let j = 0; j < length; j++) {
      if (j + i > length || j + 2 * i > length) continue;
      if (permArr.slice(j, j + i).join('') === permArr.slice(j + i, j + 2 * i).join('')) return false;
    }
  }
  return true;
}

perm(0);
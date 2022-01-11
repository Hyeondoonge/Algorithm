const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, s] = input[0].split(' ').map((e) => parseInt(e));
const numbers = input[1].split(' ').map((e) => parseInt(e));

let answer = 0;

const flag = new Array(n).fill(false);

const comb = (index, sum) => {
  if (index === n) {
    if (sum === s && flag.some((v) => v)) answer += 1;
    return;
  }

  flag[index] = true;
  comb(index + 1, sum + numbers[index]);
  flag[index] = false;
  comb(index + 1, sum);
};

comb(0, 0);

console.log(answer);
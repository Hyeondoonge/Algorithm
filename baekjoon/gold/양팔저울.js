const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const weights = input[1].split(' ').map((w) => parseInt(w));
const n = weights.reduce((acc, w) => acc + w);

const isSelected = new Array(weights.length).fill(false);

const answer = new Array(n + 1).fill(false);

const rightComb = (index, d, weight) => {
  if (d > 0) { // 1개 이상 선택되었을 때
    leftComb(0, 0, weight, 0);
  }

  for(let i = index; i < weights.length; i++) {
    isSelected[i] = true;
    rightComb(i + 1, d + 1, weight + weights[i]);
    isSelected[i] = false;
  }
};

const leftComb = (index, d, rightWeight, weight) => {
  const x = Math.abs(rightWeight - weight);
  if (x <= n) {
    answer[x] = true;
  }

  for(let i = index; i < weights.length; i++) {
    if (isSelected[i]) continue;
    leftComb(i + 1, d + 1, rightWeight, weight + weights[i]);
  }
};

rightComb(0, 0, 0);

let count = 0;

answer.shift();
answer.forEach((v) => {
  if (!v) count += 1;
});

console.log(count);
// console.log(answer.reduce((acc, res) => !res ? acc + 1 : acc, 0) - 1);
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const tc = parseInt(input[0]);
let n = 0;

for(let i = 0; i < tc; i++) {
  n += 1;
  let m = parseInt(input[n]);

  const scores = []

  for(let j = 0; j < m; j++) {
    n += 1;
    const [a, b] = input[n].split(' ').map((e) => parseInt(e));
    scores.push({a, b});
  }

  scores.sort((a, b) => a.a - b.a);

  let min = scores[0].b, answer = 1;

  for(let i = 1; i < scores.length; i++) {
    if (min > scores[i].b) {
      answer += 1;
      min = scores[i].b;
    }
  }
  console.log(answer);
}

// 0: 비교 x / 1: yes -1: no

// const solution = () => {
//   while () {

//   }
// };
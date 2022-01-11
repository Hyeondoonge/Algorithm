const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);

const arr = [];

for(let i = 0; i < n; i++) {
  const [s, e] = input[i +1].split(' ').map((e) => parseInt(e));
  arr.push({s, e});
}

arr.sort((a, b) => {
  if (a.e < b.e) return -1;
  else if (a.e > b.e) return 1;
  else return a.s - b.s;
});

let e = 0, answer = 0;  

for(let i = 0; i < n; i++) {
  if (e <= arr[i].s) {
    e = arr[i].e;
    answer += 1;
  }
}

console.log(answer);

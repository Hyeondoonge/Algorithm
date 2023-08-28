const fs = require('fs');
const [N, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let maxDay = 0;
const assignment_info = [];
for(const assignment of input) {
  const [d, w] = assignment.split(' ').map((e) => Number(e));
  assignment_info.push({ d, w });
  maxDay = Math.max(maxDay, d);
}

assignment_info.sort((a, b) => {
  if (a.w > b.w) return -1;
  else if (a.w < b.w) return 1;
  else return 0;
})

const schedule = new Array(maxDay + 1).fill(0); 

for(const { d, w } of assignment_info) {
  scheduling(d, w);
}

console.log(schedule.reduce((prev, cur) => prev + cur));

function scheduling (d, w) {
  for(let i = d; i > 0; i--) {
    if (schedule[i] === 0) {
      schedule[i] = w;
      break;
    } 
  }
}
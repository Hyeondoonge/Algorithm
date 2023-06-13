function solution() {
  const D = 365;
  const calendar = Array.from({ length: N }, () => Array.from({ length: D + 1 }, () => 0));

  jobs.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    return b[1] - b[0] - (a[1] - a[0]);
  });

  for (let i = 0; i < N; i++) {
    let [s, e] = jobs[i];

    for (let j = 0; j < N; j++) {
      if (calendar[j][s] === 1) continue;
      mark(j, s, e);
      break;
    }
  }

  let answer = 0;

  let width = 0,
    height = 0;

  for (let j = 1; j <= D; j++) {
    let job = false;

    for (let i = N - 1; i >= 0; i--) {
      if (calendar[i][j] === 1) {
        job = true;
        width++;
        height = Math.max(height, i + 1);
        break;
      }
    }

    if (!job) {
      answer += width * height;
      width = 0;
      height = 0;
    }

    if (job && j === D) {
      answer += width * height;
    }
  }

  return answer;

  function mark(n, s, e) {
    for (let i = s; i <= e; i++) {
      calendar[n][i] = 1;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const jobs = input.slice(1).map((job) => job.split(' ').map(Number));

console.log(solution(N, jobs));

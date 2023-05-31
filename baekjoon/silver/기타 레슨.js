function solution(N, M, courses) {
  return findOptimalSize();

  function findOptimalSize() {
    let s = 0;
    e = courses.reduce((acc, cur) => acc + cur);

    while (s + 1 < e) {
      const m = Math.floor((s + e) / 2);

      if (isValidSize(m)) {
        e = m;
      } else {
        s = m;
      }
    }

    return e;
  }

  function isValidSize(size) {
    let cnt = 1;
    let sum = 0;

    for (const course of courses) {
      if (size < course) {
        return false;
      }

      if (sum + course <= size) {
        sum += course;
      } else {
        sum = course;
        cnt++;
      }
    }

    return cnt <= M ? true : false;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const courses = input[1].split(' ').map(Number);

console.log(solution(N, M, courses));

function solution(N) {
  let answer = [Infinity, -Infinity];
  const visitied = {};
  dfs(N, 0);

  return `${answer[0]} ${answer[1]}`;

  function dfs(num, cnt) {
    let temp = num;

    let p = Math.pow(10, 8);

    while (temp !== 0) {
      const n = Math.floor(temp / p);
      temp = temp % p;
      p /= 10;
      cnt += n % 2 ? 1 : 0;
    }
    if (visitied[num] && visitied[num] === cnt) return;
    visitied[num] = cnt;

    if (num < 10) {
      answer[0] = Math.min(answer[0], cnt);
      answer[1] = Math.max(answer[1], cnt);

      return;
    } else if (num < 100) {
      const n1 = Math.floor(num / 10);
      const n2 = num % 10;

      dfs(n1 + n2, cnt);
    } else {
      for (let i = String(num).length - 1; i >= 2; i--) {
        for (let j = i - 1; j >= 1; j--) {
          const n1 = calc(num, String(num).length - 1, i);
          const n2 = calc(num, i - 1, j);
          const n3 = calc(num, j - 1, 0);

          dfs(n1 + n2 + n3, cnt);
        }
      }
    }
  }

  function calc(num, i, j) {
    let result = 0;
    let k = Math.pow(10, i);
    let m = Math.pow(10, i - j);

    num = num % (k * 10);

    while (k !== Math.pow(10, j - 1)) {
      result += Math.floor(num / k) * m;
      num = num % k;
      m /= 10;
      k /= 10;
    }

    return result;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);

console.log(solution(N));

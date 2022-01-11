const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, k] = input[0].split(' ').map((e) => parseInt(e));

const visitied = new Array(100000).fill(false);

function play () {
  const q = [];
  visitied[n] = true;
  q.push({ n, d: 0 })
  
  while (q.length) {
    const { n, d } = q.shift();

    if (n === k) {
      return d;
    }

    if (n - 1 >= 0 && !visitied[n - 1]) {
      visitied[n - 1] = true;
      q.push({ n: n - 1, d: d + 1 });
    }
    if (n + 1 <= 100000 && !visitied[n + 1]) {
      visitied[n + 1] = true;
      q.push({ n: n + 1, d: d + 1 });
    }
    if (2 * n <= 100000 && !visitied[2 * n]) {
      visitied[2 * n] = true;
      q.push({ n: 2 * n, d: d + 1 });
    }
  }
}

console.log(play());
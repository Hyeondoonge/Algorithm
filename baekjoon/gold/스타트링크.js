const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [f, s, g, u, d] = input[0].split(' ').map((e) => parseInt(e));

const visitied = new Array(f + 1).fill(false);

let answer = Infinity;

const q = [];
visitied[s] = true;
q.push([s, 0]);

// 최단 경로 -> BFS

// DFS 쓸 시, BFS보다 시간 측면에서 비효율적이며 스택 크기도 투 머치해진다.

while (q.length) {
  const [cur, depth] = q.shift();

  if (cur === g) {
    answer = depth;
    break;
  }

  if (cur + u <= f && !visitied[cur + u]) {
    visitied[cur + u] = true;
    q.push([cur + u, depth + 1]);
  }
  if (cur - d >= 1 && !visitied[cur - d]) {
    visitied[cur - d] = true;
    q.push([cur - d, depth + 1]);
  }
}

if (visitied[g]) console.log(answer);
else console.log('use the stairs');
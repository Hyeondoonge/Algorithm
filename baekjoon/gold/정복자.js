const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M, T] = input[0].split(' ').map((e) => Number(e));
const edges_info = [];

for(let i = 0; i < M; i++) {
  const [u, v, w] = input[i + 1].split(' ').map((e) => Number(e));
  edges_info.push({ u, v, w });
}

edges_info.sort((a, b) => a.w - b.w);

const parent = Array.from(new Array(N + 1), (_, index) => index);

let t = 0;
let idx = 0;
let edges = 0;
let answer = 0;

while (edges !== N - 1) {
  const { u, v, w } = edges_info[idx++];

  const parent_u = find(u), parent_v = find(v);

  if (parent_u === parent_v) continue;

  union(parent_u, parent_v);
  edges++;
  answer += (w + t);
  t += T;
}

console.log(answer);

function find(u) {
  if (parent[u] === u) return u;
  return parent[u] = find(parent[u]);
}

function union (u, v) {
  parent[u] = v;
}
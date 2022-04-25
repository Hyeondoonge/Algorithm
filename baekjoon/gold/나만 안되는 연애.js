const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input[0].split(' ').map((e) => Number(e));

const schools_info = input[1].split(' ');
const edges_info = [];
const parent = Array.from(new Array(N), (_, index) => index);

for(let i = 0; i < M; i++) {
  // 정보 넣기
  const [u, v, c] = input[i + 2].split(' ').map((e) => Number(e));

  if (schools_info[u - 1] === schools_info[v - 1]) continue; // 동일한 성별의 학교
  edges_info.push({ u, v ,c });
}
// sort
edges_info.sort((a, b) => a.c - b.c);

let edges = 0;
let idx = 0;
let answer = -1;
let totalCost = 0;

while (idx < edges_info.length) {
  const { u, v, c } = edges_info[idx++];

  const parent_u = find(u), parent_v = find(v);

  if (parent_u === parent_v) continue;
  union(parent_u, parent_v);
  edges++;
  totalCost += c;

  if (edges === N - 1) {
    answer = totalCost;
    break;
  }
}

console.log(answer);

function find (u) {
  if (parent[u] === u) return u;
  return parent[u] = find(parent[u]);
}

function union (u, v) {
  parent[u] = v;
}


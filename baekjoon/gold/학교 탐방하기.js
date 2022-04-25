const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input[0].split(' ').map((e) => parseInt(e));
const edges_info = [];

for(let i = 0; i <= M; i++) {
  const [u, v, w] = input[i + 1].split(' ').map((e) => parseInt(e));
  edges_info.push({ u, v, w });
}

let parent = Array.from(new Array(N + 1), (_, index) => index);
edges_info.sort((a, b) => a.w - b.w);

parent = parent.map((_, index) => index);

const higherFatigue = getHigherFatigue();
parent = parent.map((_, index) => index); // 초기화
const lowerFatigue = getLowerFatigue();

console.log(higherFatigue - lowerFatigue);

function getLowerFatigue () {
  let idx = edges_info.length - 1;
  let edges = 0;
  let fatigue = 0;

  while (edges !== N) {
    const { u, v, w } = edges_info[idx--];

    const parent_u = find(u), parent_v = find(v);

    if (parent_u === parent_v) continue;
    union(parent_u, parent_v);
    edges++;
    if (w === 0) fatigue++;
  }

  return Math.pow(fatigue, 2);
}

function getHigherFatigue () {
  let idx = 0;
  let edges = 0;
  let fatigue = 0;

  while (edges !== N) {
    const { u, v, w } = edges_info[idx++];

    const parent_u = find(u), parent_v = find(v);

    if (parent_u === parent_v) continue;
    union(parent_u, parent_v);
    edges++;
    if (w === 0) fatigue++;
  }

  return Math.pow(fatigue, 2);
}

function find (u) {
  if (parent[u] === u) return u;
  return parent[u] = find(parent[u]);
}

function union (u, v) {
  parent[u] = v;
}
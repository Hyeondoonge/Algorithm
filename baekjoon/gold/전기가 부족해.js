const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M, K] = input[0].split(' ').map((e) => Number(e));
const plants = input[1].split(' ').map((e) => Number(e));
const isPlant = Array.from(new Array(N + 1), (_, index) => plants.includes(index));

const cables_info = [];

for(let i = 0; i < M; i++) {
  const [u, v, w] = input[i + 2].split(' ').map((e) => Number(e));
  cables_info.push({ u, v, w });
}

cables_info.sort((a, b) => a.w - b.w);

const parent = Array.from(new Array(N + 1), (_, index) => index);

let idx = 0;
let answer = 0;

while (!allProvidedEnergy()) {
  const { u, v, w } = cables_info[idx++];

  const parent_u = find(u), parent_v = find(v);

  if (parent_u === parent_v) continue;
  if (isPlant[parent_u] && isPlant[parent_v]) continue;
  if (isPlant[parent_u]) {
    union(parent_v, parent_u);
  } else if (isPlant[parent_v])  {
    union(parent_u, parent_v);
  } else {
    union(parent_u, parent_v);
  }
  answer += w;
}

console.log(answer);

function find (u) {
  if (parent[u] === u) return u;
  return parent[u] = find(parent[u]);
}

function union (u, v) {
  parent[u] = v;
}

function allProvidedEnergy () {
  let exit = true;
  
  for(let i = 1; i <= N; i++) {
    if (isPlant[i]) continue;
    const p = parent[i];

    if (!isPlant[p]) {
      exit = false;
      break;
    }
  }

  return exit;
}
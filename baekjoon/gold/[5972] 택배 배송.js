// 분류: 다익스트라
// 풀이시간: 1:02~2:30

// 현서 -> 찬홍
// 모든 소들에게 여물 주기, 최소한의 소만 만나기
// N개의 헛간, M개의 소들의 길 (양방향), 각 길에 C_i마리의 소
// 떨어진 헛간인 A_i, B_i를 소들의 길을 통해 이어짐
// 두 헛간은 하나 이상의 길로 연결되어있을 수도 있음
// 현서: 1, 찬홍: N

// input
// N(1~50,000) M(1~50,000)
// A_i, B_i, C_i (0~1,000)

// output
// 최소여물

function solution(N, edges) {
  const costs = Array(N + 1).fill(Infinity);
  const adjList = Array.from({ length: N + 1 }, () => []);

  edges.forEach(([u, v, c]) => {
    adjList[u].push([v, c]);
    adjList[v].push([u, c]);
  });

  const { push, pop, getSize } = PriortiyQueue((a, b) => a[1] < b[1]);

  push([1, 0]); // 정점, 비용

  while (getSize()) {
    const [v, cost] = pop();

    if (costs[v] === Infinity) {
      costs[v] = cost;
    } else {
      continue;
    }

    if (v === N) {
      break;
    }

    for (const [u, c] of adjList[v]) {
      push([u, cost + c]);
    }
  }
  return costs[N];
}

function PriortiyQueue(isHigher = (a, b) => a < b) {
  const arr = [];
  let size = 0;

  function push(element) {
    arr[++size] = element;
    upheap(size);
  }
  function pop() {
    const temp = arr[1];
    arr[1] = arr[size--];
    downheap(1);
    return temp;
  }
  function upheap(i) {
    while (1 < i) {
      const p = Math.floor(i / 2);
      if (isHigher(arr[p], arr[i])) break;
      [arr[p], arr[i]] = [arr[i], arr[p]];
      i = p;
    }
  }
  function downheap(i) {
    while (2 * i <= size) {
      let c = 2 * i;
      if (c + 1 <= size && !isHigher(arr[c], arr[c + 1])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[i], arr[c]] = [arr[c], arr[i]];
      i = c;
    }
  }
  function getSize() {
    return size;
  }
  return {
    push,
    pop,
    getSize,
  };
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const edges = input.slice(1, 1 + M).map((row) => row.split(" ").flatMap(Number));

console.log(solution(N, edges));

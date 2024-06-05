// Dkm 길이의 고속도로
// 지름길, 일방통행 (역주행 불가능)
// 운전해야 하는 최소 거리

// input
// N 지름길 개수 (1~12) D 고속도로 길이 (1~10,000)
// S D L 지름길의 시작위치, 도착위치, 길이 (0~10,000, S < E)

// output
// 최소 운전 거리

function solution(N, D, shortcuts) {
  const MAX = 10000;
  const costs = Array.from({ length: MAX + 1 }, () => ({}));

  for (let i = 0; i < MAX; i++) {
    // 일방통행 비용
    costs[i][i + 1] = 1;
  }

  for (const [s, e, c] of shortcuts) {
    costs[s][e] = costs[s][e] === undefined ? c : Math.min(costs[s][e], c);
  }

  const minCost = Array.from({ length: MAX + 1 }, () => Infinity);

  // 최소 경로 구하기
  const q = PriorityQueue((a, b) => a[1] < b[1]);
  minCost[0] = 0;
  q.push([0, 0]); // 정점과 비용

  while (q.size()) {
    const [cur, cost] = q.pop();

    if (cur === D) {
      break;
    }

    for (const adjVertex in costs[cur]) {
      const newCost = cost + costs[cur][adjVertex];
      if (newCost < minCost[adjVertex]) {
        minCost[adjVertex] = newCost;
        q.push([adjVertex, newCost]);
      }
    }
  }
  return minCost[D];
}

function PriorityQueue(isHigher = (a, b) => a < b) {
  const arr = [];
  let n = 0;

  const size = () => n;

  const push = (item) => {
    arr[++n] = item;
    upheap(n);
  };

  const pop = () => {
    const top = arr[1];
    arr[1] = arr[n--];
    downheap(1);
    return top;
  };

  const upheap = (i) => {
    while (1 < i) {
      const p = Math.floor(i / 2);
      if (isHigher(arr[p], arr[i])) break;
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    }
  };

  const downheap = (i) => {
    while (i * 2 <= n) {
      let c = i * 2;
      if (c + 1 <= n && !isHigher(arr[c], arr[c + 1])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[i], arr[c]] = [arr[c], arr[i]];
      i = c;
    }
  };

  return {
    size,
    push,
    pop,
  };
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, D] = input[0].split(" ").map(Number);
const shortcuts = input.slice(1).map((v) => v.split(" ").map(Number));

console.log(solution(N, D, shortcuts));

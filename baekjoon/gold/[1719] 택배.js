// 분류: 다익스트라
// 풀이시간: 12:01~12:46

// 택배 집하장
// 양방향 간선, 가중치=> 이동 시간
// 경로표: 최단경로로 이동하기위해 가장 먼저 겨쳐야하는 집하장

// input
// n 집하장 수 (1~200) m 경로의 개수 (1~10,000)
// edges[i] u(1~1,000) v(1~1,000) cost(1~1,000)

// output
// -1 or 가장 먼저 거치는 집하장

function PriorityQueue(isHigher) {
  const arr = [];
  let N = 0;
  function push(element) {
    arr[++N] = element;
    upheap(N);
  }
  function pop() {
    const temp = arr[1];
    arr[1] = arr[N--];
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
    while (2 * i <= N) {
      let c = 2 * i;
      if (c + 1 <= N && isHigher(arr[c + 1], arr[c])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[c], arr[i]] = [arr[i], arr[c]];
      i = c;
    }
  }
  function getSize() {
    return N;
  }
  return {
    push,
    pop,
    getSize,
  };
}

function solution(N, M, edges) {
  const adjList = Array.from({ length: N + 1 }, () => []);

  edges.forEach(([u, v, c]) => {
    adjList[u].push([v, c]);
    adjList[v].push([u, c]);
  });

  // 각 정점에 대한 다익스트라 수행
  let answer = "";

  for (let i = 1; i <= N; i++) {
    answer += dijkstra(i) + "\n";
  }

  return answer;

  function dijkstra(start) {
    const { push, pop, getSize } = PriorityQueue((a, b) => a[2] < b[2]);
    const costs = Array.from({ length: N + 1 }, () => Infinity);
    const starts = Array.from({ length: N + 1 }, () => -1);

    for (const [u, c] of adjList[start]) {
      push([u, u, c]);
    }

    // start의 주변 정점들 넣기
    while (getSize()) {
      const [v, start, cost] = pop();

      if (costs[v] === Infinity) {
        costs[v] = cost;
        starts[v] = start;
      } else {
        continue;
      }

      for (const [u, c] of adjList[v]) {
        push([u, start, cost + c]);
      }
    }

    return starts
      .slice(1)
      .map((value, index) => (index + 1 === start ? "-" : value))
      .join(" ");
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const edges = input.slice(1, 1 + M).map((row) => row.split(" ").map(Number));

console.log(solution(N, M, edges));

// 분류: 다익스트라
// 풀이시간: 3:50~4:19

// 무방향 그래프. 1->N번으로 최단 거리로 이동
// 임의로 주어진 정점들은 반드시 통과
// 정점, 간선 반복 이동 가능

// input
// N 정점 개수 (2~800) E 간선 개수(0~200,000)
// edges[i] a b c => a와 b사이 양방향 간선이고 거리 c (1~1,000)
// targets[i] v1 v2 => v1 !== v2, v1 != N, v2 != 1

// u, v사이 간선이 0~1개 존재

// output
// 두 정점을 지나는 최단 경로 or -1 (경로 없을 때)

function PriorityQueue(isHigher) {
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
  function getSize() {
    return size;
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
      let c = i * 2;
      if (c + 1 <= size && isHigher(arr[c + 1], arr[c])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[c], arr[i]] = [arr[i], arr[c]];
      i = c;
    }
  }
  return { push, pop, getSize };
}

function solution(N, edges, v1, v2) {
  const adjList = Array.from({ length: N + 1 }, () => []);

  edges.forEach(([u, v, c]) => {
    adjList[u].push([v, c]);
    adjList[v].push([u, c]);
  });

  const from1 = dijkstra(1, [v1, v2]);
  const fromV1 = dijkstra(v1, [v2, N]);
  const fromV2 = dijkstra(v2, [N, v1]);

  const answer = Math.min(from1[0] + fromV1[0] + fromV2[0], from1[1] + fromV1[1] + fromV2[1]);

  return answer === Infinity ? -1 : answer;

  function dijkstra(start, endList) {
    const costs = Array.from({ length: N + 1 }, () => Infinity);
    const { push, pop, getSize } = PriorityQueue((a, b) => a[1] < b[1]);

    push([start, 0]);

    while (getSize()) {
      const [v, cost] = pop();

      if (costs[v] === Infinity) {
        costs[v] = cost;
      } else {
        continue;
      }

      if (endList.every((end) => costs[end] !== Infinity)) {
        break;
      }

      for (const [u, c] of adjList[v]) {
        push([u, cost + c]);
      }
    }

    // 최소비용
    return endList.map((end) => costs[end]);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, E] = input[0].split(" ").map(Number);
const edges = input.slice(1, 1 + E).map((row) => row.split(" ").map(Number));
const [v1, v2] = input[1 + E].split(" ").map(Number);

console.log(solution(N, edges, v1, v2));

import { PriorityQueue } from "./PriorityQueue";

// 다익스트라 예제
// 정점의 개수가 N이고 시작지점이 1인 상황에서, 각 정점까지의 최단 경로 구하기

const N = 100;
const adjList = Array.from({ length: N }, () => []);
const costs = Array.from({ length: N }, () => Infinity);

const { push, pop, getSize } = new PriorityQueue((a, b) => a[1] < b[1]);
// 정점, 비용
push([1, 0]);

while (!getSize()) {
  const [v, cost] = pop();

  if (costs[v] === Infinity) {
    costs[v] = cost;
  } else {
    continue;
  }

  for (const [u, c] of adjList[v]) {
    push([u, c]);
  }
}

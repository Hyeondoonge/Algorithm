// 분류: 다익스트라
// 풀이시간: 1;42~2:18

// N개의 컴퓨터로 구성된 네트워크
// 서로 다른 두 컴퓨터 간의 통신이 가능 => 직접 연결된 회선, 다른 컴퓨터를 거쳐 연결된 회선

// 회선의 성능

// 보안 시스템 -> 한 대의 슈퍼컴퓨터 설치
// 공격받으면 네트워크 통해 슈퍼컴퓨터에 전달되고, 네트워크 통해 보안 패킷을 응답

// 1. 최소 개수의 회선만을 복구, 서로 다른 투 컴퓨터 간 통신이 가능해야함
// 2. 슈퍼컴퓨터가 다른 컴퓨터와 통신하는데 걸리는 최소 시간이 원래의 네트워크에서 통신하는데 걸리는 최소 시간보다 커지면 안됨 (??)

// input
// N 컴퓨터 수 (1~1,000) M 회선의 수
// edges[i] A computer1 B computer2 C 통신시간(1~10)

// 1은 슈퍼컴퓨터, 양방향, 컴퓨터 번호 1~N

// output
// K 복구할 회선의 개수
// v[1] v[2] 복구한 회선

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
    upheap,
    downheap,
    getSize,
  };
}

function solution(N, edges) {
  // 각 컴퓨터 인접 정점들 및 비용
  const adjList = Array.from({ length: N + 1 }, () => new Map());
  edges.forEach(([u, v, c]) => {
    adjList[u].set(v, c);
    adjList[v].set(u, c);
  });

  // costs 갱신할 때, prev함께 갱신한다.
  const prev = dijkstra();
  let answer = "";

  for (let i = 2; i <= N; i++) {
    answer += prev[i] + " " + i + "\n";
  }

  return N - 1 + "\n" + answer;

  function dijkstra() {
    // 이전 정점 함께 기록
    const { push, pop, getSize } = PriorityQueue((a, b) => a[1] < b[1]); // isHigher
    const costs = Array.from({ length: N + 1 }, () => Infinity);
    const prev = Array.from({ length: N + 1 }, () => 0);

    costs[1] = 0;
    prev[1] = 1;
    push([1, 0]);

    while (getSize()) {
      // 정점, 비용
      const [v, cost] = pop();

      for (const [u, c] of adjList[v]) {
        if (costs[u] < cost + c) continue;
        costs[u] = cost + c;
        prev[u] = v;
        push([u, cost + c]);
      }
    }
    return prev;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const edges = input.slice(1, 1 + M).map((row) => row.split(" ").map(Number));

console.log(solution(N, edges));

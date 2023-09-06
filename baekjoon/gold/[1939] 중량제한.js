// 분류: 다익스트라
// 1차 풀이시간: 3:23~4:01 => 시간초과
// 2차 풀이시간: 4:05~4:37 => 시간초과
// 3차 풀이시간: 4:55~5:07 => 틀렸습니다

// N개의 섬, 섬 사이에는 다리가 설치되어 있어 차들이 다님
// *두 개의 섬*에 공장을 세우고 물품을 생산
// 중량제한 *초과*하는 양의 물품이 지나면 다리가 무너짐

// 한 번의 이동에 옮길 수 있는 물품 중량의 최대값

// input
// N 섬의 개수(2~10,000) M 다리 정보 (1~100,000)
// A 섬 B 섬 C 중량제한 (1~1,000,000,000)
// ...
// A B 공장이 위치한 섬 (서로 다름))

// 섬 사이에 여러 개의 다리가 있을 수 있음. 모두 양방향암

// output
// 최대 중량

function PriorityQueue(isHigher = (a, b) => a < b) {
  let arr = [];
  let size = 0;

  const push = (element) => {
    arr[++size] = element;
    upheap(size);
  };

  const pop = () => {
    const top = arr[1];
    arr[1] = arr[size];
    size--;
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
    while (2 * i <= size) {
      let c = 2 * i;
      if (c + 1 <= size && isHigher(arr[c + 1], arr[c])) c++;
      if (!isHigher(arr[c], arr[i])) break;
      [arr[c], arr[i]] = [arr[i], arr[c]];
      i = c;
    }
  };

  const getSize = () => size;

  return {
    push,
    pop,
    upheap,
    downheap,
    getSize,
  };
}

function solution(N, M, bridges, A, B) {
  const adjList = Array.from({ length: N + 1 }, () => ({}));

  // 최대 저장되는 다리정보는 N - 1개.
  bridges.forEach(([u, v, c]) => {
    if (!adjList[u][v] || adjList[u][v] < c) {
      adjList[u][v] = c;
    }
    if (!adjList[v][u] || adjList[v][u] < c) {
      adjList[v][u] = c;
    }
  });

  // 최대 중량제한만 필요로한다.
  // A => B경로. 최소
  const { push, pop, getSize } = PriorityQueue((a, b) => {
    if (a[1] > b[1]) return true;
    return false;
  });
  const minC = Array.from({ length: N + 1 }, () => Infinity);

  minC[A] = 0;
  // 1000000000
  push([A, 1000000001]); // 다시 방문하지 않도록
  // 현재정점, 중량제한

  while (getSize()) {
    const [u, c] = pop();

    if (u == B) break;

    for (const v in adjList[u]) {
      const newMinC = Math.min(c, adjList[u][v]);
      if (minC[v] === Infinity || minC[v] < newMinC) {
        minC[v] = newMinC;
        push([v, minC[v]]);
      }
    }
  }

  return minC[B];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const bridges = input.slice(1, M + 1).map((row) => row.split(" ").map(Number));
const [A, B] = input[M + 1].split(" ").map(Number);

console.log(solution(N, M, bridges, A, B));

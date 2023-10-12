// 분류: 다익스트라
// 풀이시간: 9:00~10:5

// W X H 크기의 지도
// 빈 칸, 벽
// 'C' 두 칸을 레이저로 통신하기 위해 설치해야하는 거울 개수 최소값 => 레이저로 연결가능해야함

// C에서만 레이저 발사 => 출발점.
// 빈 칸에 거울 설치 / or \ => 90도 방향 회전

// input
// W(1~100) H (1~100)
// map[i][j] (., *, C)

// output
// 최소 거울 개수. 항상 답이 있음.

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
  function upheap(i) {
    while (1 < i) {
      const p = Math.floor(i / 2);
      if (isHigher(arr[p], arr[i])) break;
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    }
  }
  function downheap(i) {
    while (2 * i <= size) {
      let c = 2 * i;
      if (c + 1 <= size && isHigher(arr[c + 1], arr[c])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[i], arr[c]] = [arr[c], arr[i]];
      i = c;
    }
  }
  function getSize() {
    return size;
  }
  return { push, pop, getSize };
}

function solution(W, H, map) {
  let start;
  let end;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] !== "C") continue;
      if (!start) {
        start = [i, j];
      } else {
        end = [i, j];
      }
    }
  }

  return dijkstra(start, end);

  function dijkstra(start, end) {
    // queue 항목 구조 [r, c, d, cost]
    const { push, pop, getSize } = PriorityQueue((a, b) => a[3] < b[3]); // isHigher
    const costs = Array.from({ length: H }, () => Array.from({ length: W }, () => [Infinity, Infinity, Infinity, Infinity]));

    push([...start, 0, 0]);
    push([...start, 1, 0]);
    push([...start, 2, 0]);
    push([...start, 3, 0]);

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    // 꺽는 방향일 때 cost + 1
    while (getSize()) {
      const [r, c, d, cost] = pop();

      if (costs[r][c][d] === Infinity) {
        costs[r][c][d] = cost;
      } else {
        continue;
      }

      if (r === end[0] && c === end[1]) {
        break;
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || H <= nr || nc < 0 || W <= nc) continue;
        if (map[nr][nc] === "*") continue; // 벽 pass

        if (k === d) {
          // 동일한 방향
          push([nr, nc, k, cost]);
        } else {
          push([nr, nc, k, cost + 1]);
        }
      }
    }

    return Math.min(...costs[end[0]][end[1]]);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [W, H] = input[0].split(" ").map(Number);
const map = input.slice(1);

console.log(solution(W, H, map));

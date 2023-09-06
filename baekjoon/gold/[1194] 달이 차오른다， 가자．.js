class Queue {
  head;
  tail;
  size;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    }

    if (this.tail) {
      this.tail.ref = node;
    }
    this.tail = node;
    this.size++;
  }

  pop() {
    const head = this.head;

    this.head = this.head.ref;
    this.size--;

    if (this.size === 0) {
      this.tail = null;
    }

    return head.data; // 예전 head
  }

  getSize() {
    return this.size;
  }
}

class Node {
  ref;
  data;

  constructor(data) {
    this.data = data;
    this.ref = null;
  }
}

function solution(N, M, map) {
  let r, c;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === '0') {
        (r = i), (c = j);
        map[i][j] = '.';
      }
    }
  }

  let answer = BFS(r, c);

  return answer === Infinity ? -1 : answer;

  function BFS(r, c) {
    const visitied = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => Array.from({ length: 64 }, () => false))
    );

    const q = new Queue();
    visitied[r][c][0] = true;
    q.push({ r, c, key: 1000000, d: 0 });

    while (q.getSize()) {
      const { r, c, key, d, u } = q.pop();

      const dec = transferKeyToDecimal(key);

      if (map[r][c] === '1') {
        return d;
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;

        if (visitied[nr][nc][dec] || map[nr][nc] === '#') continue;
        if ('a' <= map[nr][nc] && map[nr][nc] <= 'z') {
          const m = 5 - (map[nr][nc].charCodeAt(0) - 97);
          let r = key % Math.pow(10, m + 1);

          let new_key = key;

          if (r < Math.pow(10, m)) {
            new_key += Math.pow(10, m);
          }
          visitied[nr][nc][dec] = true;
          q.push({ r: nr, c: nc, key: new_key, d: d + 1 });
        } else if ('A' <= map[nr][nc] && map[nr][nc] <= 'Z') {
          // door
          const m = 5 - (map[nr][nc].charCodeAt(0) - 65);

          let r = key % Math.pow(10, m + 1);

          if (r < Math.pow(10, m)) continue;
          visitied[nr][nc][dec] = true;
          q.push({ r: nr, c: nc, key, d: d + 1 });
        } else {
          visitied[nr][nc][dec] = true;
          q.push({ r: nr, c: nc, key, d: d + 1 });
        }
      }
    }
    return Infinity;
  }

  function transferKeyToDecimal(key) {
    return parseInt(key % 1000000, 2);
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((row) => Array.from(row));

console.log(solution(N, M, map));

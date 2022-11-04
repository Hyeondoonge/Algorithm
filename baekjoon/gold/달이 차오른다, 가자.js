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
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === '0') {
        map[i][j] = '.';
        return BFS(i, j);
      }
    }
  }

  function BFS(r, c) {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    const visitied = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => Array.from({ length: 64 }, () => false))
    );

    const q = new Queue();
    visitied[r][c][0] = true;
    q.push({ r, c, key: 0, d: 0 });

    while (q.getSize()) {
      const { r, c, key, d } = q.pop();

      if (map[r][c] === '1') {
        return d;
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;
        if (visitied[nr][nc][key] || map[nr][nc] === '#') continue;
        let new_key = key;
        if ('a' <= map[nr][nc] && map[nr][nc] <= 'z') {
          const m = map[nr][nc].charCodeAt(0) - 97;
          const key = Math.pow(2, m);

          new_key = new_key | key;
        } else if ('A' <= map[nr][nc] && map[nr][nc] <= 'Z') {
          const m = map[nr][nc].charCodeAt(0) - 65;
          const door = Math.pow(2, m);

          if ((key & door) !== door) continue;
        }

        visitied[nr][nc][key] = true;
        q.push({ r: nr, c: nc, key: new_key, d: d + 1 });
      }
    }
    return -1;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((row) => Array.from(row));

console.log(solution(N, M, map));

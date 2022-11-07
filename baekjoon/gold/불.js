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

  top() {
    const head = this.head;
    return head.data;
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

function solution(M, N, map) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const fires = new Queue();
  const sang = new Queue();

  initFires();
  initSang();

  let t = 0;

  while (sang.getSize()) {
    fire(t);
    const result = move(t);

    if (result) {
      return t;
    }

    t += 1;
  }

  return 'IMPOSSIBLE';

  function initFires() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === '*') {
          fires.push({ r: i, c: j, t: 0 }); // map상의 *의 위치
        }
      }
    }
  }

  function initSang() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === '@') {
          sang.push({ r: i, c: j, t: 0 }); // map상의 *의 위치
          return;
        }
      }
    }
  }

  function fire(t) {
    while (fires.getSize() && fires.top().t === t) {
      const { r, c, t } = fires.pop();

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;
        if (map[nr][nc] === '*' || map[nr][nc] === '#') continue;
        map[nr][nc] = '*';
        fires.push({ r: nr, c: nc, t: t + 1 });
      }
    }
  }

  function move(t) {
    while (sang.getSize() && sang.top().t === t) {
      const { r, c, t } = sang.pop();

      if (r < 0 || N <= r || c < 0 || M <= c) {
        return 1;
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || M <= nc) {
          sang.push({ r: nr, c: nc, t: t + 1 });
        } else {
          if (map[nr][nc] === '.') {
            map[nr][nc] = '@';
            sang.push({ r: nr, c: nc, t: t + 1 });
          }
        }
      }
    }
    return 0;
  }
}

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let T = Number(input[0]);
let idx = 1;
let answer = '';
while (T--) {
  const [N, M] = input[idx++].split(' ').map(Number);
  const map = input.slice(idx, idx + M).map((row) => Array.from(row));
  idx += M;
  answer += solution(N, M, map) + '\n';
}

console.log(answer);

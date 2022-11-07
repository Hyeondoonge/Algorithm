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

function solution(N, K) {
  const path = Array.from({ length: 100001 }, () => Infinity);
  const count = Array.from({ length: 100001 }, () => 0);

  const q = new Queue();

  path[N] = 0;
  count[N] = 1;
  q.push({ x: N, d: 0 });

  while (q.getSize()) {
    const { x, d } = q.pop();

    if (x === K) {
      return [d, count[x]];
    }

    if (x + 1 < 100001) {
      if (path[x + 1] === d + 1) {
        count[x + 1] += count[x];
      } else if (d + 1 < path[x + 1]) {
        path[x + 1] = d + 1;
        count[x + 1] = count[x];
        q.push({ x: x + 1, d: d + 1 });
      }
    }
    if (-1 < x - 1) {
      if (path[x - 1] === d + 1) {
        count[x - 1] += count[x];
      } else if (d + 1 < path[x - 1]) {
        path[x - 1] = d + 1;
        count[x - 1] = count[x];
        q.push({ x: x - 1, d: d + 1 });
      }
    }
    if (x * 2 < 100001) {
      if (path[x * 2] === d + 1) {
        count[x * 2] += count[x];
      } else if (d + 1 < path[x * 2]) {
        path[x * 2] = d + 1;
        count[x * 2] = count[x];
        q.push({ x: x * 2, d: d + 1 });
      }
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);

console.log(solution(N, K).join('\n'));

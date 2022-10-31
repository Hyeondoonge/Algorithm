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

function solution(puzzle) {
  const cur = 9 - puzzle.indexOf('0') - 1;
  puzzle = puzzle.replace('0', '9');
  puzzle = Number(puzzle);

  const visitied = {};
  const q = new Queue(); // puzzle상태, 9의 위치 (r, c), d
  visitied[puzzle] = true;
  q.push({ puzzle, cur, d: 0 });

  const diff = [
    [3, 1],
    [3, 1, -1],
    [3, -1],
    [3, -3, 1],
    [3, -3, -1, 1],
    [3, -3, -1],
    [1, -3],
    [1, -1, -3],
    [-1, -3]
  ];

  while (q.getSize()) {
    const { puzzle, cur, d } = q.pop();

    if (puzzle === 123456789) {
      return d;
    }

    const N = diff[cur].length;
    for (let k = 0; k < N; k++) {
      if (cur + diff[cur][k] < 0 || 8 < cur + diff[cur][k]) continue;

      const next = cur + diff[cur][k];
      const A = 9,
        B = Math.floor((puzzle % Math.pow(10, next + 1)) / Math.pow(10, next));

      let new_puzzle = puzzle;
      new_puzzle -= (A - B) * Math.pow(10, cur);
      new_puzzle += (A - B) * Math.pow(10, next);

      if (visitied[new_puzzle]) continue;
      visitied[new_puzzle] = true;

      q.push({ puzzle: new_puzzle, cur: next, d: d + 1 });
    }
  }

  return -1;
}

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let puzzle = input
  .map((row) => {
    row = row.replace(/ /g, '');
    return row;
  })
  .join('');

console.log(solution(puzzle));

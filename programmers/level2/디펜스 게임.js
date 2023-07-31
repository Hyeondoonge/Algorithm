function solution(n, k, enemy) {
  const { push, pop, size } = PriorityQueue();
  const M = enemy.length;
  let S = 0;

  let qsum = 0;
  let answer = 0;

  for (let i = 0; i < M; i++) {
    S += enemy[i];

    if (size() < k) {
      push(enemy[i]);
      qsum += enemy[i];
    } else {
      const v = pop();

      if (v < enemy[i]) {
        push(enemy[i]);
        qsum -= v;
        qsum += enemy[i];
      } else {
        push(v);
      }
    }

    if (S - qsum <= n) {
      answer++;
    } else {
      break;
    }
  }
  return answer;
}

function PriorityQueue() {
  const arr = [];
  let N = 0;

  const size = () => {
    return N;
  };

  const push = (element) => {
    N++;
    arr[N] = element;
    upheap(N);
  };

  const pop = () => {
    const temp = arr[1];
    arr[1] = arr[N--];
    downheap(1);
    return temp;
  };

  const isHigher = (i, j) => {
    if (arr[i] < arr[j]) return true;
    return false;
  };

  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const upheap = (i) => {
    while (1 < i) {
      const p = Math.floor(i / 2);
      if (!isHigher(i, p)) break;
      swap(i, p);
      i = p;
    }
  };

  const downheap = (i) => {
    while (2 * i <= N) {
      let c = 2 * i;
      if (c + 1 <= N && isHigher(c + 1, c)) c++;
      if (isHigher(i, c)) break;
      swap(i, c);
      i = c;
    }
  };

  return {
    size,
    push,
    pop
  };
}

// 분류: 조합 + 우선순위큐
// 풀이시간: 1:40~2:44

function PriorityQueue(isHigher) {
  let arr = [];
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
    while (i > 1) {
      const p = Math.floor(i / 2);
      if (!isHigher(arr[i], arr[p])) break;
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
  return {
    push,
    pop,
    upheap,
    downheap,
    getSize
  };
}

function solution(k, n, reqs) {
  const reqsOnType = Array.from({ length: k }, () => []);

  reqs.forEach(([s, p, t]) => {
    reqsOnType[t - 1].push([s, p]);
  });

  let answer = Infinity;
  const hist = [];

  comb(0, 0);

  function comb(d, acc) {
    if (acc > n) return;
    if (d == k) {
      if (acc === n) {
        answer = Math.min(getWaitingTime(), answer);
      }
      return;
    }

    for (let i = 1; i <= n - (k - 1); i++) {
      hist.push(i);
      comb(d + 1, acc + i);
      hist.pop();
    }
  }

  return answer;

  function getWaitingTime() {
    let waitingTime = 0;

    for (let i = 0; i < k; i++) {
      const pq = PriorityQueue((a, b) => a < b);
      for (let j = 0; j < reqsOnType[i].length; j++) {
        const [s, p] = reqsOnType[i][j];
        if (pq.getSize() === hist[i]) {
          // 꽉찼을 때
          const e = pq.pop();
          if (s < e) {
            waitingTime += e - s;
            pq.push(e + p);
          } else {
            pq.push(s + p);
          }
        } else {
          pq.push(s + p);
        }
      }
    }
    return waitingTime;
  }
}

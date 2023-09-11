// 분류: 우선순위 큐
// 풀이시간: 10:41~11:12

// 소보루 n개
// 남은 튀김 소보루 s개 (먹기 위해 집은 소보루 제외)
// 1~m번 사람.
// 소보루 1개 먹는데 걸리는 시간 유추

// 마지막으로 소보루 집은 사람 번호
// 여러 사람이 동시에 집으면 번호가 작은 사람이 먼저 잡고, 떠나자 마자 바로 먹음

// input
// n 초기 개수 (1~100,000) s 남은 개수 (0~n-1)
// m 사람 (1~100,000)
// t[i] (1~1,000) 먹는데 걸리는 시간

// output
// 마지막으로 집은 사람

function solution(N, M, times) {
  let bread = N - M;
  const pq = PriorityQueue((a, b) => {
    if (a.time < b.time) return true;
    if (a.time > b.time) return false;
    if (a.index < b.index) return true;
    return false;
  });

  for (let i = 0; i < times.length; i++) {
    pq.push({ index: i, time: times[i] });
    bread--;
    if (bread === 0) return i + 1;
  }

  let cur = 0;
  let last = 0;

  while (bread !== 0) {
    const top = pq.pop();

    if (top.time !== cur) {
      cur = top.time;
    }

    last = top.index;
    pq.push({ index: top.index, time: times[top.index] + cur });
    bread--;
  }

  return last + 1;
}
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

  const print = () => {
    console.log(arr.map((json) => JSON.stringify(json)).join(" "));
  };

  return {
    print,
    push,
    pop,
    upheap,
    downheap,
    getSize,
  };
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const times = input.slice(2).map(Number);

console.log(solution(N, M, times));

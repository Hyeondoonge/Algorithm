// 신입사원 2명 선발, 이 두명이 같이 공부
// 신입사원 능력치
// 같이 공부 => 두 신입사원 능력치 = 공부 전 두 사람의 능력치합
// 교육 종료 후 또 교육 진행 가능, 선발된 사원 재선발 가능
// 교육 신입사원 능력치만 변화 가능성
// 신입사원 능력치의 합 최소화

// input
// ability 능력치 (length: 2~1,000,000)
// ability[i] (1~100)
// number 교육 횟수 (1~10,000)

// output
// 교육 후 능력치합 최소값 (10억 이하)

function PriorityQueue(isHigher = (a, b) => a < b) {
  const arr = [];
  let size = 0;
  const getSize = () => size;
  const push = (element) => {
    arr[++size] = element;
    upheap(size);
  };
  const pop = () => {
    const top = arr[1];
    arr[1] = arr[size--];
    downheap(1);
    return top;
  };
  const upheap = (i) => {
    while (1 < i) {
      const p = Math.floor(i / 2);
      if (isHigher(arr[p], arr[i])) break;
      [arr[p], arr[i]] = [arr[i], arr[p]];
      i = p;
    }
  };
  const downheap = (i) => {
    while (i * 2 <= size) {
      let c = i * 2;
      if (c + 1 <= size && isHigher(arr[c + 1], arr[c])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[c], arr[i]] = [arr[i], arr[c]];
      i = c;
    }
  };
  return {
    push,
    pop,
    getSize
  };
}

function solution(ability, number) {
  const { push, pop, getSize } = PriorityQueue();

  for (let i = 0; i < ability.length; i++) {
    push(ability[i]);
  }

  while (number--) {
    const a = pop();
    const b = pop();

    push(a + b);
    push(a + b);
  }

  let answer = 0;
  while (getSize()) {
    answer += pop();
  }
  return answer;
}

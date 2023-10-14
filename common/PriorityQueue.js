function PriorityQueue(isHigher = (a, b) => a < b) {
  const arr = [];
  let n = 0;

  const getSize = () => n;

  const push = (item) => {
    arr[++n] = item;
    upheap(n);
  };

  const pop = () => {
    const top = arr[1];
    arr[1] = arr[n--];
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
    while (i * 2 <= n) {
      let c = i * 2;
      if (c + 1 <= n && !isHigher(arr[c], arr[c + 1])) c++;
      if (isHigher(arr[i], arr[c])) break;
      [arr[i], arr[c]] = [arr[c], arr[i]];
      i = c;
    }
  };

  return {
    getSize,
    push,
    pop,
  };
}

module.exports = PriorityQueue;

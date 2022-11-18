function solution(n, paths, gates, summits) {
  const g = gates.length;
  const s = summits.length;
  const map = Array.from({ length: n + 1 }, () => 0); // 0: 쉼터, 1: gates, 2: summits

  for (let i = 0; i < Math.max(g, s); i++) {
    if (gates[i]) map[gates[i]] = 1;
    if (summits[i]) map[summits[i]] = 2;
  }

  const adjList = Array.from({ length: n + 1 }, () => []);

  paths.forEach(([u, v, c]) => {
    adjList[u].push({ v, c });
    adjList[v].push({ v: u, c });
  });

  return dijkstra(gates);

  function dijkstra(gates) {
    const visitied = Array.from({ length: n + 1 }, () => false);
    const q = new PriorityQueue(['intensity', 'cur']);

    gates.forEach((gate) => {
      q.push({ cur: gate, c: 0, intensity: 0 });
    });

    let minIntensity = Infinity;
    let minSummit = Infinity;

    while (q.size()) {
      const { cur, c, intensity } = q.pop();

      if (visitied[cur]) continue;
      visitied[cur] = true;

      if (minIntensity < intensity) break;

      if (map[cur] === 2) {
        if (cur < minSummit) {
          minSummit = cur;
        }
        minIntensity = intensity;
        continue;
      }

      for (let i = 0; i < adjList[cur].length; i++) {
        const { v, c } = adjList[cur][i];
        if (visitied[v] || map[v] === 1) continue;
        q.push({ cur: v, c, intensity: Math.max(intensity, c) });
      }
    }
    return [minSummit, minIntensity];
  }
}

class PriorityQueue {
  arr;
  n;

  constructor(key = undefined) {
    this.arr = [];
    this.n = 0;
    this.key = key;
  }
  size() {
    return this.n;
  }
  push(data) {
    this.n++;
    this.arr[this.n] = { ...data };
    this.upheap(this.n);
  }
  pop() {
    const temp = { ...this.arr[1] };
    this.arr[1] = { ...this.arr[this.n] };
    this.n--;
    this.downheap(1);

    return temp;
  }
  isHigher(i, j) {
    const key = this.key;
    if (this.arr[i][key[0]] < this.arr[j][key[0]]) return true;
    else if (this.arr[i][key[0]] > this.arr[j][key[0]]) return false;
    return this.arr[i][key[1]] < this.arr[j][key[1]];
  }
  swap(i, j) {
    const temp = { ...this.arr[i] };
    this.arr[i] = { ...this.arr[j] };
    this.arr[j] = temp;
  }
  upheap(i) {
    while (1 < i) {
      let c = Math.floor(i / 2);
      if (!this.isHigher(i, c)) break;
      this.swap(i, c);
      i = c;
    }
  }
  downheap(i) {
    while (i * 2 <= this.n) {
      let c = i * 2;
      if (c + 1 <= this.n && !this.isHigher(c, c + 1)) c++;
      if (this.isHigher(i, c)) break;
      this.swap(i, c);
      i = c;
    }
  }
}

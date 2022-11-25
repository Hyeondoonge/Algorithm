function solution(n, roads, sources, destination) {
  const adjList = Array.from({ length: n + 1 }, () => []);
  const cost = Array.from({ length: n + 1 }, () => Infinity);

  roads.forEach(([a, b]) => {
    adjList[a].push(b);
    adjList[b].push(a);
  });

  const q = [];
  let idx = 0;
  cost[destination] = 0;
  q.push({ v: destination, cost: 0 });

  while (idx < q.length) {
    const { v, cost } = q[idx++];

    for (let i = 0; i < adjList[v].length; i++) {
      const u = adjList[v][i];
      if (cost[u] !== Infinity) continue;
      cost[u] = cost + 1;
      q.push({ v: u, cost: cost + 1 });
    }
  }

  return sources.map((source) => (cost[source] === Infinity ? -1 : cost[source]));
}

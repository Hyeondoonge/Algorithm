function solution(tickets) {
  const n = tickets.length;
  const adjList = {};
  const visitied = Array.from({ length: n }, () => false);
  let idx = 0;

  for (const [a, b] of tickets) {
    if (!adjList[a]) {
      adjList[a] = [];
    }
    adjList[a].push({ b, idx });
    idx++;
  }

  for (const key in adjList) {
    adjList[key].sort((a, b) => {
      if (a.b < b.b) return -1;
      else if (a.b === b.b) return 0;
      else return 1;
    }); // 사전순
  }

  let answer;
  const path = [];

  path.push('ICN');
  dfs('ICN', 0);

  return answer;

  function dfs(cur, d) {
    if (d === n) {
      if (!answer) answer = [...path];
      return;
    }

    if (!adjList[cur]) return;

    for (const { b, idx } of adjList[cur]) {
      if (visitied[idx]) continue;
      visitied[idx] = true;
      path.push(b);
      dfs(b, d + 1);
      path.pop();
      visitied[idx] = false;
    }
  }
}

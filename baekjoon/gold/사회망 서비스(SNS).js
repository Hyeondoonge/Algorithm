function solution(N, edges) {
  const adjList = Array.from({ length: N + 1 }, () => []);
  const visitied = Array(N + 1).fill(false);

  for (const [u, v] of edges) {
    adjList[u].push(v);
    adjList[v].push(u);
  }

  const result = dfs(1);
  return Math.min(...result);

  function dfs(i) {
    visitied[i] = true;
    let A = 1;
    let noA = 0;

    for (let k = 0; k < adjList[i].length; k++) {
      const adjVertex = adjList[i][k];
      if (visitied[adjVertex]) continue;
      const result = dfs(adjVertex);
      noA += result[1];
      A += Math.min(result[0], result[1]);
    }
    return [noA, A];
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const edges = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, edges));

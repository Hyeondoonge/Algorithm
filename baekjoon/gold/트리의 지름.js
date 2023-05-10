function solution(N, edges) {
  const adjList = Array.from({ length: N + 1 }, () => []);

  for (const [p, c, w] of edges) {
    adjList[p].push([c, w]);
    adjList[c].push([p, w]);
  }

  const [node, _] = findLongestPath(1); // return path, node

  const [__, path] = findLongestPath(node);

  return path;

  function findLongestPath(i) {
    const visitied = Array.from({ length: N + 1 }, () => false);
    const q = [];

    let idx = 0;
    visitied[i] = true;
    q.push([i, 0]);

    let max = [0, 0];

    while (idx < q.length) {
      const [node, path] = q[idx++];

      if (max[1] < path) {
        max[1] = path;
        max[0] = node;
      }

      for (let k = 0; k < adjList[node].length; k++) {
        const [adjVertex, weight] = adjList[node][k];

        if (visitied[adjVertex]) continue;
        visitied[adjVertex] = true;
        q.push([adjVertex, path + weight]);
      }
    }
    return max;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const edges = input.slice(1).map((row) => row.split(' ').map(Number));

console.log(solution(N, edges));

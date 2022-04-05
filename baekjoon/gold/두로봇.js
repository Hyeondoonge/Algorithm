const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, });
const input = [];

rl.on("line", function (line) { 
  input.push(line);
  
}).on("close", function () { 
  solution();
  process.exit();
});

function solution () {
  const [N, F, S] = input[0].split(' ').map((e) => parseInt(e));
  
  const adjList = Array.from(new Array(N + 1), () => []);
  
  for(let i = 0; i < N - 1; i++) {
    const [u, v, c] = input[i + 1].split(' ').map((e) => parseInt(e));
    adjList[u].push({ adj: v, cost: c });
    adjList[v].push({ adj: u, cost: c });
  }
  
  const visitied = new Array(N + 1).fill(false);

  let answer = Infinity;
  visitied[F] = true;
  dfs(F, 0, 0);
  console.log(answer);
  
  function dfs (node, cost_sum, max) {
    if (node === S) {
      answer = min(answer, cost_sum - max);
      return;
    }
  
    for(let i = 0; i < adjList[node].length; i++) {
      const { adj, cost } = adjList[node][i];
  
      if (visitied[adj]) continue;
      visitied[adj] = true;
      dfs(adj, cost_sum + cost, cost > max ? cost : max);
    }
  }

  function min (a, b) {
    return a < b ? a : b;
  }
}
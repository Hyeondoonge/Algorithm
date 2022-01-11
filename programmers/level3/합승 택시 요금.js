function solution(n, s, a, b, fares) {
  const graph = Array.from(new Array(n + 1), () => new Array(n + 1));
    
  for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
          if (i === j) graph[i][j] = 0;
          else graph[i][j] = Infinity;
      }
  }
    
  for(let i = 0; i < fares.length; i++) {
    const [c, d, f] = fares[i];
    graph[c][d] = graph[d][c] = f;
  }

  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if (graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }
    
  let ans = Infinity;

  for(let i = 1; i <= n; i++) {
    let totalCost = graph[s][i] + graph[i][a] + graph[i][b];
    ans = ans < totalCost ? ans : totalCost;
  }

  return ans;
}
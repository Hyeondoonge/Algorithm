function solution(n, results) {
  const graph = Array.from(({length: n + 1}), (_, i) => Array.from(({length: n + 1}), (_, j) => i === j ? 0 : Infinity));

  for(let i = 0; i< results.length; i++) {
    const [a, b] = results[i];
    graph[a][b] = 1;
    graph[b][a] = -1;
  }
  console.log(graph);

  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if (graph[i][k] > 0 && graph[k][j] < 0 || graph[i][k] < 0 && graph[k][j] > 0) continue;
        if (graph[i][j] > graph[i][k] + graph[k][j]) graph[i][j] = graph[i][k] + graph[k][j];
      }
    } 
  }

  console.log(graph);

  let answer = 0;

  for(let i = 1; i <= n; i++) {
    let m = 0;
    for(let j = 1; j <= n; j++) {
      if (graph[i][j] !== 0 && graph[i][j] !== Infinity) m++;
    }
    if (m === n - 1) answer += 1;
  }
  console.log(answer);
}

solution(5, [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]);
function solution(nodeinfo) {
  const coords = Array.from({ length: 10001 }, () => []);
  nodeinfo = nodeinfo.map((e, num) => {
    coords[num + 1].push(...e);
    return { num: num + 1, coords: e };
  });

  nodeinfo.sort((a, b) => {
    if (a.coords[1] > b.coords[1]) return -1;
    else if (a.coords[1] < b.coords[1]) return 1;
    else return a.coords[0] - b.coords[0];
  });
  const root = nodeinfo[0].num;

  const graph = Array.from({ length: 10001 }, () => [-1, -1]);
  for (const { num, coords } of nodeinfo) {
    if (num === root) continue;

    dfs(root, num, coords);
  }

  const postOrderResult = [];
  preOrder(root);
  const preOrderResult = [];
  postOrder(root);

  return [preOrderResult, postOrderResult];

  function dfs(s_num, t_num, t_coords) {
    const left = graph[s_num][0];

    if (t_coords[0] < coords[s_num][0]) {
      if (left === -1) graph[s_num][0] = t_num;
      else dfs(left, t_num, t_coords);
    }

    const right = graph[s_num][1];

    if (coords[s_num][0] < t_coords[0]) {
      if (right === -1) graph[s_num][1] = t_num;
      else dfs(right, t_num, t_coords);
    }
  }

  function postOrder(i) {
    postResult.push(i);
    if (graph[i][0] !== -1) postOrder(graph[i][0]);
    if (graph[i][1] !== -1) postOrder(graph[i][1]);
  }

  function preOrder(i) {
    if (graph[i][0] !== -1) preOrder(graph[i][0]);
    if (graph[i][1] !== -1) preOrder(graph[i][1]);
    preOrderResult.push(i);
  }
}

solution([
  [5, 3],
  [11, 5],
  [13, 3],
  [3, 5],
  [6, 1],
  [1, 3],
  [8, 6],
  [7, 2],
  [2, 2]
]);

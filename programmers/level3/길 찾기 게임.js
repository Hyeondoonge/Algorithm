function solution(nodeinfo) {
  nodeinfo = nodeinfo.map((coord, index) => [...coord, index + 1]);
  const adjList = Array.from(new Array(nodeinfo.length + 1), () => []);


  nodeinfo.sort((a, b) => {
    const [ax, ay] = a;
    const [bx, by] = b;

    if (ay > by) return -1;
    else if (ay < by) return 1;
    else return ax - bx;
  });

  console.log(nodeinfo);

  const q = [];
  let idx = 0;
  q.push(nodeinfo[0]);
  // make adjList
  while (q.length) {
    const [px, pY, num] = q.shift();
    console.log(num);
    if (idx === nodeinfo.length - 1) break;
    let [x, y, _] = nodeinfo[idx + 1];

    if (x < px) {
      adjList[num][0] = nodeinfo[idx + 1];
      q.push(adjList[num][0]);
       
      if (idx + 2 === nodeinfo.length) continue;
      let [x, y, _] = nodeinfo[idx + 2];
      if (px < x) {
        adjList[num][1] = nodeinfo[idx + 2];
        q.push(adjList[num][1]);
        idx += 2;
      } else idx +=1;
    } else {
      adjList[num][0] = null;
      adjList[num][1] = nodeinfo[idx + 1];
      q.push(adjList[num][1]);
      idx += 1;
    }
  }

  adjList.forEach((item, index) => {
    if (index !== 0) {
      console.log(`${index}의 인접 노드`);
      for(let i = 0; i < item.length; i++) {
        console.log(item);
      }
    } 
  });
}

solution([[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]]);
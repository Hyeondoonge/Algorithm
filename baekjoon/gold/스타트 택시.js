// 벽으로 인해 승객을 탑승시키지 못하는 경우와 목적지로 도착하지 못하는 예외상황을 고려한다.

function solution(N, M, map, gas, taxi, passengers) {
  taxi = { r: taxi[0] - 1, c: taxi[1] - 1 };

  passengers.forEach(([r, c], index) => {
    map[r - 1][c - 1] = index + 2;
  });
  const destinations = passengers.map(([_, __, r, c]) => ({
    r: r - 1,
    c: c - 1
  }));
  let arrived_passengers_count = 0;

  while (arrived_passengers_count !== passengers.length) {
    const path = shortestPath(taxi);

    if (!path || gas < path.d) return -1;

    gas -= path.d;

    const passenger_id = map[path.r][path.c];

    (taxi.r = path.r), (taxi.c = path.c);

    const destination = destinations[passenger_id - 2];
    const pathToDest = shortedPathToDest(taxi, destination);
    if (!pathToDest || gas < pathToDest.d) return -1;

    gas -= pathToDest.d;
    gas += pathToDest.d * 2;

    (taxi.r = pathToDest.r), (taxi.c = pathToDest.c);

    arrived_passengers_count++;
    map[path.r][path.c] = 0;
  }

  return gas;

  function shortedPathToDest(taxi, dest) {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

    const q = [];
    let idx = 0;
    visitied[taxi.r][taxi.c] = true;
    q.push({ r: taxi.r, c: taxi.c, d: 0 });

    while (idx < q.length) {
      const { r, c, d } = q[idx++];

      if (r === dest.r && c === dest.c) {
        return { r, c, d };
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
        if (map[nr][nc] === 1) continue;
        if (visitied[nr][nc]) continue;
        visitied[nr][nc] = true;
        q.push({ r: nr, c: nc, d: d + 1 });
      }
    }
    return null;
  }

  function shortestPath(taxi) {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    const visitied = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

    const q = [];
    let idx = 0;
    visitied[taxi.r][taxi.c] = true;
    q.push({ r: taxi.r, c: taxi.c, d: 0 });

    let minPath = null;

    while (idx < q.length) {
      const { r, c, d } = q[idx++];

      if (2 <= map[r][c]) {
        if (!minPath || d < minPath.d) minPath = { r, c, d };
        else if (d === minPath.d) {
          if (r < minPath.r || (r === minPath.r && c < minPath.c)) minPath = { r, c, d };
        }
      }

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];

        if (nr < 0 || N <= nr || nc < 0 || N <= nc) continue;
        if (map[nr][nc] === 1) continue;
        if (visitied[nr][nc]) continue;
        visitied[nr][nc] = true;
        q.push({ r: nr, c: nc, d: d + 1 });
      }
    }

    return minPath;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, gas] = input[0].split(' ').map(Number);
const map = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
const taxi = input[N + 1].split(' ').map(Number);
const passengers = input.slice(N + 2).map((row) => row.split(' ').map(Number));

console.log(solution(N, M, map, gas, taxi, passengers));

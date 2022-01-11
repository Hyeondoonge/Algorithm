// 핵심
// 최소 비용 경로를 얻는 것이 목표이므로
// 방문했던 곳이라도 더 적은 비용으로 갈 수 있으면 갱신
// 이때, * 더 적은 비용 또는 같은 비용으로 갈 수 있다면 * queue에 좌표를 삽입.

// >> 같은 비용일 때, 방향에 따라서 다음 좌표의 비용이 달라지기 때문에

const visitied = Array.from(new Array(25), () => new Array(25).fill(0));
const costs = Array.from(new Array(25), () => new Array(25).fill(0));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const queue = [];

function solution(board) {
  // 0: up, 1: down, 2: left, 3: right

  const n = board.length;

  visitied[1][0] = visitied[0][1] = visitied[0][0] = 1;

  if (!board[1][0]) queue.push({ r: 1, c: 0, d: 1, cost: 100 });
  if (!board[0][1]) queue.push({ r: 0, c: 1, d: 3, cost: 100 });

  while (queue.length !== 0) {
    const {r, c, d, cost} = queue.shift();

    if (r === n - 1 && c === n - 1) {
      continue;
    };

    for(let k = 0; k < 4; k++) {
      let nr = dr[k] + r;
      let nc = dc[k] + c;

      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
      if (board[nr][nc]) continue;

      let extra = 100;

      if (d !== k) {
        extra += 500;
      }

      if (!visitied[nr][nc] || cost + extra <= costs[nr][nc]) {
        visitied[nr][nc] = true;
        costs[nr][nc] = cost + extra;
        queue.push({ r: nr, c: nc,
                     d: k,
                     cost: costs[nr][nc]
                });
          }
        }
      }

  return costs[n - 1][n - 1];
};
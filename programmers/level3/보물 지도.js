// n, m
// 보물, 함정, 보물 지도
// 맨 왼쪽 아래 칸 (1,1) 맨 오른쪽 위칸 (n, m - 보물 있는 곳)
// 함정칸을 지나갈 수 없음

// 초기위치 (1, 1) => 목적지 (n, m)
// 상하좌우 이동, 한 칸 이동 1시간 소요

// 신발 사용 시 두 칸 이동 => 1시간 소요 (*함정 뛰어넘기 가능*)

// 이동 최소 시간

// input
// n(1~1,000) m(1~1,000) * n * m은 3이상
// hole 함정의 위치 (length: 1 ~ n*m-2)
// hole[i] [a, b] (a: 1~n, b: 1~m)

// output
// -1 (이동불가) or 보물 칸 이동하는데 필요한 최소시간

function solution(n, m, hole) {
  const map = Array.from({ length: m }, () => Array.from({ length: n }, () => '@'));

  for (let i = 0; i < hole.length; i++) {
    map[m - hole[i][1]][hole[i][0] - 1] = '#';
  }

  const visitied = Array.from({ length: m }, () => Array.from({ length: n }, () => [false, false]));
  const q = [];
  let idx = 0;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  visitied[m - 1][0][0] = true;
  q.push([m - 1, 0, 0, false]);

  while (idx < q.length) {
    const [r, c, d, used] = q[idx++];

    if (r === 0 && c === n - 1) return d;

    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];

      if (isNotInScope(nr, nc)) continue;
      if (visitied[nr][nc][used]) continue;
      if (map[nr][nc] === '#') continue;
      visitied[nr][nc][used] = true;
      q.push([nr, nc, d + 1, used]);
    }

    if (used) continue;

    for (let k = 0; k < 4; k++) {
      // 함정 피하기
      const nr = r + dr[k] * 2;
      const nc = c + dc[k] * 2;

      if (isNotInScope(nr, nc)) continue;
      if (visitied[nr][nc][1]) continue;
      if (map[nr][nc] === '#') continue;
      visitied[nr][nc][1] = true;
      q.push([nr, nc, d + 1, true]);
    }
  }

  function isNotInScope(r, c) {
    return r < 0 || m <= r || c < 0 || n <= c;
  }

  return -1;
}

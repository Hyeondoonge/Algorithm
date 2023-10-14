// 분류: 백트래킹
// 풀이시간: 2:32~3:12

// NxM크기의 재료
// 부위마다 강도가 다름

// 항상 3칸을 차지하는 ㄱ모양으로 다수 개의 부메랑을 만듬
// 중심이 되는 칸(노랑)은 영향 2배

// 사용하지 않는 부분있어도됨

// 강도 합 최대값

// input
// N 세로 (1~5) M 가로 (1~5)
// strengths[i] (1~100)

// output
// 0 (못만듬) or 최대값

function solution(N, M, strength) {
  const map = Array.from({ length: N }, () => Array.from({ length: M }, () => 0)); // 0 or 1
  let answer = 0;

  const pos = [
    [
      [1, 0],
      [1, -1],
    ],
    [
      [0, 1],
      [1, 0],
    ],
    [
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 1],
    ],
  ];

  comb(0, 0, 0);

  return answer;

  function comb(r, c, sum) {
    answer = Math.max(answer, sum);

    if (!isInScope(r, c)) {
      return;
    }

    for (let k = 0; k < 4; k++) {
      const nr1 = r + pos[k][0][0];
      const nc1 = c + pos[k][0][1];

      const nr2 = r + pos[k][1][0];
      const nc2 = c + pos[k][1][1];

      // 범위체크
      if (isInScope(nr1, nc1) && isInScope(nr2, nc2)) {
        if (map[r][c] === 1 || map[nr1][nc1] === 1 || map[nr2][nc2] === 1) continue;

        map[r][c] = 1;
        map[nr1][nc1] = 1;
        map[nr2][nc2] = 1;

        comb(
          c + 1 === M ? r + 1 : r,
          c + 1 === M ? 0 : c + 1,
          sum +
            (k === 1 ? strength[nr1][nc1] + strength[nr2][nc2] + strength[r][c] * 2 : strength[r][c] + strength[nr2][nc2] + strength[nr1][nc1] * 2)
        );

        map[r][c] = 0;
        map[nr1][nc1] = 0;
        map[nr2][nc2] = 0;
      }
    }

    // 두지 않기
    comb(c + 1 === M ? r + 1 : r, c + 1 === M ? 0 : c + 1, sum);
  }

  function isInScope(r, c) {
    return !(r < 0 || N <= r || c < 0 || M <= c);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const strength = input.slice(1).map((row) => row.split(" ").map(Number));

console.log(solution(N, M, strength));

// 12:36~

// 가장 유명한 사람, 2-친구
// A가 B의 2-친구 => 두 사람이 친구, A와 친구이면서 B와 친구인 C가 존재

// 2-친구가 가장 많은 사람의 2-친구 수 수를 출력

// input
// N 사람 수 (1~50)
// Y: 친구, N: 친구 X

// output
// 2-친구 수

// 분류:
// 풀이시간: 30분

function solution(N, isFriends) {
  // 1. 각 정점끼리의 최단 경로 구하기
  // 2. 1번부터 N번까지 2-친구 수 구하면서 답구하기
  const path = Array.from({ length: N }, (_, i) =>
    Array.from({ length: N }, (_, j) => {
      if (i === j) return 0;
      return isFriends[i][j] === "Y" ? 1 : Infinity;
    })
  );

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        path[i][j] = Math.min(path[i][j], path[i][k] + path[k][j]);
      }
    }
  }

  let answer = 0;
  for (let i = 0; i < N; i++) {
    let friend2 = 0;
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      if (path[i][j] <= 2) {
        friend2++;
      }
    }
    answer = Math.max(answer, friend2);
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const isFriends = input.slice(1).map((str) => str.split(""));

console.log(solution(N, isFriends));

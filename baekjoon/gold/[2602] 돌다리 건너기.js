// 분류: DP
// 풀이시간: 11:00~11:30

// 두 개의 인접한 돌다리
// 악마의 돌다리 (위)), 천사의 돌다리(아래), 길이가 항상 동일
// R, I, N, G, S 중 하나가 새겨짐

// 두루마리 -> 반드시 순서대로 밟고 지나가야되는 문자, 순서 지키지 않으면 떨어짐

// 규칙
// 출발 -> 도착으로 지난다. 두루마리 상의 문자열 순서대로 모두 밟는다
// 악마, 천사 번갈아가면서 밟아야한다 (출발은 암떼나 OK)
// 한 칸 이상 오른쪽으로 전진, 건너뛰기 갯수 상관 X

// 모든 가능한 밥ㅇ법의 수

// input
// D 두루마리 문자열 (length:1~20)
// angel 돌다리 (length:1~100)
// devil 돌다리 (length:1~100)

// output
// 경우의 수 (2^31 -1 이하)

function solution(tissue, angel, devil) {
  const dp = Array.from({ length: 2 }, () => Array.from({ length: angel.length }, () => Array.from({ length: tissue.length }, () => 0)));
  // 초기화
  for (let i = 0; i < angel.length; i++) {
    if (tissue[0] === angel[i]) dp[0][i][0] += 1;
    if (tissue[0] === devil[i]) dp[1][i][0] += 1;
  }

  for (let i = 1; i < tissue.length; i++) {
    const t = tissue[i];

    // index i
    for (let k = 0; k < angel.length; k++) {
      if (t !== angel[k]) continue;
      for (let j = 0; j < k; j++) {
        dp[0][k][i] += dp[1][j][i - 1];
      }
    }

    for (let k = 0; k < devil.length; k++) {
      if (t !== devil[k]) continue;
      for (let j = 0; j < k; j++) {
        dp[1][k][i] += dp[0][j][i - 1];
      }
    }
  }
  // 마지막 tissue 인덱스에 해당하는 value들 더하기
  let answer = 0;

  for (let i = 0; i < 1; i++) {
    for (let k = 0; k < angel.length; k++) {
      answer += dp[0][k][tissue.length - 1];
      answer += dp[1][k][tissue.length - 1];
    }
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const tissue = input[0];
const angel = input[1];
const devil = input[2];

console.log(solution(tissue, angel, devil));

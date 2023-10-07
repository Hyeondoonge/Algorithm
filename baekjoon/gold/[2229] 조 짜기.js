// 분류: DP
// 풀이시간: 1:43~2:30

// N명의 학생.
// 실력차이가 많이 나도록 조 편성
// 조 편성 시, 같은 조의 학생들의 나이차이가 많이 나면 부정적인 효과 가능성
// 나이순으로 정렬 후, 학생들을 나누는 방식으로 조를 짬. *조의 개수 제한 X*

// 잘 짜여진 정도 - 가장 점수 높은 학생과 가장 낮은 학생의 점수 차이
// 전체적인 조 잘짜여진 정도 - 각 조가 잘 짜여진 정도의 합.
// 만약 한 명이 조원이라면 ... 0임.

// 조가 잘 짜여진 정도의 최대값 구하기

// input
// N 학생 수 (1~1,000)
// scores[i] 점수 (0~10,000)

// output

function solution(N, scores) {
  const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      dp[i][i] = Math.max(dp[i][i], dp[i - 1][j]); // i 기점으로 분리.
    }

    for (let j = 0; j < i; j++) {
      let a = Math.abs(scores[j] - scores[i]) - Math.abs(scores[j] - scores[i - 1]);
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + a); // i 보다 앞을 기점으로 분리
    }
  }

  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      answer = Math.max(answer, dp[i][j]);
    }
  }
  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const scores = input[1].split(" ").map(Number);

console.log(solution(N, scores));

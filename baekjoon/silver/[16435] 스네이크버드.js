// 분류: 그리디
// 풀이시간: 2:36~2:45

// 과일 먹으면 길이가 1 늘어남
// 과일은 지상으로부터 일정 높이를 두고 떨어져있음, i번째 과일의 높이는 hi
// 몸 길이보다 작거나 같은 높이에 있는 과일을 먹음
// 처음 길이가 L일 때, 과일을 먹어 늘릴 수 있는 최대 길이

// input
// N 과일 개수 (1~1,000) L 초기 길이 (1~10,000)
// h[i] 과일 높이 (1~10,000)

// output
// 최대 길이

function solution(L, heights) {
  heights.sort((a, b) => a - b);

  // 현재 길이 L과 먹을 수 있는 과일 비교
  // 더 이상 못먹으면 종료
  let length = L;

  for (let i = 0; i < heights.length; i++) {
    if (length < heights[i]) {
      break;
    } else {
      length++;
    }
  }
  return length;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, L] = input[0].split(" ").map(Number);
const heights = input[1].split(" ").map(Number);

console.log(solution(L, heights));

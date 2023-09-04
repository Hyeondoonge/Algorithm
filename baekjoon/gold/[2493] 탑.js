// 분류:
// 풀이시간: 12:54~

// N개의 높이가 서로 다른 탑, 수평으로 차례대로 정렬
// 탑 꼭대기의 레이저 송신기는 왼쪽 방향으로 신호 발사.
// 탑의 기둥에는 레이저 수신기
// 탑에서 발사된 신호는 가장 먼저 만나는 탑 하나에만 수신 가능

// input
// N 탑의 수 (1~500,000)
// heights[i] N개 탑들의 높이 (1~100,000,000)

// output
// 각 탑에서 발사한 신호를 수신하는 탑의 번호, 존재하지않으면 0

function solution(N, heights) {
  const stack = [[heights[0], 1]];
  const answer = Array.from({ length: N }, () => 0);

  for (let i = 1; i < N; i++) {
    const height = heights[i];
    while (stack.length) {
      const [heightOfTop, indexOfTop] = stack[stack.length - 1];
      if (height < heightOfTop) {
        answer[i] = indexOfTop;
        break;
      } else {
        stack.pop();
      }
    }
    stack.push([height, i + 1]);
  }
  return answer.join(" ");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const heights = input[1].split(" ").map(Number);

console.log(solution(N, heights));

// 분류: dfs
// 풀이시간: 11:02~11:36
// 2차 풀이시간: 1:00~1:15

// 함께하고 싶은 학생을 한 명만 선택
// 자기 자신 선택 가능

// 한 팀이 될려면 cycle을 이루면 됨.

// input
// T
// n 학생 수 (2~100,000)
// numbers[i] 선택 학생 번호 (1~n)

// output
// 속하지 못한 학생들 수

function solution(N, parent) {
  const visitied = Array(N + 1).fill(false);
  const orders = Array(N + 1).fill(-1);
  let cnt = 0;

  for (let i = 1; i <= N; i++) {
    dfs(i, 1);
  }

  return cnt;

  function dfs(i, order) {
    if (visitied[i]) {
      // 같은 번호 있는지 확인
      cnt += orders[i] === -1 ? order - 1 : orders[i] - 1;
      return;
    }
    orders[i] = order;
    visitied[i] = true;
    dfs(parent[i], order + 1);
    orders[i] = -1;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0;
let t = Number(input[idx++]);

while (t--) {
  const N = Number(input[idx++]);
  const numbers = [0, ...input[idx++].split(" ").map(Number)];

  console.log(solution(N, numbers));
}

// 분류: dfs
// 풀이시간: 11:02~11:36

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
  const isInGroup = Array.from({ length: N + 1 }, () => false);
  const visitied = Array.from({ length: N + 1 }, () => false);
  const history = [];

  for (let i = 1; i <= N; i++) {
    dfs(i);
  }

  let cnt = 0;
  for (let i = 1; i <= N; i++) {
    if (!isInGroup[i]) cnt++;
  }

  return cnt;

  function dfs(i) {
    if (visitied[i]) {
      // 같은 번호 있는지 확인
      if (history.some((e) => e === i)) {
        let g = false;
        for (let k = 0; k < history.length; k++) {
          const number = history[k];
          if (number === i) g = true;
          isInGroup[number] = g;
        }
      }
      return;
    }
    visitied[i] = true;
    history.push(i);

    dfs(parent[i]);

    history.pop();
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

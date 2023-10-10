// 분류:
// 풀이시간: 1:02~

// 직속부하 칭찬 시, 그 부하의 직속부하도 연ㅙ적으로 칭찬
// 칭찬 수치, 부하들이 똑같이 칭찬 받음(?)
// 각자 받은 칭찬의 수

// input
// n 회사 직원 수 (2~100,000) m 최초 칭찬 횟수 (2~100,000)
// 상사[i] 직속 상사 번호 (length: 1~n, 1번이 사장 => 상사 X)
// 칭찬받은직원[i] 번호(2~n) 칭찬수치(1~1,000) (이때, 사장은 칭찬받지않음)

// output
// 1~n번 직원의 칭찬받은 정도

function solution(N, M, relatives, compliments) {
  const adjList = Array.from({ length: N + 1 }, () => []); // 자식
  const complimentList = Array.from({ length: N + 1 }, () => 0);
  const visitied = Array(N + 1).fill(false);

  relatives.forEach((p, index) => {
    if (index !== 0) adjList[p].push(index + 1);
  });

  compliments.forEach(([u, c]) => {
    complimentList[u] += c;
  });

  const q = [];
  let idx = 0;

  q.push(1);

  while (idx < q.length) {
    const u = q[idx++];

    for (let i = 0; i < adjList[u].length; i++) {
      const v = adjList[u][i];

      if (!visitied[v]) {
        visitied[v] = true;
        q.push(v);
        complimentList[v] += complimentList[u];
      }
    }
  }

  return complimentList.slice(1).join(" ");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const relatives = input[1].split(" ").map(Number);
const compliments = input.slice(2, 2 + M).map((row) => row.split(" ").map(Number));

console.log(solution(N, M, relatives, compliments));

// 분류: BFS
// 풀이시간: 2:02~4:05

// 논리는 맞는데 맞는걸 재확인하느라 시간 소모
// * 실제 tc에서 칭찬받은 직원 및 수치가 m개 넘게 들어올 수도 있기 떄문에
// 해당 입력을 받을 때, m개 줄만 무조건 받도록해야함 *

// 상사 -> 직속 부하 칭찬 -> 직속 부하 칭찬 -> 연쇄적...
// 같은 수치로 부하들이 칭찬 받음

// input
// n 직원 수 (2~100,000) m 최초 칭찬 횟수 (2~100,000) // 1번부터 n번까지 직원 번호
// seniors[i] n명의 직속 상사 번호 (* 이 번호는 자신의 번호보다 작음, 이때 1번의 경우 상사 없으므로 -1)
// employee[i] (2~n) 칭찬 획득 직원 번호 compliment[i] 칭찬 수치 (1~1,000)

// *사장은 칭찬 받지 않음. => 상사가 없다*

// output
// 1~n직원이 칭찬 받은 정도

function solution(N, M, relatives, compliments) {
  const adjList = Array.from({ length: N + 1 }, () => []); // 자식
  const answer = Array.from({ length: N + 1 }, () => 0);
  const complimentList = Array.from({ length: N + 1 }, () => 0);

  relatives.forEach((p, index) => {
    if (index !== 0) adjList[p].push(index + 1);
  });

  compliments.forEach(([u, c]) => {
    complimentList[u] += c;
  });

  const q = [];
  let idx = 0;

  q.push([1, 0]);

  while (idx < q.length) {
    const [u, c] = q[idx++];

    answer[u] = c;

    for (let i = 0; i < adjList[u].length; i++) {
      const v = adjList[u][i];
      q.push([v, c + complimentList[v]]);
    }
  }
  return answer.slice(1).join(" ");
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const relatives = input[1].split(" ").map(Number);
const compliments = input.slice(2, 2 + M).map((row) => row.split(" ").map(Number));

console.log(solution(N, M, relatives, compliments));

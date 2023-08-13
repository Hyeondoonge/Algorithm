// 분류: Map
// 풀이시간: 5:00~5:31

// 나무의 분포도
// 전체에서 차지하는 비율 구하기

// input
// trees (length: 1,000,000 - 최대 종은 10,000)
// trees[i] (1~30)

// output
// 종의 이름 사전 순 동시에 차지하는 비율을 백분율 소수점 4째자리까지 반올림하여 출력

function solution(trees) {
  const report = new Map(); // tree, count 기록
  const types = [];

  for (const tree of trees) {
    if (!report.has(tree)) {
      report.set(tree, 1);
      types.push(tree);
    } else {
      report.set(tree, report.get(tree) + 1);
    }
  }

  types.sort();

  const count = trees.length;

  let answer = "";

  for (let i = 0; i < types.length; i++) {
    const p = ((report.get(types[i]) * 100) / count).toFixed(4);
    answer += `${types[i]} ${p}\n`;
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const trees = input;

console.log(solution(trees));

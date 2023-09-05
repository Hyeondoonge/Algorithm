// 분류: 큐
// 풀이시간: 2:23~3:30

// 반 등수의 차이가 K를 넘으면 친구가 아님, K보다 작거나 같으면 친구
// 친구 중 좋은 친구는 이름의 길이가 같음
// N명 학생 이름이 *성적순*으로 제시. 좋은 친구의 쌍

// input
// N 반 학생의 이름 수 (3~300,000) K 성적차이 (1~N)
// names[i] (length: 2~20)

// output
// 좋은 친구 쌍의 수

function solution(N, K, names) {
  const set = Array.from({ length: 21 }, () => []);
  const last = Array.from({ length: 21 }, () => -1);

  let cnt = 0;
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const L = name.length;

    while (last[L] !== -1 && i - set[L][last[L]] > K) {
      // 등수차이가 크면 더 이상 사용 X
      last[L]++;
    }

    if (last[L] === -1) {
      last[L] = 0;
    }

    cnt += set[L].length - last[L]; // size
    set[L].push(i);
  }
  return cnt;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const names = input.slice(1);

console.log(solution(N, K, names));

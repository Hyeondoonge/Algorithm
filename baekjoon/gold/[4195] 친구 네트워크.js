// 분류: Map, union & find
// 풀이시간: 11:55~12:40

// 친구 관계가 생긴 순서대로 주어짐
// 두 사람의 친구 네트워크에 있는 사람 수
// 친구 네트워크: 친구 관계로만 이동할 수 있는 사이

// input
// T
// F 친구 관계 수 (1~100,000)
// U 사용자 아이디1 V 사용자 아이디2 (length: 1~20)

// output
// 친구 관계가 생길 때마다 두 사람의 친구 네트워크에 있는 사람 수 구하기

function solution(relatives) {
  const parent = new Map(); // parent, count
  const count = new Map();

  let result = "";
  for (let [u, v] of relatives) {
    const friends = union(u, v);
    result += `${friends}\n`;
  }
  return result;

  function union(u, v) {
    const pu = find(u);
    const pv = find(v);

    if (pu === pv) return count.get(pu);

    count.set(pu, count.get(pv) + count.get(pu));

    parent.set(pv, pu);

    return count.get(pu);
  }

  function find(u) {
    if (!parent.get(u)) {
      parent.set(u, u);
      count.set(u, 1);
    }
    if (parent.get(u) === u) return u;
    parent.set(u, find(parent.get(u)));
    return parent.get(u);
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0;
let t = Number(input[idx++]);

let answer = "";
while (t--) {
  const N = Number(input[idx++]);
  const relatives = input.slice(idx, idx + N).map((row) => row.split(" "));
  idx += N;
  answer += solution(relatives).trim() + "\n";
}
console.log(answer);

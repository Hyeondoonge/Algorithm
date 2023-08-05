// 3:34 ~ 4:06 (30m)
// 각 노래마다 랭킹 리스트 (매 게임 시 얻는 점수 비오름차순으로 저장)
// 등수 => 위에서 몇 번째 있는 점수
// 같은 점수 => 같은 점수들의 등수 증 가장 작은 등수

// 랭킹 리스트에 올라갈 수 있는 점수 개수 P
// 리스트에 있는 N개의 점수가 비오름차순으로 주어짐

// 태수의 점수가 랭킹 리스트 상에서 몇 등인지? 못올라가면 -1
// * 랭킹 리스트가 꽉 차있을 때 새 점수가 이전 점수보다 더 좋을 때 점수가 바뀐다.

// input
// N (0~P) 랭킹 리스트 길이
// S 태수의 새로운 점수
// P(10~50) 랭킹 리스트에 올라갈 수 있는 점수의 수
// list 랭킹리스트 상의 점수가 비오름차순
// list[i] (0~2,000,000,000)

// output

function solution(N, S, P, list) {
  const rank = Array.from({ length: P + 1 }, (_, i) => (i < N ? list[i] : undefined));
  let index = -1;

  for (let i = P - 1; i >= 0; i--) {
    if (!rank[i]) continue;
    if (rank[i] < S) continue;

    // 뒤로 옮기기
    for (let j = P - 1; j >= i + 1; j--) {
      rank[j + 1] = rank[j];
    }
    index = i + 1;
    rank[index] = S;
    break;
  }

  if (index === -1) return 1;
  if (P <= index) return -1; // P안에 있지 않음

  for (let i = 0; i < P; i++) {
    if (rank[i] === S) return i + 1;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, S, P] = input[0].split(" ").map(Number);
const list = N !== 0 ? input[1].split(" ").map(Number) : [];

console.log(solution(N, S, P, list));

// 분류: 그리디
// 풀이시간: 12:23~1:06

// 일직선 상에 여러 채의 집
// 특정 위치의 집에 안테나 한개 설치
// 안테나로부터 모든 집까지의 거리의 총 합이 최소

// 동일한 위치에 여러 개의 집이 존재하기도함

// input
// N 집의 수 (1~200,000)
// pos[i] 집의 위치 (1~100,000)

// output
// 안테나 설치할 위치 (가능한 위치가 여러 개일 경우 가장 작은 위치를 출력)

function solution(houses) {
  houses.sort((a, b) => a - b);

  const H = houses.length;

  return houses[Math.floor(H / 2) - (1 - (H % 2))];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const houses = input[1].split(" ").map(Number);

console.log(solution(houses));

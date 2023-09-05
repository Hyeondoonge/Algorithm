// 분류: 큐
// 풀이시간: 9:21~9:52

// N개의 주차 공간, 1번~N번
// 매일 아침 모든 주차 공간이 비어있음
// 차가 도착 => 비어있는 주차 공간 검사 =>
//    공간 O: 공간 하나 or 빈 주차 공간 없다가 차가 떠나면 곧바로 주차, 공간 여러 개이면 번호 가장 작은 주차 공간
//    공간 X: 빈 공간 생길 때까지 기다림
// 여러 차량 도착 시, 도착 순서대로 기다림. 큐와 같이 동작
// 주차료: 차량의 무게에 비례. 차량 무게 x 주차 공간에 책정된 단위 무게당 요금
// 총 수입 계산

// input
// N 주차 공간 수 (1~100) M 차량 수 (1~2,000)
// costs[i] 주차 공간 단위 무게당 요금 (1~100)
// weights[i] 차량 무게 (1~10,000, 1번부터 M번 번호 부여)
// 주차장 출입 순서. 양: 들어오다, 음: 나가다 (무조건 들어온 후에 나가게 돼있음)

// output
// 총 수입

function solution(N, M, costs, weights, records) {
  const isEmpty = Array.from({ length: N + 1 }, () => true);
  const parked = Array.from({ length: M + 1 }, () => 0);
  const waitQueue = [];

  let sum = 0;

  for (let i = 0; i < records.length; i++) {
    let record = records[i];

    if (record < 0) {
      record = -record;
      isEmpty[parked[record]] = true;
      sum += costs[parked[record]] * weights[record];

      if (waitQueue.length) {
        isEmpty[parked[record]] = false;
        parked[waitQueue.shift()] = parked[record];
      }
      parked[record] = 0;
      continue;
    }

    for (let j = 1; j <= N; j++) {
      if (isEmpty[j]) {
        isEmpty[j] = false;
        parked[record] = j;
        break;
      }
    }
    if (!parked[record]) {
      waitQueue.push(record);
    }
  }
  return sum;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const costs = [0, ...input.slice(1, N + 1).map(Number)];
const weights = [0, ...input.slice(N + 1, N + M + 1).map(Number)];
const records = input.slice(N + M + 1).map(Number);

console.log(solution(N, M, costs, weights, records));

// 분류: 그리디
// 풀이시간: 9:52~10:30

// N개의 센서
// 최대 K개의 집중국 건설
// 수신 가능 영역: 고속도로 상에 연결된 구간

// N개의 센서는 하나 이상의 집중국과 통신 해야함.
// 수신 가능 영역 길이의 합을 최소화

// 각 센서는 원점으로부터 정수 거리의 위치에 놓임
// 각 집중국의 수신 가능영역 거리의 합의 최솟값?

// 제한 사항
// 수신 가능영역 길이는 0이상
// 센서의 위치가 같을 수도 있음

// input
// N 센서 개수 (1~10,000)
// K 집중국 개수 (1~1,000)
// sensors[i] 센서 위치 (-1,000,000~1,000,000)

// output
// 최대 K개의 집중국의 수신 가능 영역 길이의 합의 최솟값

function solution(N, K, sensors) {
  sensors.sort((a, b) => a - b);

  const scope = [];

  for (let i = 1; i < sensors.length; i++) {
    scope.push(sensors[i] - sensors[i - 1]);
  }

  scope.sort((a, b) => a - b);

  let build = N;
  let length = 0;
  let idx = 0;

  while (K < build) {
    length += scope[idx++];
    build--;
  }
  return length;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const K = Number(input[1]);
const sensors = input[2].split(" ").map(Number);

console.log(solution(N, K, sensors));

// 1 6 9 3 6 7
// -9 -4 -1 -7 -4 -3

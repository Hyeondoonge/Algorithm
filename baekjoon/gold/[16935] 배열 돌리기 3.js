// 분류: 구현
// 풀이시간: 5:32~6:33

// NxM 배열에 R번 연산을 적용 (총 6가지 연산)

// 1번: 상하 반전
// 2번: 좌우반전
// 3번: 오른쪽 90도 회전
// 4번: 왼쪽 90도 회전

// N/2xM/2 4개의 부분배열로 나누고 이동
// 5번: 시게
// 6번: 반시계

// input
// N(2~100, 짝수), M(2~100, 짝수), R(1~1,000)
// A[i][j] (1~10^8)
// 수행하는 연산 (length: R)

// otuput
// 연산 수행결과 출력

function solution(N, M, arr, commands) {
  for (const command of commands) {
    switch (command) {
      case 1:
        verticalFlip();
        break;
      case 2:
        horizontalFlip();
        break;
      case 3:
        rotateRight();
        break;
      case 4:
        rotateLeft();
        break;
      case 5:
        rotateClock();
        break;
      case 6:
        rotateAntiClock();
        break;
    }
    N = arr.length;
    M = arr[0].length;
  }

  return format();

  function verticalFlip() {
    for (let j = 0; j < M; j++) {
      for (let i = 0; i < N / 2; i++) {
        [arr[N - i - 1][j], arr[i][j]] = [arr[i][j], arr[N - i - 1][j]];
      }
    }
  }

  function horizontalFlip() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M / 2; j++) {
        [arr[i][M - j - 1], arr[i][j]] = [arr[i][j], arr[i][M - j - 1]];
      }
    }
  }

  function rotateRight() {
    const newN = arr[0].length;
    const newM = arr.length;

    const temp = Array.from(
      { length: newN },
      () => Array.from({ length: newM }),
      () => 0
    );

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        temp[j][N - 1 - i] = arr[i][j];
      }
    }

    arr = temp;
  }

  function rotateLeft() {
    const newN = arr[0].length;
    const newM = arr.length;

    const temp = Array.from(
      { length: newN },
      () => Array.from({ length: newM }),
      () => 0
    );

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        temp[M - j - 1][i] = arr[i][j];
      }
    }

    arr = temp;
  }

  function rotateClock() {
    const temp = Array.from(
      { length: N },
      () => Array.from({ length: M }),
      () => 0
    );

    move(0, 0, 0, M / 2);
    move(0, M / 2, N / 2, M / 2);
    move(N / 2, 0, 0, 0);
    move(N / 2, M / 2, N / 2, 0);
    arr = temp;

    function move(i1, j1, i2, j2) {
      for (let i = 0; i < N / 2; i++) {
        for (let j = 0; j < M / 2; j++) {
          temp[i + i2][j + j2] = arr[i + i1][j + j1];
        }
      }
    }
  }

  function rotateAntiClock() {
    const temp = Array.from(
      { length: N },
      () => Array.from({ length: M }),
      () => 0
    );

    move(0, 0, N / 2, 0);
    move(0, M / 2, 0, 0);
    move(N / 2, 0, N / 2, M / 2);
    move(N / 2, M / 2, 0, M / 2);
    arr = temp;

    function move(i1, j1, i2, j2) {
      for (let i = 0; i < N / 2; i++) {
        for (let j = 0; j < M / 2; j++) {
          temp[i + i2][j + j2] = arr[i + i1][j + j1];
        }
      }
    }
  }

  function format() {
    return arr.map((row) => row.join(" ")).join("\n");
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, R] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const commands = input[N + 1].split(" ").map(Number);

console.log(solution(N, M, arr, commands));

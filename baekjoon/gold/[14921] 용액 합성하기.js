// 분류: 투 포인터
// 풀이시간: 10:15~10:39

// 용액의 특성값  -(10^8) ~ (10^8)
// 같은 양의 두 용액 혼합 시, 특성값은 두 용액의 특성값의 합
// 두 용액을 혼합해 특성값이 *0에 가장 가까운 용액 만들기*

// 각 용액 10ml시험관에 10ml씩 듦.
// 빈 20ml 시험관 한 개
// 미리 용액의 특성값들을 보고, 어떤 두 용액을 섞을지 정함

// input
// N (2~100,000)
// A[i] (-10^8 ~ 10^8)
// 오름차순이며 중복된 수 O

// output
// 혼합용액 0에 가장가까운 특성값

function solution(N, A) {
  let l = 0,
    r = N - 1;
  let sum = 0;
  let answer = Infinity;

  while (l !== r) {
    sum = A[l] + A[r];
    if (sum === 0) return 0;

    if (Math.abs(sum) < Math.abs(answer)) {
      answer = sum;
    }

    if (sum < 0) {
      l++;
    } else {
      r--;
    }
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const A = input[1].split(" ").map(Number);

console.log(solution(N, A));

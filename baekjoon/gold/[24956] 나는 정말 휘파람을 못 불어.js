// 분류: DP
// 풀이시간: 4:40~5:08

// 시루 => 대문자로 구성된 문자열 S
// S로부터 유사 휘파람 문자열 개수 구하기
// WHEE or WHEE뒤에 E를 붙인 것
// 연속하지 않아도됨. 부분 수열의 개수를 구하는 것

// input
// N 문자열의 길이 (1~200,000)
// S

// output
// 부분 수열 개수를 1,000,000,007로 나눈 나머지

function solution(N, str) {
  const cnt = Array(3).fill(0); // W, H, E
  let answer = 0;
  const mod = 1000000007;
    
  for (let i = 0; i < N; i++) {
    const s = str[i];
    if (s === "W") {
      cnt[0]++;
      cnt[0] %= mod;
    } else if (s === "H") {
      cnt[1] += cnt[0];
      cnt[1] %= mod;
    } else if (s === "E") {
      answer += cnt[2];
      answer %= mod;
      cnt[2] += cnt[2];
      cnt[2] %= mod;
      cnt[2] += cnt[1];
      cnt[2] %= mod;
    }
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, str] = input;

console.log(solution(Number(N), str));

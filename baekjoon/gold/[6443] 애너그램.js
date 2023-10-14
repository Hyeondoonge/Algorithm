// 분류: 순열
// 풀이시간: 3:15~4:02
// 시간초과 => 백트래킹 적절히 사용하지 않음.

// 영단어 철자들로 만들 수 있는 모든 단어 출력

// 철자 중복될 수 있어서 같은 단어 만들어질 수 있는데, 한 번만 출력
// 알파벳 순서로 정렬하여 출력

// input
// N 단어 개수
// words[i] (length: 1~20)

// output
// 각 영단어에 대한 가능한 조합 출력

function solution(words) {
  let answer = "";
  for (const word of words) {
    answer += backtracking(word);
  }
  return answer;

  function backtracking(word) {
    word = Array.from(word);

    const N = word.length;
    const MAX_LENGTH = 27;
    const count = Array.from({ length: MAX_LENGTH }, () => 0);

    word.forEach((c) => {
      const code = c.charCodeAt(0) - 97;
      count[code]++;
    });

    const hist = [];

    let result = "";

    perm(0);

    return result;

    function perm(d) {
      if (d === N) {
        result += hist.join("") + "\n";
        return;
      }

      for (let i = 0; i < MAX_LENGTH; i++) {
        if (count[i] === 0) continue;
        count[i]--;
        hist.push(String.fromCharCode(i + 97));
        perm(d + 1);
        hist.pop();
        count[i]++;
      }
    }
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const words = input.slice(1, N + 1);

console.log(solution(words));

// 분류: 딕셔너리
// 풀이시간: 11:35~12:20

// p, c
// p는 앵무새 N마리를 이용해 발견을 기록하고 c에게 날림
// 규칙
// 한 앵무새는 한 문장을 기억함. 문장은 여러 단어로 구성, 이 단어들을 순서대로 말함
// 한 앵무새가 단어를 말하고 그다음 단어 그 사이 간격에 앵무새가 가로채고 자신의 문장 말할 수 있음
// 한 앵무새가 단어 말하는 도중에 다른 앵무새가 가로채지않음
// 모든 단어는 *모든 문장을 통틀어* 2번 이상 등장하지 않음

// 규칙들을 이용해 나올 수 있는 문자인지 확인

// input
// N 앵무새의 수 (1~100)
// S[i] (단어의 수 1~100, 각 단어는 length가 1~32이고 영문 소문자로 구성 => 최대 string 길이 32000)
// ...
// L (단어 수 1~10000, 각 단어는 length가 1~32)

// output
// Possible or Impossible

function solution(N, sentences, target) {
  const sentenceIndexOfWords = {};
  const indexOfWords = Array.from({ length: N }, () => ({}));

  for (let i = 0; i < N; i++) {
    const words = sentences[i].split(" ");
    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      sentenceIndexOfWords[word] = i;
      indexOfWords[i][word] = j;
    }
  }

  const words = target.split(" ");
  const last = Array.from({ length: N }, () => -1);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (sentenceIndexOfWords[word] === undefined) return "Impossible";

    const sentenceIndexOfWord = sentenceIndexOfWords[word];
    const indexOfWord = indexOfWords[sentenceIndexOfWord][word];

    if (indexOfWord - last[sentenceIndexOfWord] === 1) {
      last[sentenceIndexOfWord] = indexOfWord;
    } else {
      return "Impossible";
    }
  }

  for (let i = 0; i < N; i++) {
    if (last[i] !== sentences[i].split(" ").length - 1) {
      return "Impossible";
    }
  }

  return "Possible";
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const sentences = input.slice(1, N + 1);
const target = input[N + 1];

console.log(solution(N, sentences, target));

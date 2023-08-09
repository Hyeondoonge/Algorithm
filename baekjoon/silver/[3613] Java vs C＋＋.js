// 분류: 구현, 문자열
// 풀이시간: 5:10~5:47

// C++ <-> java 변수명
// Java: 단어 사이에 밑줄 X, 첫 단어 제외하고 두 번째 단어부터 첫 문자를 대문자로 작성
// C++: 모두 소문자, 단어 사이에 밑줄

// 변수명이 C++, Java인지 구분하고 반대 형식으로 변환

// input
// string
// string[s] 알파벳 or 밑줄

// output
// Java to C++ C++ to Java or Error

function solution(name) {
  if (name === "") return "";

  if (isCpp()) {
    const words = name.split("_");

    const newName = words
      .map((word, index) => {
        if (index === 0) return word;
        return word[0].toUpperCase() + word.substring(1);
      })
      .join("");

    return newName;
  } else if (isJava()) {
    let words = [];
    let word = "";

    for (let i = 0; i < name.length; i++) {
      if ("A" <= name[i] && name[i] <= "Z") {
        words.push(word);
        word = name[i];
      } else {
        word += name[i];
      }
    }

    words.push(word);

    const newName = words.map((word) => word.toLowerCase()).join("_");
    return newName;
  } else {
    return "Error!";
  }

  function isJava() {
    if (name[0] < "a" || "z" < name[0]) return false;
    for (let i = 0; i < name.length; i++) {
      if ((name[i] < "a" || "z" < name[i]) && (name[i] < "A" || "Z" < name[i])) return false;
    }
    return true;
  }

  function isCpp() {
    const words = name.split("_");

    for (let i = 0; i < words.length; i++) {
      if (words[i] === "") return false;
      for (let j = 0; j < words[i].length; j++) {
        if (words[i][j] < "a" || "z" < name[i][j]) return false;
      }
    }
    return true;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(solution(input[0]));

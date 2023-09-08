// 풀이시간: 3:15~3:34
// 문자열 s, skip
// 자연수 index

// s각 알파벳을 index만큼 뒤의 알파벳으로 변경
// 현재 문자의 index만큼 뒤의 알파벳이 z를 넘어가면 a로 돌아감
// skip에 있은 알파벳은 제외하고 건너뛰기 세아리기

// 규칙대로 s를 변경한 결과

// input
// s (length: 5~50)
// skip (length: 1~10) * skip에 포함된 알파벳은 s에 포함 X
// index (1~20)

// output
// 결과

function solution(s, skip, index) {
  skip = Array.from(skip).map((c) => c.charCodeAt(0));

  let newS = '';

  for (let i = 0; i < s.length; i++) {
    let cur = s[i].charCodeAt(0);
    let tempIndex = index;

    while (tempIndex) {
      cur += 1;
      if (cur === 123) {
        cur = 97;
      }
      if (!skip.includes(cur)) {
        tempIndex -= 1;
      }
    }
    newS += String.fromCharCode(cur);
  }
  return newS;
}

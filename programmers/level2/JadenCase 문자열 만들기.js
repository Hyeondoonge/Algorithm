// 핵심
// s의 길이는 1이 가능하기 때문에 substring함수 이용할 때 조건문이 필요함.

function solution(s) {
  const newStr = s.split(' ');
  
  for(let i = 0; i < newStr.length; i++) {
    let frontChar = 0;
    if (97 <= newStr[i].charCodeAt(0) && newStr[i].charCodeAt(0) <= 122) {
      frontChar = newStr[i][0].toUpperCase();
    } else {
      frontChar = newStr[i][0];
    }
    if (newStr[i].length <= 1) newStr[i] = frontChar;
    else newStr[i] = frontChar + newStr[i].substring(1).toLowerCase();
  }
  return newStr.join(' ');
};
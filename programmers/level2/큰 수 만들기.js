// 핵심
// 1. 익숙한 배열로 풀기 위해 문자열을 배열로 변환
// 2. 문자열 탐색이 끝이 났지만 주어진 k만큼 덜 지웠을 경우가 있다.
//    이를 위해 남은 k수 만큼 강제로 문자열을 제거!

const solution = (number, k) => {
  let erase = k;
  
  let answer = [number[0]];
  let last = number.length;
  
  for(let i = 1; i < number.length; i++) {
      const e = answer.length - 1;

      if (erase === 0) {
          last = i;
          break;
      }

      let smaller = -1; 

      // 보다 작은 수들 찾기
      for(let j = e; j >= 0; j--) {
        smaller = j;
        if (answer[j] >= number[i]) {
            smaller += 1;
            break;
        }
      }

      if (smaller == i) {
        answer.push(number[i]);
        continue;
      }

      if (answer.length - smaller <= erase) { // 자르기 가능하면
        erase -= (answer.length - smaller);
        answer.splice(smaller);
      } else { // 자를 수 있는 만큼
        answer.splice(e - erase + 1);
        erase = 0;
      }
      answer.push(number[i]);
  }

  if (erase > 0) {
    answer.splice(last - erase);
  } else {
    answer = answer.concat(Array.from(number.substring(last)));
  }
  console.log(answer.join(''));
    
  return answer.join('');
};

solution("1231234",3)
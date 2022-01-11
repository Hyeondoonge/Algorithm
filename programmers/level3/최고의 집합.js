function solution(n, s) {
  const answer = [s];
  let index = 0;

  while (answer.length !== n) {
    if (answer[index] === 1) break;

    for(let i = 0; i < answer.length; i++) {
      const fir = Math.ceil(answer[i] / 2); // 큰 수를 나눠 준다.
      const sec = answer[i] - fir;

      answer[i] = fir;
      answer.push(sec);

      if (answer.length === n) break;
      console.log(answer);
    }
  }

  if (answer.length !== n) {
    return [-1];
  }
  console.log(answer);

  return answer;
}

solution(5, 100);
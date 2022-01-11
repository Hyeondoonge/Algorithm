function solution(s) {
  let del = 0;
  let loop = 0;

  while (s !== "1") {
    loop += 1;

    let one = 0;
    for(let i = 0; i < s.length; i++) {
      if (s[i] === '1') one += 1;
    }
    del += s.length - one;
    s = one.toString(2);
  }

  const answer = [loop, del];
  console.log(answer);

  return answer;
}

solution("1");
const solution = (n) => {
  let answer = 0; // 자기 자신

  for(let i = 1; i <= n; i++) {
    let sum = 0;
    for(let j = i; j <= n; j++) {
      sum += j;
      if (sum >= n) {
        if (sum === n) answer += 1;
        break;
      }
    }
  }
  return answer;
};

solution(3);
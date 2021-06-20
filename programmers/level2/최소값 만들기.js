// 핵심
// 현재 가장 작은 값 * 가장 큰 값을 누적

const solution = (A,B) => {
  let answer = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  for(let i = 0; i < A.length; i++) {
    answer += A[i] * B[A.length - i - 1];
  }

  console.log(answer);

  return answer;
}

solution([1, 4, 2], [5, 4, 4]);
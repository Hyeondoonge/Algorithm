function solution(n, s) {
  if (s / n < 1) return [-1];

  const answer = Array.from({ length: n }, () => Math.floor(s / n));

  for (let i = s % n, k = n - 1; i >= 1; i--, k--) {
    answer[k]++;
  }
  return answer;
}

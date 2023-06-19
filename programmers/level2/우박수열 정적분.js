function solution(k, ranges) {
  // 1. x (0, 1, 2 ...)에 대응하는 y를 구한다
  // 2. 단위길이당 너비를 구한다.
  // 3. 누적합을 계산한다.
  // 4. ranges에 대해 정확한 범위를 구한다.
  //     이때 범위가 유효하지않으면 -1을 반환한다.
  //     구간합 로직을 이용해 계산한다.

  const y = [k];

  while (k > 1) {
    if (k % 2 === 0) {
      k /= 2;
      y.push(k);
    } else {
      k *= 3;
      k += 1;
      y.push(k);
    }
  }
  const N = y.length;
  for (let i = 0; i < N - 1; i++) {
    S[i + 1] = S[i] + (y[i] + y[i + 1]) / 2;
  }

  const M = ranges.length;
  const answer = [];
  for (let i = 0; i < M; i++) {
    const [a, b] = ranges[i];
    const x1 = a;
    const x2 = N - 1 + b;
    if (x2 < x1) answer.push(1.0);
    else answer.push(S[x2] - S[x1]);
  }

  return answer;
}

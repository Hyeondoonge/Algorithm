function solution(a) {
  let answer = 0;
  // find 최소값 위치
  const N = a.length;
  let min = { idx: 0, value: a[0] };
  for (let i = 0; i < N; i++) {
    if (a[i] < min.value) {
      min.idx = i;
      min.value = a[i];
    }
  }

  answer += 1;

  let left_min = { idx: 0, value: a[0] };
  for (let i = 0; i < min.idx; i++) {
    if (left_min.value >= a[i]) {
      left_min.idx = i;
      left_min.value = a[i];
      answer++;
    }
  }

  let right_min = { idx: N - 1, value: a[N - 1] };
  for (let i = N - 1; i > min.idx; i--) {
    if (right_min.value >= a[i]) {
      right_min.idx = i;
      right_min.value = a[i];
      answer++;
    }
  }
  return answer;
}

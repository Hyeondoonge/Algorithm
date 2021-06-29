// 조건에 맞는 최소시간을 탐색해야하는데
// 순차탐색보다 이분탐색이 더 효율적

let check_times;

const lower_bound = (s, e, n) => {
  while (e - s > 0) {
    let m = Math.floor((e + s) / 2);
    let sumN = 0;
    check_times.forEach((time) => {
      sumN += Math.floor(m / time);
    })
    if (sumN < n) s = m + 1;
    else e = m;
  }
  return e;
};

function solution(n, times) {
  check_times = times;
  check_times.sort((a, b) => a - b);
  const max = check_times[check_times.length - 1];

  const answer = lower_bound(1, max * n, n);
  return answer;
};
//  시간 초과

function solution(n, stations, w) {
  let s = 0;
  let i = 1;
  let answer = 0;

  while (i <= n) {
    const station = stations[s];
    const start = station - w;
    const end = station + w;

    if (s < stations.length && start <= i && i <= end) {
      i = end + 1;
      s++;
    } else {
      i += 2 * w + 1;
      answer++;
    }
  }

  return answer;
}

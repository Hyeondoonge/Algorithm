function solution(queue1, queue2) {
  let N = queue1.length;

  let queue = [...queue1, ...queue2];

  let l = 0,
    r = queue1.length - 1;

  const sum1 = queue1.reduce((acc, prev) => acc + prev, 0);
  const sum2 = queue2.reduce((acc, prev) => acc + prev, 0);

  const target = (sum1 + sum2) / 2;
  if ((sum1 + sum2) % 2) return -1;

  let cur = sum1;
  let answer = 0;

  while (l < 2 * N || r < 2 * N) {
    if (cur === target) {
      return answer;
    } else if (cur < target) {
      r++;
      cur += queue[r];
    } else if (cur > target) {
      cur -= queue[l];
      l++;
    }
    answer += 1;
  }

  return -1;
}

solution([1, 1], [1, 5]);

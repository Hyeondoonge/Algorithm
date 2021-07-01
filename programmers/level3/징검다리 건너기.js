// 핵심

// stones 배열 원소의 값 <= 200,000,000 이므로,
// 1부터 시작해서 가능한 값을 찾는 것은 비효율적일 수 있다.

// 따라서, 이분탐색을 해서 가능한 값을 찾는 방법을 생각할 수 있고,
// 이를 구하기위해 1부터 stones 구성 원소의 최대값사이를 탐색한다. (Math.max는 10^7 넘어가면 에러 발생)

function solution(stones, k) {
  let s = 1, e = -1;

  for(let i = 0; i < stones.length; i++) {
    e = e > stones[i] ? e : stones[i];
  }

  while (e - s >= 0) {
    let m = Math.floor((e + s) / 2);

    let neg = 0, valid = true;

    for(let i = 0; i < stones.length; i++) {
      if (stones[i] - m < 0) neg += 1;
      else neg = 0;

      if (neg >= k) {
        valid = false;
        break;
      }
    }

    if (valid) s = m + 1;
    else e = m - 1;
  }

  return s - 1;
};
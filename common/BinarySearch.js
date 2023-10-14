function BinarySearch(arr, k) {
  // 가정: arr는 정렬된 상태

  // 범위 -1 ~ N
  let s = -1,
    e = N;

  while (s + 1 < e) {
    let m = Math.floor((s + e) / 2);

    if (arr[m] <= k) {
      e = m;
    } else {
      s = m;
    }
  }

  return e;
}

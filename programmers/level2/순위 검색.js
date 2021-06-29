// 핵심
// 1. 각 info가 포함될 수 있는 query 조합을 만들어냄

// 2. (이분 탐색을 위한) sort를 query를 읽을 때 마다 하는 것보다
// key만큼 해주는 게 더 효율적. key 최대값 -> 108 / query 최대값 -> 100,000

const map = {};

const lower_bound = (arr, tar) => {
  let s = 0, e = arr.length - 1, m = 0;

  while (e - s > 0) {
    m = Math.floor((s + e) / 2);
    if (arr[m] < tar) s = m + 1;
    else e = m;
  }

  if (arr[e] < tar) return -1;
  return e;
}

const comb = (index, info, score, depth) => {
  const key = info.join('');

  if (map[key]) map[key].push(score * 1);
  else map[key] = [score * 1];

  if (depth === 4) {
    return;
  }

  const n_info = [...info];

  for(let i = index + 1; i < 4; i++) {
    n_info[i] = '-';
    comb(i, n_info, score, depth + 1);
    n_info[i] = info[i];
  }
};

const solution = (info, query) => {
  const answer = [];

  for(let i = 0; i < info.length; i++) {
    const n_info = info[i].split(' ');
    const score = n_info.pop();

    comb(-1, n_info, score, 0);
  }

  for(let key in map) {
    map[key].sort((a, b) => a - b);
  }

  for(let i = 0; i < query.length; i++) {
    const queryArr = query[i].replace(/ and/g, '').split(' ');
    const score = queryArr.pop();

    const queryStr = queryArr.join('');
    const matchedArr = map[queryStr];
    
    if (!matchedArr) {
      answer.push(0);
      continue;
    }
    const index = lower_bound(matchedArr, score);

    if (index === -1) answer.push(0);
    else answer.push(matchedArr.length - index);
  }
  return answer;
};
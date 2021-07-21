// 핵심

// 투포인터 알고리즘으로 구간 탐색 효율성은 해결했다만
// 모든 보석이 다 있는지 검사한다고 dict을 선형적으로 탐색해서 시간초과가 계속 났다.
// -> 변수하나만 있으면 탐색하지 않고도 O(1)만에 검사가 가능했다.

function solution(gems) {
  const dict = {};
  
  for(let i = 0; i < gems.length; i++) {
    dict[gems[i]]  = 0;
  }

  const len = Object.keys(dict).length;

  let l = 0, r = 0, d = 100000;

  dict[gems[0]] = 1;

  let cnt = 1;

  let answer = [];

  while (l < gems.length && r < gems.length) {

    // for(let key in dict) {
    //   if (!dict[key]) {
    //     valid = false;
    //     break;
    //   }
    // }

    if (cnt === len) {
      if (r - l + 1 < d) {
        answer = [l + 1, r + 1];
        d = r - l + 1;
      }
      if (dict[gems[l]] === 1) cnt -= 1;
      dict[gems[l++]] -= 1;
    }
    else {
      if (dict[gems[++r]] === 0) cnt += 1;
      dict[gems[r]] += 1;
    } 
  }
  return answer;
};
// 핵심
// max를 초기화할 때 기존에 무조건 열이 0인 값으로 초기화했는데,
// 다음 코드를 보면 현재 열과 같은 열은 수용하지 않기 때문에 제외시켜야됨.
// 즉, 초기화 하는 방식에 큰 문제가 있었음!
// 따라서 -1로 적당하게 max값을 초기화 함

// 이거 하나 때문에 틀릴 거 생각하면 아찔하네,,,😂

const solution = (land) => {
  let answer = 0;

  const sum = Array.from(Array(land.length), () => new Array(4).fill(0));

  sum[0] = land[0];

  for(let i = 1; i < land.length; i++) {
    for(let j = 0; j < 4; j++) {
      let max = -1;
      for(let k = 0; k < 4; k++) {
        if (j === k) continue;
        max = max > sum[i - 1][k] ? max : sum[i - 1][k];
      }
      sum[i][j] = land[i][j] + max;
    }
  }

  for(let i = 0; i < 4; i++) {
    answer = answer > sum[land.length - 1][i] ? answer : sum[land.length - 1][i];
  }

  return answer;
};
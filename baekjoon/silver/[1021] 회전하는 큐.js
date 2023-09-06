function solution(N, M, poses) {
  let arr = Array.from({ length: N }, (_, index) => index + 1); // 원래 위치를 기록
  let answer = 0;
  let top = 0;

  for (const pos of poses) {
    // 작은 이동값 찾기
    const { index, cost } = findMinPath(top, pos);
    top = index;

    arr.splice(top, 1);
    if (top === arr.length) top = 0;
    answer += cost;
  }

  return answer;

  function findMinPath(top, target) {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        index = i;
        break;
      }
    }

    const diff = Math.abs(index - top);
    return { index, cost: Math.min(diff, arr.length - diff) };
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const poses = input[1].split(' ').map(Number);

console.log(solution(N, M, poses));

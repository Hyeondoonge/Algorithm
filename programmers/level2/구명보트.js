// 핵심
// 1. 매 순간, 최적의 답을 찾기위한 greedy 알고리즘
// 2. 최대 무게 + 최소 무게로 계산을 해야 최대한 많은 사람들을 구명보트에 태울 수 있음.

const solution = (people, limit) => {
  let answer = 0;

  people.sort((a, b) => b - a);

  let l = 0, r = people.length - 1;

  // 최대 + 최소가 제일 효율적
  while (l <= r) {
    if (people[l] + people[r] <= limit) {
      r -= 1;
    }
    l += 1;
    answer++;
  }

  return answer;
}
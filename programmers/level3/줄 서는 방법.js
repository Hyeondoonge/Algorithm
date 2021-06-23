// 핵심
// 순차적으로 찾는 dfs 방법은 O(n!) 시간 복잡도로 비효율적.
// 따라서 현재 상태의 순열 경우의 수를 인덱스(order)로 활용해서
// 효율성을 높임.

const visitied = [];
const log = [];

const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

const permutation = (n, k, order) => {
  if (log.length === n) {
    return;
  }

  let num = -1;

  const size = n - log.length - 1; // permutation 크기
  
  for(let i = 1; i <= n; i++) {
    if (visitied[i]) continue;
    if (order + factorial(size) > k) {
      visitied[i] = 1;
      log.push(i);
      num = i;
      break;
    }
    order += factorial(size);
  }
  permutation(n, k, order);
};

const solution = (n, k) => {
    permutation(n, k, 1);
    return log;
};
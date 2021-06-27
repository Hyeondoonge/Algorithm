// 핵심
// max n이 10억이기 때문에 하향식 계산이 필요

const memo = [];

const rec = (n) => {
  if (n == 1 || n == 2) return memo[n] = 1;

    if (n % 2 === 0) { // 짝 수
      return memo[n] = rec(n / 2);
    } else {
      return memo[n] = rec(n - 1) + 1;
    }
}

const solution = (n) => {
  rec(n);
  return memo[n];
};
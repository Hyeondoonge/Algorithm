function solution(money, stocks) {
  const N = stocks.length;
  const LAST = 14;

  const JH = [money, 0];
  const SM = [money, 0];

  for (let i = 0; i < N; i++) {
    const stock = stocks[i];
    // 준현
    JH[1] += Math.floor(JH[0] / stock);
    JH[0] = JH[0] % stock;

    // 성민
    const status = checkThreeDays(i);

    if (status === 'asc') {
      SM[0] += SM[1] * stock;
      SM[1] = 0;
    } else if (status === 'desc') {
      SM[1] += Math.floor(SM[0] / stock);
      SM[0] = SM[0] % stock;
    }
  }

  return compare(JH, SM);

  function compare(p1, p2) {
    const earningOfp1 = p1[0] + stocks[LAST - 1] * p1[1];
    const earningOfp2 = p2[0] + stocks[LAST - 1] * p2[1];

    if (earningOfp1 > earningOfp2) {
      return 'BNP';
    } else if (earningOfp1 < earningOfp2) {
      return 'TIMING';
    } else {
      return 'SAMESAME';
    }
  }

  function checkThreeDays(i) {
    if (i < 3) return 'none';
    let status = 'asc';

    for (let k = i - 2; k <= i; k++) {
      if (stocks[k - 1] >= stocks[k]) {
        status = 'desc';
      }
    }

    if (status === 'asc') return status;

    for (let k = i - 2; k <= i; k++) {
      if (stocks[k - 1] <= stocks[k]) {
        status = 'none';
      }
    }

    return status;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const money = Number(input[0]);
const stocks = input[1].split(' ').map(Number);

console.log(solution(money, stocks));

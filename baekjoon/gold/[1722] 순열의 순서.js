// 분류: 순열
// 풀이시간: 4:07~6:00

// 1부터 N까지의 수에 대한 순열 N!
// k => k번째 순열?
// 임의 순열 => 몇 번째 순열?

// input
// N(1~20)
// Q k or 순열 (Q=1, k이고 Q=2, N개의 수로 된 순열이 주어짐)

// output
// k번째 수열을 나타내는 N개의 수
// or 해당 수열의 순서

function solution(N, Q, param) {
  const f = Array.from({ length: N + 1 }, () => 0n);

  if (Q == 1) {
    return getPerm(BigInt(param[0])).join(" ");
  } else if (Q == 2) {
    return getOrder(param.map(Number)).toString();
  }

  function getOrder(perm) {
    let order = 0n;
    let m = 0;
    for (let i = 0; i < N; i++) {
      let s = perm[i] - 1;
      for (let j = 0; j < i; j++) {
        if (perm[j] < perm[i]) {
          s--;
        }
      }
      order += BigInt(s) * factorial(N - m - 1);
      m++;
    }
    return order + 1n;
  }

  function getPerm(k) {
    const perm = [];

    let s = 1n;
    let m = 0;

    while (perm.length !== N) {
      for (let i = 0; i < N; i++) {
        if (perm.includes(i + 1)) continue;
        const e = s + factorial(N - m - 1) - 1n;
        if (s <= k && k <= e) {
          perm.push(i + 1);
          m++;
          break;
        }
        s = e + 1n;
      }
    }
    return perm;
  }

  function factorial(v) {
    v = BigInt(v);
    if (v === 1n || v === 0n) return 1n;
    if (f[v] !== 0n) return f[v];
    return (f[v] = v * factorial(v - 1n));
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const [Q, ...param] = input[1].split(" ");

console.log(solution(N, Q, param));

// 핵심
// 1. toString 함수를 이용해 진법 변환
// 2. while 종료 조건에 유의.
// 기존에 answer.length === t로 해줬는데,
// for문 안에서 그 이상이 되버리는 경우 있기 때문에 무한 루프를 돌 수 있음.

function solution(n, t, m, p) {
  const answer = [];
  let turn = 1;
  let num = 0;

  while (answer.length < t) {
    const str = num.toString(n).toUpperCase();
    const size = str.length;

    for (let i = 0; i < size; i++) {
      if (turn > m) turn = 1;
      if (turn === p) {
        answer.push(str[i]);
      }
      turn += 1;
    }
    num++;
  }

  const a = answer.splice(0, t).join("");
 
  return a;
}
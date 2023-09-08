// 일정 금액 지불시 10일 동안 회원 자격 부여
// 회원을 대상으로 매일 한 가지 제품을 할인
// 이 제품은 하루에 하나씩만 구매할 수 있음.

// 원하는 제품과 수량이 할인하는 날짜와 회원 기간이 일치할 경우에 맞춰 회원가입

// 원하는 제품을 *모두*할인 받을 수 있는 회원등록 날짜의 총 일수, 가능한 날짜 없다면 0

// input
// want(1~10), number(1~10)
// want[i] 제품명 (1~10)
// number[i] 수량 (1~10) (number 원소의 합은 10)
// discount 할인하는 제품 (10~100,000)

// output
// 날짜 총 일수 or 0

function solution(want, number, discount) {
  const day = 10;
  let answer = 0;

  const W = want.length;
  const D = discount.length;

  for (let i = 0; i < D; i++) {
    const record = new Map();

    for (let j = i; j < i + day; j++) {
      if (D <= j) break;
      record.set(discount[j], (record.get(discount[j]) || 0) + 1);
    }

    answer += 1;

    for (let j = 0; j < W; j++) {
      if (!record.get(want[j]) || number[j] > record.get(want[j])) {
        answer -= 1;
        break;
      }
    }
  }

  return answer;
}

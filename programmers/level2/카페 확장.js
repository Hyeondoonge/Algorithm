// 풀이시간: 12:30~12:48

// 동시에 머무는 사람
// 영업시작하자마자(0초) 손님 도착, 이후 k초마다 줄을 섬
// 주문받은 순서대로 음료 만듬, 한 번에 하나씩 만듬, 종류 마다 음료 제조 시간 지정됨. (0번부터 시작)

// 손님은 완료되서 받자마자 카페 나감 (20초에 완성 -> 나감?)
// 동시에 최대 몇명이 카파에 있는지 계산

// 주문받자마자 제조. 받자마자 나감. (?)
// 이때, 동일한 시간에 출입있다면 나가는 손님 먼저 퇴장

// input
// menu (length: 1~100)
// menu[i] i번 음료 제조 시간 (1~100)
// order (length: 1~10,000)
// order[i] 주문 음료 번호 (0~menu.length - 1)
// k 단위 (1~100)

// output
// 최대 동시에 존재하는 손님

function solution(menu, order, k) {
  let last = 0;
  let answer = 0;
  let end = 0;

  for (let i = 0; i < order.length; i++) {
    const cost = menu[order[i]];

    if (end < i * k) {
      end = i * k + cost;
    } else {
      end += cost;
    }

    for (let j = last + 1; j < order.length; j++) {
      if (j * k < end) {
        last++;
      } else {
        break;
      }
    }

    answer = Math.max(answer, last - i + 1);
  }

  return answer;
}

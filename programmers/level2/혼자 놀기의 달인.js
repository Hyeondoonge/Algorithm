// 10:27~10:49

// 1~100 각 숫자가 하나씩 적힌 카드더미
// 2~100 사이의 자연수 A정하기
// A보다 작거나 같은 숫자 카드들과 카드 수만큼의 상자

// 게임
// 상자에 카드 하나씩 넣어 일렬로 나열, 1부터 순차적으로 순서 부여
// 상자 하나 선택 => 적힌 번호에 해당하는 상자 열기 (열어야되는 게 이미 열려있을 때까지 반복) => 1번 상자 그룹
// 1번 상자 연 후 남는 상자 없으면 게임 종료후 0점 획득

// 2번 상자 그룹도 구하기

// 1번 상자 * 2번 상자 => 게임의 점수

// input
// cards (length: 2~100)
// cards[i] (1~length)

// output
// 최고 점수

function solution(cards) {
  const N = cards.length
  const isOpen = Array.from({ length: N + 1 }, () => false)

  let answer = 0

  for (let i = 1; i <= N; i++) {
    isOpen[i] = true
    comb1(i, 1)
    isOpen[i] = false
  }

  return answer

  function comb1(i, c) {
    // 1번 상자 선택
    const next = cards[i - 1]

    if (isOpen[next]) {
      for (let k = 1; k <= N; k++) {
        if (isOpen[k]) continue
        isOpen[k] = true
        comb2(k, c, 1)
        isOpen[k] = false
      }
    } else {
      isOpen[next] = true
      comb1(next, c + 1)
      isOpen[next] = false
    }
  }

  function comb2(i, f, s) {
    // 2번 상자 선택
    const next = cards[i - 1]

    if (isOpen[next]) {
      answer = Math.max(answer, f * s)
    } else {
      isOpen[next] = true
      comb2(next, f, s + 1)
      isOpen[next] = false
    }
  }
}

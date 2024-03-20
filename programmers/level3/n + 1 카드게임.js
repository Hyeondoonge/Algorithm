// 1~n 사이 수가 하나씩 적힌 카드 뭉치
// 동전 coin개

// 카드 뽑는 순서가 정해짐
// 1. n/2장을 뽑아 가짐(n은 6의 배수), 동전 coin개
// 2. 1라운드 시작. 라운드 시작 시 카드 두 장 뽑음
//    남은 카드 없다면 게임 종료
//    뽑은 카드 => 1. 동전 써서 가짐 2. 버림
// 3. 카드 적힌 수의 합이 n +1 되도록 두 장 내고 다음 라운드. 내지 못하면 종료

// coin (0~n), cards (6~1,000) === n
// cards[i] (1~n) 중복하지 않는 수
// 도달 가능한 최대 라운드 수

function solution(coin, cards) {
  const n = cards.length
  const holds = new Set([...cards.slice(0, n / 3)])
  const keeps = new Set()
  let r = 1

  // coin 유효성
  while (r <= (n - n / 3) / 2) {
    let pass = false

    const card1 = cards[n / 3 + (r - 1) * 2]
    const card2 = cards[n / 3 + (r - 1) * 2 + 1]

    keeps.add(card1)
    keeps.add(card2)

    for (const hold of holds) {
      const s = Math.abs(n + 1 - hold)
      if (holds.has(s)) {
        // 짝을 찾음.
        pass = true
        holds.delete(s)
        holds.delete(hold)
        break
      }
    }

    if (pass) {
      r++
      continue
    }

    if (coin < 1) break

    for (const hold of holds) {
      const s = Math.abs(n + 1 - hold)
      if (keeps.has(s)) {
        // coin 1개 사용
        pass = true
        keeps.delete(s)
        holds.delete(hold)
        break
      }
    }

    if (pass) {
      coin -= 1
      r++
      continue
    }

    for (const keep of keeps) {
      const s = Math.abs(n + 1 - keep)
      if (keeps.has(s)) {
        // coin 1개 사용
        pass = true
        keeps.delete(s)
        keeps.delete(keep)
        break
      }
    }

    if (coin < 2) break

    if (pass) {
      coin -= 2
      r++
      continue
    }

    break
  }

  return r
}

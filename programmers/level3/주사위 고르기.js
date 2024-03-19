// n개의 주사위
// 6개의면에 1~n 번호
// 주사위 마다 구성이 다름
// A, B n/2개의 주사위 가져감
// 점수가 더 큰쪽이 승리, 같다면 무승부

// 승리할 확률이 높아지기위해 골라야하는 주사위번호, 오름차순

function solution(dice) {
  const n = dice.length
  const A = []

  const answer = [null, 0] //max 조합, 이긴 경우의 수

  for (let i = 0; i < n; i++) {
    A.push(i)
    comb(i, 1)
    A.pop()
  }

  return answer[0]

  // 주사위조합만들기
  function comb(i, d) {
    if (d === n / 2) {
      const amount = Array.from({ length: 501 }, () => 0)
      sumA(0, 0)

      function sumA(cur, d) {
        if (d === n / 2) {
          amount[cur]++
          return
        }
        for (let i = 0; i < 6; i++) {
          const num = A[d]
          sumA(cur + dice[num][i], d + 1)
        }
      }

      // 누적합
      for (let i = 0; i < 500; i++) {
        amount[i + 1] += amount[i]
      }

      const B = []
      for (let i = 0; i < n; i++) {
        if (A.includes(i)) continue
        B.push(i)
      }

      let win = 0
      sumB(0, 0)

      if (answer[1] < win) {
        answer[0] = B.map((i) => i + 1)
        answer[1] = win
      }

      function sumB(cur, d) {
        if (d === n / 2) {
          win += amount[cur - 1]
          return
        }
        for (let i = 0; i < 6; i++) {
          const num = B[d]
          sumB(cur + dice[num][i], d + 1)
        }
      }
      return
    }

    for (let k = i + 1; k < n; k++) {
      A.push(k)
      comb(k, d + 1)
      A.pop()
    }
  }
}

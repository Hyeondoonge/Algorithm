// ‼️분할한 기능들‼️이 정상적으로 동작하는지 확인

// 결승전 규칙
// 어피치 n발 -> 라이언 n발
// 점수 계산
// - 10점 ~ 0점
// - k(1~10)점을 어피치 a, 라이언 b 만큼 맞혔으면 더 많은 화살을 맞힌 선수가 k점 획득
// 이때, a=b이면 어피치가 k점 획득. 만약 0으로 같으면 어느 누구도 k점 획득 X
// 최종 점수 계산, 동일하면 어피치가 우승자

// input
// n (1~10)
// info (length: 11) 어피치가 맞춘 상태

// output
// 라이언이 가장 큰 점수 차이로 이기기 위해 n발을 쏳아야하는 점수 (length: 11, 10점~0점 순서대로)
// 이때 여러 가지 방법인 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return. 가장 큰 점수일 때까지 비교
// 무조건 지거나 비기는 경우 -1

function solution(n, info) {
  // 라이언 과녁 상태
  const ryan = Array.from({ length: 11 }, () => 0)
  const answer = [null, 0] // 배열, maxDiff
  comb(0, n)

  return answer[0] || [-1]

  function isRyanWin() {
    let ryan_score = 0
    let apeach_score = 0

    for (let i = 0; i < 10; i++) {
      // 10점~0점
      if (ryan[i] <= info[i]) {
        if (ryan[i] === info[i] && ryan[i] === 0) {
          continue
        }
        apeach_score += 10 - i
      } else {
        ryan_score += 10 - i
      }
    }
    return [ryan_score > apeach_score, Math.abs(ryan_score - apeach_score)]
  }

  function comb(d, left) {
    if (10 < d) {
      if (left === 0) {
        const result = isRyanWin()
        if (result[0] && answer[1] < result[1]) {
          answer[0] = [...ryan]
          answer[1] = result[1]
        }
      }
      return
    }

    for (let i = left; i >= 0; i--) {
      ryan[10 - d] = i
      comb(d + 1, left - i)
    }
  }
}

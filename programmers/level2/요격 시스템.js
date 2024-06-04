// 최소 미사일로 모든 폭격 미사일을 요격
// 2차원 공간
// A 폭격 미사일 -> x축에 평행한 직선이며 (s, e)로 표현
// B x좌표에서 y축에 수평이 되도록 미사일 발사. 걸쳐있는 미사일들 한 번에 요격 가능
// 이때, s, e로 발사하는 것으론 불가능함. 실수인 x좌표에서도 발사 가능

// input
// targets (length: 1~500,000)
// targets[i] [s, e] (0<=s<e<=100,000,000)

// output
// 모든 미사일 요격을 위해 필요한 미사일 최소값

function solution(targets) {
  targets.sort((a, b) => a[0] - b[0])

  let scope = [targets[0][0], targets[0][1]]
  let answer = 1

  for (let i = 1; i < targets.length; i++) {
    const [s, e] = targets[i]
    if (s < scope[1]) {
      scope[0] = s
      if (e < scope[1]) {
        scope[1] = e
      }
    } else {
      scope[0] = s
      scope[1] = e
      answer++
    }
  }
  return answer
}

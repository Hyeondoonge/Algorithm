// 모든 음식의 스코빌 지수 K이상으로 만들기
// 스코빌 지수가 가장 낮은 두 개의 음식을 제시된 방법으로 섞음
// 모든 음식의 스코빌 지수가 K이상 될 때까지 반복해야되는 최소횟수
// 불가능한 경우 -1

// scoville (length: 2~1,000,000)
// scoville[i] (0~1,000,000)
// K (0~1,000,000,000)

function solution(scoville, K) {
  // 1. 섞는다
  // 2. 최소가 K라면 끝낸다
  // 3. 그렇지 않으면 계속한다
  // 4. 답을 찾을 수 없다면 -1을 반환한다

  // 최소힙
  const { push, pop, getSize, top } = PQ()

  scoville.forEach((s) => push(s))

  let loop = 0

  while (top() < K) {
    if (getSize() === 1) {
      return -1
    }
    const f = pop()
    const s = pop()
    push(f + s * 2)
    loop++
  }
  return loop
}

function PQ(isHigher = (a, b) => a < b) {
  const arr = []
  let n = 0
  const push = (element) => {
    arr[++n] = element
    upheap(n)
  }
  const pop = () => {
    const top = arr[1]
    arr[1] = arr[n--]
    downheap(1)
    return top
  }
  const upheap = (i) => {
    while (1 < i) {
      const p = Math.floor(i / 2)
      if (isHigher(arr[p], arr[i])) break
      ;[arr[p], arr[i]] = [arr[i], arr[p]]
      i = p
    }
  }
  const top = () => arr[1]
  const downheap = (i) => {
    while (i * 2 <= n) {
      let c = i * 2
      if (c + 1 <= n && isHigher(arr[c + 1], arr[c])) c++
      if (isHigher(arr[i], arr[c])) break
      ;[arr[c], arr[i]] = [arr[i], arr[c]]
      i = c
    }
  }
  const getSize = () => n

  return {
    push,
    pop,
    getSize,
    top
  }
}

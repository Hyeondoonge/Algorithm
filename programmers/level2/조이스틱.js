function solution(name) {
  const n = name.length

  let target = 0
  for (let i = 0; i < n; i++) {
    if (name[i] !== 'A') target++
  }

  const visitied = Array(n).fill(false)

  let answer = Infinity
  visitied[0] = true

  search(0, diff(name[0]), name[0] === 'A' ? 0 : 1)

  return answer

  function search(idx, cnt, d) {
    if (d === target) {
      answer = Math.min(answer, cnt)
      return
    }

    for (let k = 1; k < n; k++) {
      const next = (idx + k) % n
      if (visitied[next] || name[next] === 'A') continue
      visitied[next] = true
      search(next, cnt + diff(name[next]) + k, d + 1)
      visitied[next] = false
      break
    }

    for (let k = 1; k < n; k++) {
      let next = (idx - k) % n
      if (next < 0) {
        next = n + next
      }
      if (visitied[next] || name[next] === 'A') continue
      visitied[next] = true
      search(next, cnt + diff(name[next]) + k, d + 1)
      visitied[next] = false

      break
    }
  }

  function diff(param) {
    const a = 'A'.charCodeAt(0)
    const z = 'Z'.charCodeAt(0)

    return Math.min(param.charCodeAt(0) - a, z - param.charCodeAt(0) + 1)
  }
}

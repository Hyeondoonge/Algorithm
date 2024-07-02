function solution(users, emoticons) {
  const N = users.length
  const M = emoticons.length

  const result = [null, null]
  const discounts = [10, 20, 30, 40]

  const comb = []
  dfs(0)

  return result

  function dfs(d) {
    if (d === M) {
      const [newbie, earn] = getSalesResult()

      if (result[0] === null || result[0] < newbie) {
        result[0] = newbie
        result[1] = earn
      } else if (result[0] === newbie) {
        result[1] = Math.max(result[1], earn)
      }
      return
    }

    for (let i = 0; i < 4; i++) {
      comb.push(discounts[i])
      dfs(d + 1)
      comb.pop()
    }
  }

  function getSalesResult() {
    let newbie = 0
    let earn = 0

    for (let i = 0; i < N; i++) {
      let costs = 0
      const [reqDiscount, reqCost] = users[i]
      for (let j = 0; j < M; j++) {
        const discount = comb[j]
        const emoticonCost = emoticons[j]
        if (discount < reqDiscount) continue
        costs += emoticonCost - (emoticonCost * discount) / 100
      }
      if (reqCost <= costs) {
        newbie++
      } else {
        earn += costs
      }
    }
    return [newbie, earn]
  }
}

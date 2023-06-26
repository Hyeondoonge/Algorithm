function solution(users, emoticons) {
  const N = users.length;
  const M = emoticons.length;
  const discounts = [10, 20, 30, 40];

  const selectDiscounts = Array.from({ length: M }, () => 0);

  let answer = [0, 0];
  dfs(0);

  return answer;

  function dfs(d) {
    if (d === M) {
      // 모든 이모티콘에 할인율 지정된 상태
      const [applicants, pay] = resultOfSale();
      if (answer[0] < applicants || (answer[0] === applicants && answer[1] < pay)) {
        answer[0] = applicants;
        answer[1] = pay;
      }
      return;
    }
    for (let i = 0; i < 4; i++) {
      const sale = discounts[i];
      selectDiscounts[d] = sale;
      dfs(d + 1);
    }
  }

  function resultOfSale() {
    let applicants = 0;
    let allPay = 0;

    for (let i = 0; i < N; i++) {
      // 사용자
      const [wishSale, wishPay] = users[i];
      let pay = 0;
      for (let j = 0; j < M; j++) {
        // 이모티콘
        if (selectDiscounts[j] < wishSale) continue;
        pay += emoticons[j] - (emoticons[j] * selectDiscounts[j]) / 100;
      }

      if (wishPay <= pay) {
        applicants += 1;
      } else {
        allPay += pay;
      }
    }

    return [applicants, allPay];
  }
}

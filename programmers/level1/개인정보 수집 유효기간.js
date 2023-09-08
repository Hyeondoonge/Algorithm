// 풀이시간: 8:09~8:34

// 1번~n번 개인정보 n개
// 여러 개의 약관 종류, 각 약관은 유효기간이 지정됨
// 각 개인정보를 유효기간 전까지 보관가능, 지났다면 파기

// *모든 달은 28일까지 있다고 가정*, 1달 -> 28일

// 유효기간 <= 오늘 날짜이면 파기.

// input
// today 오늘 날짜 (YYYY.MM.DD)
// terms 약관의 유효기간 (length: 1~20)
// terms[i] (=> "약관종류 유효기간") (약관 종류: A~Z - 중복 X, 유효기간: 1~100)
// privacies 수집된 개인 정보 (length: 1~10)
// privacies[i] i+1번 개인정보 수집 일자 및 약관종류 (=> 날짜 약관종류) (날짜: YYYY.MM.DD - today이전의 날짜, 약관종류: term에 나타난.)

// 2000 <= YYYY <= 2022, 1 <= MM <= 12, 1 <= DD <= 28

// output
// 파기해야할 개인정보 번호, 오름차순

function solution(today, terms, privacies) {
  const MONTH = 28;
  const YEAR = MONTH * 12;
  today = dateToNumber(today);

  const termMap = new Map(
    terms.map((term) => {
      const [C, expireIn] = term.split(' ');
      return [C, Number(expireIn) * MONTH];
    })
  );

  const answer = [];
  for (let i = 0; i < privacies.length; i++) {
    let [date, type] = privacies[i].split(' ');
    date = dateToNumber(date);

    const expired = date + termMap.get(type);

    if (expired <= today) {
      answer.push(i + 1);
    }
  }

  return answer;

  function dateToNumber(date) {
    const [YYYY, MM, DD] = date.split('.').map(Number);

    return YYYY * YEAR + MM * MONTH + DD;
  }
}

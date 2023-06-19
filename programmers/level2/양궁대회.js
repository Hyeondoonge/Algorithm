function solution(n, info) {
  const MAX = 11;
  const board = Array.from({ length: MAX }, () => 0); // 10점 ~ 0점
  const answer = [[-1], -1]; // 점수 차이

  shoot(n, 0);

  return answer;

  function shoot(left, d) {
    if (d === MAX) {
      const [rian, apeach] = score();

      if (rian <= apeach || rian - apeach < answer[1]) return;
      if (answer[1] < rian - apeach) {
        answer[0] = [...board];
        answer[1] = rian - apeach;
      } else {
        for (let i = MAX - 1; i >= 0; i--) {
          // 작은 점수부터 비교
          if (answer[0][i] === board[i]) continue;
          if (answer[0][i] > board[i]) return;
          break;
        }
        answer[0] = [...board];
        answer[1] = rian - apeach;
      }
      return;
    }

    for (let i = n; i >= 0; i--) {
      // 몇 발인지를 나타냄
      if (left - i < 0) continue;
      if (left - i > 0 && d + 1 === MAX) continue;
      board[d] = i;
      shoot(left - i, d + 1);
    }
  }

  function score() {
    let rian = 0,
      apeach = 0;
    // 점수 구하기
    for (let i = 0; i < MAX; i++) {
      if (board[i] === info[i]) {
        if (board[i] === 0) continue;
        apeach += MAX - i - 1;
      } else if (board[i] > info[i]) {
        rian += MAX - i - 1;
      } else {
        apeach += MAX - i - 1;
      }
    }
    return [rian, apeach];
  }
}

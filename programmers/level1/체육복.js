// 핵심
// 자기자신이 체육복 도난당했다면, 본인에게 준다.

// 이 경우, 남에게서 받을 경우를 대비해 !reserve.includes 조건을 추가해서 처리한다.

function solution(n, lost, reserve) {
  const students = new Array(n + 1).fill(1);

  for(let i = 0; i < lost.length; i++) {
    students[lost[i]] = 0;
  }

  for(let i = 0; i < reserve.length; i++) {
    const idx = reserve[i];

    if (!students[idx]) {
      students[idx] = 1;
    } else if (idx - 1 >= 1 && !students[idx - 1] && !reserve.includes(idx + 1)) {
      students[idx - 1] = 1;
    } else if ((idx + 1 <= n && !students[idx + 1]) && !reserve.includes(idx + 1)) {
      students[idx + 1] = 1;
    }
  }

  let answer = 0;

  for(let i = 1; i <= n; i++) {
    if (students[i]) answer += 1;
  }
  return answer;
};
// 핵심

// 1. 시간간의 크기 비교가 필요하므로 정수값으로 포맷
// 2. 콘의 가장 늦은 도착 시간
//    1) 마지막 버스 시간
//    2) 마지막 버스 탑승객 시간 - 1분

const timeFormat = (time) => {
  let t = '';
  const h = Math.floor(time / 60);
  const m = time % 60;

  t += h >= 10 ? h : '0' + h;
  t += ':';
  t += m >= 10 ? m : '0' + m;

  return t;
};

function solution(n, t, m, timetable) {

  timetable = timetable.map((e) => {
    const [h, m] = e.split(':');
    return h * 60 + m * 1;
  });

  timetable.sort((a, b) => a - b);

  let idx = -1, cnt;

  let arrivedTime = 9 * 60 - t;

  while (n--) {
    arrivedTime += t;

    cnt = 0;

    for(let i = idx + 1; i < timetable.length; i++) {
      if (timetable[i] <= arrivedTime) {
        idx = i;
        cnt++;
      } else break;
      if (cnt === m) break;
    }
  }

  let answer;

  if (cnt === m) {
    const t = timetable[idx] - 1;
    answer = timeFormat(t);
  } else {
    answer = timeFormat(arrivedTime);
  }
  return answer;
};
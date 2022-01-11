function solution(lines) {
  lines = lines.map((e) => { // 시작시간, 종료시간
    let [_, t, p] = e.split(' ');

    const [h, m, s] = t.split(':');
    p = parseFloat(p.substring(0, p.length - 1));

    const end = parseInt(h) * 3600000 + parseInt(m) * 60000 + parseFloat(s) * 1000;

    const start = end - p * 1000 + 1;

    return [
      start, end
    ];
  })
  .sort((a, b) => a[0] - b[0]);

  let answer = 0;

  for(let i = 0; i < lines.length; i++) {
    let start = lines[i][0], end = start + 999;
    let cnt = 0;

    for(let j = 0; j < lines.length; j++) {
      if (lines[j][1] < start || lines[j][0] > end) continue;
      cnt += 1;
    }
    answer = cnt > answer ? cnt : answer;

    start = lines[i][1], end = start + 999; 
    cnt = 0;

    for(let j = 0; j < lines.length; j++) {
      if (lines[j][1] < start || lines[j][0] > end) continue;
      cnt += 1;
    }
    answer = cnt > answer ? cnt : answer;
  }
  return answer;
};

solution([
  "2016-09-15 20:59:57.421 0.351s",
  "2016-09-15 20:59:58.233 1.181s",
  "2016-09-15 20:59:58.299 0.8s",
  "2016-09-15 20:59:58.688 1.041s",
  "2016-09-15 20:59:59.591 1.412s",
  "2016-09-15 21:00:00.464 1.466s",
  "2016-09-15 21:00:00.741 1.581s",
  "2016-09-15 21:00:00.748 2.31s",
  "2016-09-15 21:00:00.966 0.381s",
  "2016-09-15 21:00:02.066 2.62s"
  ]);